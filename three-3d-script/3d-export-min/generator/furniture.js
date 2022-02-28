import { Utils } from '../class/Utils'
import { CompileScene } from '../class/CompileScene'
import { generateActorsJSON } from '../generator/actors'
import { deepClone } from '../utils/index'

/**
 * 生成家具gltf
 * @param {*} scene3D
 * @param {*} condition
 */
export async function generateFurnitureFragmentGLTF(
  scene3D,
  condition = {
    type: ["Group"],
    name: "",
  }
) {
  let Groups = Utils.filter(deepClone(scene3D.children), condition)
  Groups = Utils.transGeometry2BufferGeometry(Groups)
  // 暂时注释
  // Groups.forEach(item => coordinateTransformation(item))
  let compiler = new CompileScene()

  // 单独解析每一个家具为一个gltf
  let furnitureGLTFArrays = await compiler.parseFragment(Groups)

  // 生成actors.json数据
  const actorsJSON = generateActorsJSON(furnitureGLTFArrays)
  // 生成每一个家具gltf
  furnitureGLTFArrays.forEach(item => {
    const itemNodes = item.parsedData.nodes
    for (let i = 0; i < itemNodes.length; i++) {
      if (itemNodes[i].children) {
        delete itemNodes[i].matrix
        continue
      }
      if (itemNodes[i].matrix && itemNodes[i].matrix.length === 0) {
        delete itemNodes[i].matrix
        continue
      }
    }
  })
  return {
    actorsJSON,
    furnitureGLTFArrays,
  }
}