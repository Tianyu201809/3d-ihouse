import { UploadFile } from '../class/UploadFile'
import { generateCameraJSON, generateFramesJSON } from '../generator/frame'
import { generateFurnitureFragmentGLTF } from '../generator/furniture'
import { generateLightJSON } from '../generator/lights'
import { generateHouseGLTF } from '../generator/scene'
import { generateSceneUnit } from '../generator/sceneUnit'
import { renderId } from '../config/index'
/**
 * 上传户型gltf
 * @param {*} scene3D
 * @param {*} condition
 * @param {*} uploadUrl
 */
export async function uploadHouseGLTF(
  scene3D,
  condition = {
    type: ["Mesh"],
    name: "",
  },
  uploadUrl
) {
  try {
    let houseGLTF = await generateHouseGLTF(scene3D, condition)
    const uploader = new UploadFile()
    await uploader.uploadFile(uploadUrl, houseGLTF, { filename: "scene.gltf", renderId })
  } catch (error) {
    console.error(error)
  }
}

/**
 * 上传actors.json
 * @param {*} actorsJSON
 */
export async function uploadActors(actorsJSON) {
  try {
    const uploader = new UploadFile()
    await uploader.uploadFile(uploadUrl, actorsJSON, { filename: "actors.json", renderId })
  } catch (error) {
    console.log(error)
  }
}

/**
 * 上传家具文件
 */
export async function uploadFurnitureFragmentGLTF(scene3D, uploadUrl, actorsUrl) {
  try {
    let actorsAndFurniture = await generateFurnitureFragmentGLTF(scene3D)
    let { furnitureGLTFArrays, actorsJSON } = actorsAndFurniture
    const uploader = new UploadFile()
    await uploader.uploadFile(actorsUrl, actorsJSON, { filename: "actors.json", renderId })
    // 创建每一个家具上传文件item
    const mulOptions = new Array(furnitureGLTFArrays.length).fill(0).map((item, i) => {
      const obj = {}
      obj['filename'] = "furniture" + i + '.gltf'
      obj['renderId'] = renderId
      return obj
    })
    await uploader.uploadMulFile(
      uploadUrl,
      furnitureGLTFArrays.map(item => item.parsedData),
      mulOptions
    )
  } catch (error) {
    console.log(error)
  }
}

/**
 * 上传相机文件
 * @param {*} camera 
 * @param {*} uploadUrl 
 */
export async function uploadCameraJSON(camera, uploadUrl) {
  try {
    const data = generateCameraJSON(camera)
    const uploader = new UploadFile()
    await uploader.uploadFile(uploadUrl, data, { filename: "frame.json", renderId })
  } catch (error) {
    console.log(error)
  }
}
/**
 * 
 * @param {*} mLightClass 
 * @param {*} uploadUrl 
 */
export async function uploadFramesJSON(camera, uploadUrl) {
  try {
    const data = generateFramesJSON(camera)
    console.log(data)
    const uploader = new UploadFile()
    await uploader.uploadFile(uploadUrl, data, { filename: "frames.json", renderId })
  } catch (error) {
    console.log(error)
  }
}

export async function uploadLightJSON(mLightClass, uploadUrl) {
  try {
    const lightJSON = generateLightJSON(mLightClass)
    const uploader = new UploadFile()
    await uploader.uploadFile(uploadUrl, lightJSON, { filename: "lights.json", renderId })
  } catch (error) {
    console.log(error)
  }
}

/**
 * 上传场景单位文件
 */
export async function uploadSceneUnit(uploadUrl) {
  try {
    const sceneUnitJSON = generateSceneUnit()
    const uploader = new UploadFile()
    await uploader.uploadFile(uploadUrl, sceneUnitJSON, { filename: "scene.json", renderId })
  } catch (error) {
    console.log(error)
  }
}