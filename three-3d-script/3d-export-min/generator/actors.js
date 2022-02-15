import { ActorsUtils } from '../class/ActorsUtils'
/**
 * 生成actors.json文件
 */
export function generateActorsJSON(furnitureGLTFArrays) {
  // 家具映射对象
  let FurnitureArray = mHouseClass.mFurnitureArray.map(item => {
    const obj = {}
    obj["m_strFile"] = item.m_strFile
    obj["m_Object"] = item.m_Object
    return obj
  })
  let actors = new ActorsUtils()
  furnitureGLTFArrays.forEach((item, index) => {
    const { origin } = item
    const { nodes: itemNodes = [] } = item.parsedData
    let lowModelId = null
    // 获取家具的世界坐标
    let matrix = null

    const { isErrorModel = false } = item
    for (let i = 0; i < itemNodes.length; i++) {
      if (itemNodes[i].children) {
        matrix = itemNodes[i].matrix
        break
      }
    }
    // 找到映射的str
    for (let j = 0; j < FurnitureArray.length; j++) {
      if (origin === FurnitureArray[j]["m_Object"]) {
        lowModelId = FurnitureArray[j]["m_strFile"]
        break
      }
    }

    const filename = "furniture" + index + ".gltf"
    actors.addChildren(matrix, filename, lowModelId, isErrorModel)
  })
  actors.addRootPart('scene.gltf')
  const actorsJSON = actors.generateOutputObject()
  return actorsJSON
}