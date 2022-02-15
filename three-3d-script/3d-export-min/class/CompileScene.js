import { Utils } from './Utils'
import DefaultErrorModel from '../default-error-model/defaultErrorModel.json'
const defaultAlpha = 0.1 // 默认透明度
export class CompileScene {
  constructor(options) {
    this.options = options || {
      trs: false,
      onlyVisible: true,
      truncateDrawRange: false,
      binary: false,
      maxTextureSize: Infinity,
    }
  }
  // 将场景对象解析成gltf格式
  // 整体解析
  parse(scene, options = this.options) {
    return new Promise((resolve, reject) => {
      if (!THREE.GLTFExporter) {
        reject("没有引入GLTFExporter")
      }
      let Exporter = new THREE.GLTFExporter()
      // 数据类型转换
      let _scene = Utils.transGeometry2BufferGeometry(scene)
      Exporter.parse(
        _scene,
        result => {
          const nodes = result.nodes
          if (nodes.length > 0) {
            // 数据类型转换，防止渲染器不能识别
            nodes.forEach(item => {
              item.matrix = item.matrix.map(item => +item)
            })
          }
          // modify props
          result = modifyMaterialsProps(result)
          resolve(result)
        },
        error => {
          reject(error)
        },
        options
      )
    })
  }

  // 分片解析
  parseFragment(
    scene,
    options = {
      trs: false,
      onlyVisible: true,
      truncateDrawRange: false,
      binary: false,
      maxTextureSize: Infinity,
    }
  ) {
    // 创建导出对象
    return new Promise((resolve, reject) => {
      // 处理对象数据
      let _scene = Utils.transGeometry2BufferGeometry(scene)
      let promiseArrs = []
      _scene.forEach((item, i) => {
        item = item || {}

        let nodesName = getNeedTransNodeName(item)

        const GLTFExporter = new THREE.GLTFExporter()

        promiseArrs[i] = new Promise((resolve1, reject1) => {
          try {
            GLTFExporter.parse(
              item,
              function (scene) {
                if (scene.nodes.length > 0) {
                  scene.nodes.forEach(item => {
                    item.matrix =
                      item && item.matrix ? item.matrix.map(item => +item) : []
                  })
                }
                // 输出源数据和解析后的数据
                const result = {
                  origin: item,
                  parsedData: scene,
                }
                result.parsedData = formatNodeData(nodesName, result.parsedData)
                // metrial
                result.parsedData = modifyMaterialsProps(result.parsedData)
                resolve1(result)
              },
              function (error) {
                reject1({
                  origin: item,
                  parsedData: null
                })
              },
              options
            )
          } catch (error) {
            console.log(error)
            reject1({
              origin: item,
              parsedData: null
            })
          }
        })
      })
      Promise.all(
        promiseArrs.map(p => {
          return p.catch(d => {
            return d
          })
        })
      )
        .then(result => {
          result = result.map((item, i) => {
            return isLegalData(item, i)
          }).map((item, index) => {
            return markErrorModel(item, index)
          })
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

/**
 * 判断是否是合法数据
 * @param {*} data 
 */
function isLegalData(data, index) {
  if (!data || !data.origin || !data.parsedData) {
    console.log(data, index, '模型数据解析失败')
    // use error model replace
    let defaultErrorModel = generateDedaultModel()
    // get matrix 
    const matrix = data.origin.matrix.elements.map(item => +item) || []
    if (matrix && matrix.length > 0) defaultErrorModel = setModelMatrixArray(matrix, defaultErrorModel)
    data.parsedData = defaultErrorModel
    data.isErrorModel = true
    return data
  }
  return data
}

function markErrorModel(data, index) {
  if (data.parsedData) {
    for (let i = 0; i < data.parsedData.accessors.length; i++) {
      const min = data.parsedData.accessors[i].min
      const max = data.parsedData.accessors[i].max
      if (min.includes(NaN) || max.includes(NaN)) {
        window.errData = data
        // add isErrorModel prop to mark error model
        data.isErrorModel = true
        console.log(data, index, 'GLTF解析后的数据不合法')
        break
      }
    }
  }
  return data
}

/**
 * 透明度材质属性转换
 */
// function transformAlphaProp(data) {
//   if (data.children && data.children.length > 0) {
//     for (let i = 0; i < data.children.length; i++) {
//       if (data.children[i]?.material?.transparent === true) {
//         data.children[i].material.alphaTest = 2
//       }
//     }
//   }
//   return data
// }

/**
 * 透明度材质属性转换
 */
function getNeedTransNodeName(data) {
  let nodeNameArray = []
  if (data.children && data.children.length > 0) {
    for (let i = 0; i < data.children.length; i++) {
      if (data.children[i]?.material?.transparent === true) {
        nodeNameArray.push(data.children[i].material.name)
      }
    }
  }
  return nodeNameArray
}

/**
 * 根据映射数组，转化生成的值
 * @param { *Array } nodesName 
 * @param { *Object } parsedNode 
 * @returns { Object }
 */
function formatNodeData(nodesName, parsedNode) {
  if (nodesName && nodesName.length > 0) {
    for (let i = 0; i < nodesName.length; i++) {
      // 获取材质信息
      const materialsData = parsedNode['materials']
      if (materialsData && materialsData.length > 0) {
        materialsData.forEach((iv) => {
          if (iv.name && iv.name === nodesName[i]) {
            // 将模型透明度设置为0.1
            iv.pbrMetallicRoughness.baseColorFactor[3] = defaultAlpha
          }
        })
      }
    }
  }
  return parsedNode
}

// trans metrial props
function modifyMaterialsProps(parsedNode) {
  const materialsData = parsedNode['materials']
  if (Array.isArray(materialsData) && materialsData.length > 0) {
    // modify props
    materialsData.forEach(element => {
      element.pbrMetallicRoughness.metallicFactor = 0.1
      element.pbrMetallicRoughness.roughnessFactor = 1
    });
  }
  return parsedNode
}

/**
 * create default model
 * @returns 
 */
function generateDedaultModel() {
  let defaultModel = DefaultErrorModel
  defaultModel.isErrorModel = true
  return defaultModel
}

/**
 * set error model matrix array
 */
function setModelMatrixArray(matrix, modelData) {
  modelData.nodes.forEach((item) => {
    if (item.children) {
      item.matrix = matrix
    }
  })
  return modelData
}