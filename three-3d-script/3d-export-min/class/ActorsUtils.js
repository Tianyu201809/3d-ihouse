export class ActorsUtils {
  constructor() {
    this.Parts = []
    this.Childrens = []
    this.addChildren = this.addChildren.bind(this)
    this.addRootPart = this.addRootPart.bind(this)
    this.Hand = 'LeftY' // 默认坐标规范字段
  }
  addRootPart(filename) {
    if (!filename) return
    const array = [
      {
        Package: filename,
      },
    ]
    this.Parts.push(...array)
  }
  addChildren(matrix, filename, lowModel = "", isErrorModel = false) {
    if (!matrix || !filename) return
    const obj = {
      Transform: matrix,
      Parts: [
        {
          lowModel, // 低模唯一标识
          Package: filename,
          isErrorModel,
        },
      ],
    }
    this.Childrens.push(obj)
  }
  generateOutputObject() {
    return {
      Hand: this.Hand, // 在根结点设置坐标
      Parts: this.Parts,
      Actors: this.Childrens,
    }
  }
}