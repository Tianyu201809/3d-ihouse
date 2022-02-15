export class CameraUtils {
  constructor() {
    this.cameraList = []
    this.addAnchor = this.addAnchor.bind(this)
  }
  addAnchor(cameraParams) {
    const { mPos: Origin, name: Name } = cameraParams
    const { x, y, z } = Origin
    const param = {
      Name,
      Point: [+x, +y, +z],
    }
    this.cameraList.push(param)
  }
  getAnchors() {
    return this.cameraList
  }
}