import { Utils } from '../class/Utils'
import { CompileScene } from '../class/CompileScene'
import { coordinateTransformation, deepClone } from '../utils/index'
export async function generateHouseGLTF(
  scene3D,
  condition = {
    // "PointLight", "AmbientLight", "PerspectiveCamera"
    type: ["Mesh"],
    name: "",
  }
) {
  try {
    let Meshs = Utils.filter(deepClone(scene3D.children), condition)
    Meshs = Utils.transGeometry2BufferGeometry(Meshs)
    // 暂时注释
    // Meshs.forEach(item => coordinateTransformation(item))
    let lightsArray = mLightClass.mLightArray
    // 过滤掉灯光信息
    lightsArray.forEach(item => {
      const lightObject = item.mLightMesh
      for (let i = 0; i < Meshs.length; i++) {
        const element = Meshs[i]
        if (element === lightObject) {
          Meshs[i] = null
        }
      }
    })
    Meshs = Meshs.filter(item => item)
    let compiler = new CompileScene()
    let houseGLTF = await compiler.parse(Meshs)
    return houseGLTF
  } catch (error) {
    return Promise.reject(error)
  }
}