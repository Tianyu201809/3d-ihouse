export class Download {
  constructor(isCreateFile = true) {
    this.isCreateFile = isCreateFile
    this.suffix = ".gltf"
  }
  // 保存
  saveString(text, filename, suffix = ".gltf") {
    this.save(new Blob([text], { type: "text/plain" }), filename + suffix)
  }
  // 保存buffer
  saveArrayBuffer(buffer, filename, suffix) {
    this.save(
      new Blob(
        [buffer],
        { type: "application/octet-stream" },
        filename + suffix
      ),
      filename
    )
  }
  // 模拟a标签点击下载
  save(blob, filename) {
    const url = URL.createObjectURL(blob)
    const $a = document.createElement("a")
    $a.setAttribute("href", url)
    $a.setAttribute("download", filename)
    $a.setAttribute("target", "_blank") //弹出窗
    $a.click()
    $a.remove()
  }
}