const express = require('express');
// const fs = require('fs');
// const THREE = require('three');
// const Canvas = require('canvas');
// const { Blob, FileReader } = require('vblob');
// const zqdataAPI = require('../api/zqdata');
// // 需要模拟浏览器运行时
// global.window = global;
// global.Blob = Blob;
// global.FileReader = FileReader;
// global.THREE = THREE;
// global.document = {
//   createElement: (nodeName) => {
//     if (nodeName !== 'canvas') throw new Error(`Cannot create node ${nodeName}`);
//     const canvas = new Canvas(256, 256);
//     return canvas;
//   }
// };

// // 添加下载解析插件
// const Exporter = require('three-gltf-exporter');
// const exporter = new Exporter()
var router = express.Router();

// router.post('/getZQSceneData', function (req, res) {
//   // const base64Data = req.params.zqdata
//   // const parameter = Utils.base64_decode(base64Data)
//   // const arrSec = parameter.split('&');
//   // const sid = arrSec[0].split('=')[1];
//   // const user = arrSec[1].split('=')[1];
//   // const passwd = arrSec[2].split('=')[1];
//   const id = 'cea52cb0f21544b88472c80c0be31bfe'
//   zqdataAPI.getZQData(id).then((data) => {
//     res.send({
//       code: 1,
//       data
//     })
//   }).catch((e) => {
//     console.log(e)
//     res.send({
//       code: 2,
//       data: e
//     })
//   })
// })

module.exports = router