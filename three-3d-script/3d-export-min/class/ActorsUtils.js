export class ActorsUtils {
  constructor() {
    this.Parts = [] // 根节点
    this.Childrens = [] // 子节点
    this.addChildren = this.addChildren.bind(this)
    this.addRootPart = this.addRootPart.bind(this)
    this.HandType = 'LeftY' // 默认坐标规范字段
    this.LengthUnit = 'CM' // unit
    this.sceneNodeName = 'House'
    this.childrenNodeName = 'Deco'
  }

  /**
   * 添加户型数据json
   * @param {*} filename 
   */
  addRootPart(filename) {
    const obj = {
      Name: this.sceneNodeName,
      HandType: this.HandType,
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
      HandType: this.HandType,
      LengthUnit: this.LengthUnit,
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