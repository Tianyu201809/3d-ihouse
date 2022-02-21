/**
 * 调用渲染器
 */
import { callRendererUrl } from '../config/index'
export function callRenderer(renderId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'post',
      url: callRendererUrl,
      data: {
        renderId
      },
      success(data) {
        resolve(data)
      },
      error(error) {
        reject(error)
      }
    })
  })
}