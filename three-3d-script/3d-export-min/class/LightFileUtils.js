import { Utils } from './Utils'
const THREE = window.THREE
export class LightFileUitls {
  constructor() {
    this.Hand = "LeftY"
    this.helperBox = null
    this.Actor = "户型"
  }
  // 导出JSON文件
  generateLightJSON(mLightClass) {
    const outputLightObj = {
      SphereLights: {},
      SpotLights: {},
      RectLights: {},
      Sun: {},
      Sky: {},
    }
    mLightClass.mLightArray.forEach(light => {
      const lightType = light.m_iType
      let lightData = {}
      switch (lightType) {
        case 0: // 点光
          lightData = this.generateSphereLightObject(light)
          outputLightObj["SphereLights"][light.mLightMesh.uuid] = lightData
          break
        case 1: // 射灯
          lightData = this.generateSpotLightObject(light)
          outputLightObj["SpotLights"][light.mLightMesh.uuid] = lightData
          break
        case 2: // 矩形灯
          lightData = this.generateRectLightObject(light)
          outputLightObj["RectLights"][light.mLightMesh.uuid] = lightData
          break
      }
    })
    // 设置太阳光
    outputLightObj["Sun"] = this.generateSunLightObject(mLightClass)
    // 设置天光
    outputLightObj["Sky"] = this.generateSkyLightObject()
    return outputLightObj
  }
  // 生成点光源对象
  generateSphereLightObject(item) {
    return {
      Actor: this.Actor,
      Hand: this.Hand,
      Center: [
        +item.mLightMesh.position.x,
        +item.mLightMesh.position.y,
        +item.mLightMesh.position.z,
      ],
      Radius: 1, // 光源的半径，半径越大阴影越柔和，取值范围[0, inf)。 0.01
      Intensity: +item.m_fIntensity,
      Color: [+item.m_fLightR, +item.m_fLightG, +item.m_fLightB],
    }
  }
  // 生成矩形光对象
  generateRectLightObject(item) {
    // const helperBox = this._commonGeoTool(item)
    // 获取世界坐标
    const itemMatrixWorld = item.mLightMesh.matrixWorld.elements
    const Normal = this._calcRectLightNormal(itemMatrixWorld)
    const Tangent = this._calcRectLightTangent(itemMatrixWorld) // x轴 前四个
    const Bitangent = this._calcRectLightBitangent(itemMatrixWorld) // y轴
    return {
      Actor: this.Actor,
      Hand: this.Hand,
      Width: +item.m_fAreaWidth, // 灯光宽度
      Height: +item.m_fAreaLength, // 灯光长度  ？离地高字段
      Intensity: +item.m_fIntensity, // 光照强度
      Color: [+item.m_fLightR, +item.m_fLightG, +item.m_fLightB], // 灯光颜色
      Center: [
        +item.mLightMesh.position.x,
        +item.mLightMesh.position.y,
        +item.mLightMesh.position.z,
      ], // 灯光中心点
      Normal: Normal || [0.0, -1.0, 0.0], // 光线朝向 （待确定）
      Tangent: Tangent || [1.0, 0.0, 0.0], // 宽边方向（待确定）
      Bitangent: Bitangent || [0.0, 0.0, 1.0], // 矩形高边方向（待确定）
      TwoSide: item.m_bAreaDouble ? 1 : 0, // 双面发光
    }
  }
  _commonGeoTool(item) {
    // 创建以一个包围2盒子
    const box = new THREE.Box3()
    // 设置包围盒尺寸
    const boxSize = new THREE.Vector3(item.m_fAreaLength, 2, item.m_fAreaWidth)
    // 设置包围盒属性（中心坐标，尺寸大小）
    // const { x, y, z } = item.mLightMesh.position
    box.setFromCenterAndSize(item.mLightMesh.position, boxSize)
    var helper = new THREE.Box3Helper(box, 0xffff00);
    helper.normalsNeedUpdate = true;
    // 转成弧度制
    helper.rotation.set(item.m_fRotateX * Math.PI / 180, item.m_fRotateY * Math.PI / 180, item.m_fRotateZ * Math.PI / 180)
    console.log(helper)
    return helper
  }
  // 计算矩形灯光光线朝向
  _calcRectLightNormal(matrix) {
    const res = [...matrix].splice(8, 4)
    res.pop()
    // 向量单位单位话计算
    return Utils.vectoring(res)

  }
  // 计算矩形灯光宽边朝向
  _calcRectLightTangent(matrix) {
    const res = [...matrix].splice(0, 4)
    res.pop()
    return Utils.vectoring(res)
  }
  // 计算矩形高边方向
  _calcRectLightBitangent(matrix) {
    const res = [...matrix].splice(4, 4)
    res.pop()
    return Utils.vectoring(res)
  }
  // 生成射灯（聚光灯）
  generateSpotLightObject(item) {
    return {
      Actor: this.Actor,
      Hand: this.Hand,
      Intensity: +item.m_fIntensity,
      Radius: 100,
      BegAngle: 15.0,
      // EndAngle: 75.0, (是否需要)
      Color: [+item.m_fLightR, +item.m_fLightG, +item.m_fLightB],
      Center: [
        +item.mLightMesh.position.x,
        +item.mLightMesh.position.y,
        +item.mLightMesh.position.z,
      ],
      Normal: [0.0, 0.0, -1.0],
      IesFile: item.m_iIES, // 需要映射
    }
  }
  // 生成太阳光对象
  generateSunLightObject(mLightClass) {
    return {
      Hand: this.Hand,
      Color: [
        +mLightClass.m_fLightR,
        +mLightClass.m_fLightG,
        +mLightClass.m_fLightB,
      ],
      Intensity: +mLightClass.m_fSunIntensity,
      // Dir: mLightClass.m_fSunDirection, // 需要转化
      Phi: 0,
      Theta: 0,
      Distort: 0.3,
      Enable: mLightClass.m_bEnable ? 1 : 0,
    }
  }
  // 生成天光对象
  generateSkyLightObject() {
    const imageurl = $(".body-item-img img").attr("src") || ""
    return {
      Hand: this.Hand,
      Color: [1, 1, 1],
      Intensity: 1,
      Brightness: 1,
      RotateZ: 0,
      Reflection: imageurl,
      Irradiance: "",
      PanoramaType: "sphere",
    }
  }
}