export class ActorsUtils {
  constructor() {
    this.Parts = [] // 根节点
    this.Childrens = [] // 子节点
    this.addChildren = this.addChildren.bind(this)
    this.addRootPart = this.addRootPart.bind(this)
    this.Hand = 'LeftY' // 默认坐标规范字段
    this.LengthUnit = 'CM' // unit
    this.sceneNodeName = '户型'
    this.childrenNodeName = '软装'
  }
  // addRootPart(filename) {
  //   if (!filename) return
  //   const array = [
  //     {
  //       Package: filename,
  //     },
  //   ]
  //   this.Parts.push(...array)
  // }
  // addChildren(matrix, filename, lowModel = "", isErrorModel = false) {
  //   if (!matrix || !filename) return
  //   const obj = {
  //     Transform: matrix,
  //     Parts: [
  //       {
  //         lowModel, // 低模唯一标识
  //         Package: filename,
  //         isErrorModel,
  //       },
  //     ],
  //   }
  //   this.Childrens.push(obj)
  // }
  /**
   * 添加户型数据json
   * @param {*} filename 
   */
  addRootPart(filename) {
    const obj = {
      Name: this.sceneNodeName,
      HandType: this.Hand,
      LengthUnit: this.LengthUnit,
      Package: filename
    }
    this.Parts.unshift(obj)
  }
  /**
   * 添加家具数据json
   * @param {*} matrix 
   * @param {*} filename 
   * @param {*} lowModel 
   * @param {*} isErrorModel 
   * @returns 
   */
  addChildren(matrix, filename, lowModel = "", isErrorModel = false) {
    if (!matrix || !filename) return
    const obj = {
      Name: filename,
      Transform: matrix,
      lowModel,
      isErrorModel
    }
    this.Childrens.push(obj)
  }

  /**
   * 生成actors.json
   * @returns 
   */
  generateOutputObject() {
    let childrenNode = {}
    childrenNode['Name'] = this.childrenNodeName
    childrenNode['Actors'] = this.Childrens
    this.Parts.push(childrenNode)
    return this.Parts
  }
}