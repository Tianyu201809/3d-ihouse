import { THREE_GLTFEXPORTER_SRC_CDN } from './config/index'
//创建一个script标签
export function loadThreeGLTFExporterPlugin() {
  const THREE_GLTFEXPORTER_SRC_CDN_ID = "gltf_cdn"
  const tag = document.querySelector("#" + THREE_GLTFEXPORTER_SRC_CDN_ID)
  if (tag) {
    return Promise.resolve()
  } else {
    return new Promise((resolve) => {
      const doc = document.getElementsByTagName('head')[0]
      const script = document.createElement("script");  //创建一个script标签
      script.setAttribute('type', 'text/javascript')
      script.setAttribute('src', THREE_GLTFEXPORTER_SRC_CDN)
      script.setAttribute('id', THREE_GLTFEXPORTER_SRC_CDN_ID)
      doc.appendChild(script)
      script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          resolve()
        }
        script.onload = script.onreadystatechange = null
      }
    })
  }
}