import { FrameUtils } from '../class/FramesUtils'
/**
 * 生成相机JSON文件
 */
export function generateCameraJSON(camera) {
  // 获取分辨率
  const resolution = $("#definition_2 .body-item-btn-link p").text()
  const temp = resolution.split("X")
  const Width = +temp[0]
  const Height = +temp[1]
  // 相机
  let worldDirection = camera.getWorldDirection()
  let cameraPosition = camera.position
  const { x: x1, y: y1, z: z1 } = worldDirection
  const { x: x2, y: y2, z: z2 } = cameraPosition
  const Target = [
    x1 + x2, y1 + y2, z1 + z2
  ]
  const Camera = {
    // Hand: "LeftY", // 坐标
    Actor: "House",
    Origin: [+camera.position.x, +camera.position.y, +camera.position.z],
    Target,
    Up: [+camera.up.x, +camera.up.y, +camera.up.z],
    Fov: +camera.fov,
    FarClip: +camera.far,
    NearClip: +camera.near,
  }
  // 视口
  const Panorama = $(".head-ItemLink").text() === '效果图' ? 0 : 1
  const Viewport = {
    // 分辨率
    Width,
    Height,
    Tonemapping: "Aces",
    Gamma: 2.2, // 默认值
    Panorama, // 0 效果图， 1 全景图
    GreyLum: 1,
    LightScheme: "lights.json",
  }
  // 锚点
  // let cameraUtils = new CameraUtils()
  // const cameraList = JSON.parse(window.opener.mPluginsClass.mJsonData)
  // let Anchors = []
  // if (cameraList && cameraList.length > 0) {
  //   cameraList.forEach(item => {
  //     cameraUtils.addAnchor(item)
  //   })
  //   Anchors = cameraUtils.getAnchors()
  // }

  // 预览
  // let Preview = {
  //   Directory: "",
  //   FileName: "",
  //   Suffix: "png",
  //   CompressLevel: "",
  //   Channels: "",
  //   ResScale: 1,
  // }
  // 输出
  const Output = {
    Directory: "",
    FileName: "",
    Suffix: "png",
    CompressLevel: "",
    Channels: "",
    ResScale: 1,
  }
  return {
    Camera,
    Viewport,
    // Anchors,
    // Preview,
    Output,
  }
}

export function generateFramesJSON() {
  // 多帧渲染
  const cameraList = JSON.parse(window.opener.mPluginsClass.mJsonData)
  const frameInstance = new FrameUtils()
  cameraList.forEach((item) => {
    frameInstance.addFrameData(item)
  })
  return frameInstance.getFramesJSON()
}