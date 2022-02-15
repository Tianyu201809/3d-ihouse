/**
 * 多帧渲染生成文件工具类
 */
export class FrameUtils {
  constructor() {
    const panorama = $(".head-ItemLink").text() === '效果图' ? 0 : 1
    // 获取分辨率
    const resolution = $("#definition_2 .body-item-btn-link p").text()
    const temp = resolution.split("X")
    const Width = +temp[0]
    const Height = +temp[1]

    // 设置初始值
    this.frames = []
    this.cameras = {}
    this.GreyLum = 1 // 当像素亮度为该值时显示为中灰色。所以该值越小，画面越 亮。取值范围(0, +无穷)
    this.Panorama = panorama // 0表示渲染普通效果图，1表示渲染全景图
    this.Width = Width || 1600
    this.Height = Height || 1000
    this.Tonemapping = "Aces" // 最终阶段颜色映射，可选[“Aces”，“Clamp”, "Reinhard"]
    this.Directory = "/rendering/"
    this.Hand = "LeftY"
  }
  _addCamera(camera) {
    const { mPos: Origin, name: Name, mLookAt: Target, hfov } = camera
    const { x, y, z } = Origin
    const { x: x1, y: y1, z: z1 } = Target
    const cameraItem = {
      Hand: this.Hand,
      FarClip: window.camera.far || 0.1,
      Fov: hfov,
      NearClip: window.camera.near || 10000.0,
      Origin: [
        x, y, z
      ],
      Target: [
        x1, y1, z1
      ],
      Up: [0, 0, 1]
    }
    this.cameras[Name] = cameraItem
  }
  _addFrame(cameraName) {
    const frameItem = {
      Camera: cameraName,
      GreyLum: this.GreyLum,
      Height: this.Height,
      Panorama: this.Panorama,
      TonemapFunc: this.TonemapFunc,
      Width: this.Width,
      Output: {
        FileName: "frame" + "_" + cameraName,
        Directory: this.Directory
      },
      // Preview: {
      //   FileName: "frame" + "_" + cameraName,
      //   Directory: this.Directory
      // }
    }
    this.frames.push(frameItem)
  }
  // 添加数据
  addFrameData(camera) {
    const cameraName = camera.name || 'temp'
    this._addCamera(camera)
    this._addFrame(cameraName)
  }
  getCameras() {
    return this.cameras
  }
  getFramesList() {
    return this.frames
  }
  // 获取json数据
  getFramesJSON() {
    return {
      Cameras: this.cameras,
      Frames: this.frames
    }
  }
}