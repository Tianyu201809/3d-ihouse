export class UploadFile {
  constructor() { }
  // 上传文件（单个）
  uploadFile(url, data, {
    filename,
    renderId
  }) {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      })
      formData.append("file", blob)
      formData.append("filename", filename)
      formData.append("renderId", renderId)
      $.ajax({
        type: "post",
        url,
        data: formData,
        processData: false, //不可缺
        cache: false,
        contentType: false,
        dataType: "json",
        success: data => {
          resolve(data)
        },
        error: e => {
          reject(e)
        },
      })
    })
  }
  // 上传文件（多个）
  uploadMulFile(url, files, options) {
    return new Promise((resolve, reject) => {
      let allFormData = []
      for (let i = 0; i < files.length; i++) {
        const item = files[i]
        const formData = new FormData()
        const blob = new Blob([JSON.stringify(item, null, 2)], {
          type: "application/json",
        })
        formData.append("file", blob)
        formData.append('filename', options[i].filename)
        formData.append('renderId', options[i].renderId)
        allFormData.push(formData)
      }
      (function loop(count) {
        $.ajax({
          type: "POST",
          url,
          data: allFormData[count],
          processData: false, //不可缺
          cache: false,
          contentType: false,
          dataType: "json",
          success: data => {
            count = count + 1
            if (count < files.length) {
              loop(count)
            } else {
              resolve()
            }
          },
          error: e => {
            console.log(e)
            count = count + 1
            if (count < files.length) {
              loop(count)
            } else {
              resolve()
            }
          },
        })
      })(0)
    })
  }
}