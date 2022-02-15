import { loadThreeGLTFExporterPlugin } from './lib/three-gltf-exporter'
import {
  uploadHouseGLTF,
  uploadFurnitureFragmentGLTF,
  uploadCameraJSON,
  uploadLightJSON,
  uploadFramesJSON,
  uploadSceneUnit
} from './uploader/index'
import {
  exportHouseGLTF,
  exportFurnitureFragmentGLTF,
  exportLightJSON,
  exportCameraJSON,
  exportFramesJSON,
  exportAllModule,
  exportSceneUnitJSON
} from './exporter/index'
import {
  houseUploadUrl,
  furnitureUploadUrl,
  actorsUploadUrl,
  frameUploadUrl,
  lightUploadUrl
} from './config/index'

/**
 * 文件下载函数
 * 户型文件
 * 家具文件
 * 相机文件
 * 灯光文件
 */
async function exportResources() {
  const flag = window.isZQBackendSupported()
  exportHouseGLTF(scene3D)
  exportFurnitureFragmentGLTF(scene3D)
  !flag ? exportCameraJSON(camera) : exportFramesJSON(camera)
  exportLightJSON(mLightClass)
  exportSceneUnitJSON()
}

/**
 * 文件上传函数
 */
async function uploadResources() {
  try {
    const flag = window.isZQBackendSupported()
    await uploadHouseGLTF(scene3D, { type: ["Mesh"], name: "" }, houseUploadUrl)
    await uploadCameraJSON(camera, frameUploadUrl)
    // 如果是众趣后端数据，则需要上传frames.json
    if (flag) await uploadFramesJSON(camera, frameUploadUrl)
    await uploadLightJSON(mLightClass, lightUploadUrl)
    await uploadFurnitureFragmentGLTF(scene3D, furnitureUploadUrl, actorsUploadUrl)
    // 上传户型单位
    await uploadSceneUnit(houseUploadUrl)
  } catch (error) {
    console.log(error)
  }
}
/**
 * 判断当前应该但真渲染还是多帧数渲染
 */
window.isZQBackendSupported = function () {
  const data = JSON.parse(window.opener.mPluginsClass.mJsonData)
  return data && data.length > 0
}
/**
 * ***************************************
 * 以下代码为可修改部分逻辑
 * mode值设置为1则为上传操作
 * mode值设置为2则为下载操作
 * ***************************************
 */

window.mode = 1 // 模式：1:上传 2: 下载
// 脚本执行的函数
window.exec = async function () {
  try {
    await loadThreeGLTFExporterPlugin()
    if (window.mode === 1) {
      uploadResources()
    } else if (window.mode === 2) {
      exportResources()
    } else {
      alert('模式错误')
    }
  } catch (error) {
    alert(error)
  }
}
window.exec2 = async function(){
  exportAllModule()
}
exec()