const THREE = require('three');
const Canvas = require('canvas');
const { Blob, FileReader } = require('vblob');
const config = require('./config')
// 需要模拟浏览器运行时
global.window = global;
global.Blob = Blob;
global.FileReader = FileReader;
global.THREE = THREE;
global.document = {
  createElement: (nodeName) => {
    if (nodeName !== 'canvas') throw new Error(`Cannot create node ${nodeName}`);
    const canvas = new Canvas(256, 256);
    return canvas;
  }
};


/**
 * 初始化场景
 */
const HouseClass = require('./components/HouseClass')


export function initSceneFromXML() {
  global.scene3D = new THREE.Scene()
  global.mHouseClass = new HouseClass();
  mHouseClass.OnInit();
}