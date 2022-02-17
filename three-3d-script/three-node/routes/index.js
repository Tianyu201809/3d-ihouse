const express = require('express');
// const app = express();
// 添加THREE
// const THREE = require('three');
// const Canvas = require('canvas');
// const { Blob, FileReader } = require('vblob');
// const config = require('./config')
// // 需要模拟浏览器运行时
// global.window = global;
// global.Blob = Blob;
// global.FileReader = FileReader;
// global.THREE = THREE;
// global.document = {
//   createElement: (nodeName) => {
//     if (nodeName !== 'canvas') throw new Error(`Cannot create node ${nodeName}`);
//     const canvas = new Canvas(256, 256);
//     // This isn't working — currently need to avoid toBlob(), so export to embedded .gltf not .glb.
//     // canvas.toBlob = function () {
//     //   return new Blob([this.toBuffer()]);
//     // };
//     return canvas;
//   }
// };

// 添加下载解析插件
// const Exporter = require('three-gltf-exporter');
// const exporter = new Exporter()
var router = express.Router();

router.get('/', async function (req, res, next) {
  next()
});

// // scene解析测试接口
// router.post('/scene', async function (req, res, next) {
//   try {
//     let gltfData = await compileScene3D(req.body.scene)
//     res.status(200).send({
//       data: gltfData
//     })
//   } catch (error) {
//     res.status(400).send({
//       data: 'error'
//     })
//   }
// })

// const compileScene3D = async function () {
//   try {
//     return new Promise((resolve, reject) => {
//       let scene = generateScence()
//       exporter.parse(scene, function (data) {
//         // 经过解析之后生成的gltf对象数据
//         resolve(data)
//       }, function () {
//         reject(error)
//       }, {
//         trs: false,
//         onlyVisible: false,
//         truncateDrawRange: false,
//         binary: false,
//         maxTextureSize: Infinity,
//       })
//     })
//   } catch (error) {
//     console.log(error)
//     return Promise.reject(error)
//   }
// }

// // 生成scene数据
// const generateScence = function () {
//   return {
//     "metadata": {
//       "version": 4.5,
//       "type": "Object",
//       "generator": "Object3D.toJSON"
//     },
//     "geometries": [
//       {
//         "uuid": "84625722-FFB0-4A0C-AD0C-28385FC19784",
//         "type": "PlaneGeometry",
//         "width": 1,
//         "height": 1,
//         "widthSegments": 1,
//         "heightSegments": 1
//       }
//     ],
//     "materials": [
//       {
//         "uuid": "1289C335-4129-4911-B22E-281D137E2E05",
//         "type": "MeshBasicMaterial",
//         "color": 16777215,
//         "map": "C718A158-EBD5-4184-9AA5-7631C9A10251",
//         "reflectivity": 1,
//         "refractionRatio": 0.98,
//         "blending": 4,
//         "depthFunc": 3,
//         "depthTest": true,
//         "depthWrite": true,
//         "colorWrite": true,
//         "stencilWrite": false,
//         "stencilWriteMask": 255,
//         "stencilFunc": 519,
//         "stencilRef": 0,
//         "stencilFuncMask": 255,
//         "stencilFail": 7680,
//         "stencilZFail": 7680,
//         "stencilZPass": 7680,
//         "toneMapped": false
//       }
//     ],
//     "textures": [
//       {
//         "uuid": "C718A158-EBD5-4184-9AA5-7631C9A10251",
//         "name": "",
//         "mapping": 300,
//         "repeat": [
//           1,
//           1
//         ],
//         "offset": [
//           0,
//           0
//         ],
//         "center": [
//           0,
//           0
//         ],
//         "rotation": 0,
//         "wrap": [
//           1001,
//           1001
//         ],
//         "format": 1023,
//         "type": 1009,
//         "encoding": 3000,
//         "minFilter": 1008,
//         "magFilter": 1006,
//         "anisotropy": 1,
//         "flipY": true,
//         "premultiplyAlpha": false,
//         "unpackAlignment": 4,
//         "image": "75218931-B17C-439C-A3F9-6C5F33D9565A"
//       }
//     ],
//     "images": [
//       {
//         "uuid": "75218931-B17C-439C-A3F9-6C5F33D9565A",
//         "url": "data:image/png;base64,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"
//       }
//     ],
//     "object": {
//       "uuid": "39289E04-1164-4C09-95B6-6707CD6F04E9",
//       "type": "Mesh",
//       "layers": 1,
//       "matrix": [
//         2,
//         0,
//         0,
//         0,
//         0,
//         4.440892098500626e-16,
//         -2,
//         0,
//         0,
//         2,
//         4.440892098500626e-16,
//         0,
//         0,
//         -1.1,
//         -0.25,
//         1
//       ],
//       "geometry": "84625722-FFB0-4A0C-AD0C-28385FC19784",
//       "material": "1289C335-4129-4911-B22E-281D137E2E05"
//     }
//   }
// }

// // 文件下载





module.exports = router;
