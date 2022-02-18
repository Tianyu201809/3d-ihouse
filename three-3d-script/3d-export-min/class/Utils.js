export class Utils {
  // 多条件过滤函数
  static filter(arr, condition) {
    return arr.filter(item => {
      return Object.keys(condition).every(key => {
        if (Array.isArray(condition[key])) {
          return condition[key].some(k => {
            return String(k).includes(String(item[key]))
          })
        } else {
          return String(condition[key]).includes(String(item[key]))
        }
      })
    })
  }
  // 数据格式转化
  static transGeometry2BufferGeometry(objArrs) {
    if (!THREE) {
      throw new Error("没有引入THREE js")
    }
    objArrs.forEach(item => {
      if (item.geometry && item.geometry instanceof THREE.Geometry) {
        item.geometry = new THREE.BufferGeometry().fromGeometry(item.geometry)
      }
    })
    return objArrs
  }
  static transData2String(data, space = 2) {
    return JSON.stringify(data, null, space)
  }
  static UnitConverter(val) {
    return val * Math.PI / 180
  }
  static vectoring(vector3) {
    const l = Math.pow(vector3[0], 2)
    const m = Math.pow(vector3[1], 2)
    const n = Math.pow(vector3[2], 2)
    const result = Math.sqrt(l + m + n)

    const l1 = vector3[0] / result
    const m1 = vector3[1] / result
    const n1 = vector3[2] / result
    return [l1, m1, n1]
  }
  static sleep(time = 2000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
}