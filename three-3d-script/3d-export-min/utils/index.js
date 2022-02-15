/**
 * 数组多条件过滤
 * @param {*} arr 
 * @param {*} condition 
 * @returns 
 */
export function mulFilterCondition(arr, condition) {
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
export function deepClone(obj) {
  var o = obj instanceof Array ? [] : {};
  for (var k in obj)
    o[k] = typeof obj[k] === Object ? clone(obj[k]) : obj[k];
  return o;
}

/**
 * 场景坐标转换
 * 左手坐标系转换成右手坐标系
 * x取负，yz互换
 */

export function coordinateTransformation(object) {
  const x = object.position.x
  const y = object.position.y
  const z = object.position.z
  object.position.x = +(-x)
  object.position.y = +z
  object.position.z = +y
}

/**
 * 数组转化成类数组
 * @param {*} arr 
 * @returns 
 */
export function array2Object(arr) {
  if (!Array.isArray(arr)) return
  let obj = {}
  return [].push.apply(obj, arr)
}