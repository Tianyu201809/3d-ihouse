import { Download } from '../class/Download'
import { Utils } from '../class/Utils'
import { generateCameraJSON, generateFramesJSON } from '../generator/frame'
import { generateFurnitureFragmentGLTF } from '../generator/furniture'
import { generateLightJSON } from '../generator/lights'
import { generateHouseGLTF } from '../generator/scene'
import { CompileScene } from '../class/CompileScene'
import { generateSceneUnit } from '../generator/sceneUnit'
/**
 * 导出户型gltf
 */
export async function exportHouseGLTF() {
  try {
    let houseGLTF = await generateHouseGLTF(scene3D)
    let downloader = new Download()
    const suffix = ".gltf"
    downloader.saveString(Utils.transData2String(houseGLTF), 'scene', suffix)
  } catch (error) {
    console.error(error)
  }
}

/**
 * 导出家具gltf(独立导出)
 * 每个家具导出一个gltf文件
 * @param {*} scene3D
 * @param {*} condition
 */
export async function exportFurnitureFragmentGLTF() {
  try {
    let actorsAndFurniture = await generateFurnitureFragmentGLTF(scene3D)
    let { furnitureGLTFArrays, actorsJSON } = actorsAndFurniture
    let downloader = new Download()
    const suffix = ".gltf"
    // download actors.json
    exportActors(actorsJSON)
    // download furniture gltf
    furnitureGLTFArrays.forEach((item, index) => {
      setTimeout(() => {
        downloader.saveString(
          Utils.transData2String(item.parsedData),
          "furniture" + index,
          suffix
        )
      }, index * 500)
    })
  } catch (error) {
    console.log(error)
  }
}

/**
 * 导出灯光
 * @param {*} mLightClass 
 */
export function exportLightJSON(mLightClass) {
  const lightJSON = generateLightJSON(mLightClass)
  const downloader = new Download()
  const suffix = ".json"
  downloader.saveString(Utils.transData2String(lightJSON), "lights", suffix)
}

/**
 * 导出相机
 * @param {*} camera 
 */
export function exportCameraJSON(camera) {
  const data = generateCameraJSON(camera)
  const downloader = new Download()
  const suffix = ".json"
  downloader.saveString(Utils.transData2String(data), "frame", suffix)
}

/**
 * 导出frames json文件
 * @param {*} camera 
 */
export function exportFramesJSON(camera) {
  const data = generateFramesJSON(camera)
  const downloader = new Download()
  const suffix = ".json"
  downloader.saveString(Utils.transData2String(data), "frames", suffix)
}


/**
 * 下载actors.json
 * @param {*} actorsJSON
 */
function exportActors(actorsJSON) {
  const downloader = new Download()
  downloader.saveString(Utils.transData2String(actorsJSON), "actors", ".json")
}

export async function exportAllModule() {
  const compiler = new CompileScene()
  const condition = {
    type: ['Mesh', 'Group'],
    name: ''
  }
  let scenes = Utils.filter(scene3D.children, condition)
  scenes = Utils.transGeometry2BufferGeometry(scenes)
  let res = await compiler.parse(scenes)
  const downloader = new Download()
  downloader.saveString(JSON.stringify(res, null, 2), 'all', '.gltf')
}

/**
 * 下载单位文件
 */
export async function exportSceneUnitJSON(){
  const sceneUnit = generateSceneUnit()
  const downloader = new Download()
  downloader.saveString(JSON.stringify(sceneUnit, null, 2), 'scene', '.json')
}