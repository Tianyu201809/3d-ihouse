const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const config = require('./config')

// if model is error, use this model replace it
const DefaultGLTFModelName = 'normalModel.gltf'

/**
 * 户型gltf上传接口
 */
router.post(
  "/uploadFile/house",
  multer({ dest: `resources/temp-house` }).array("file", 100),
  //upload.single('file'),
  async (req, res) => {
    const renderId = req.body.renderId || ''
    const filename = req.body.filename || 'temp'
    console.log(filename)
    // 将文件保存到目录中
    let oldPath = `resources/temp-house`
    let newPath = `resources/${renderId}`
    try {
      await commonUpload(renderId, oldPath, newPath, filename)
      res.json({
        code: 1,
        data: "文件上传成功",
        filename
      });
    } catch (error) {
      res.json({
        code: 2,
        data: "文件上传失败",
        filename
      });
    }
  }
);

/**
 * 家具gltf上传接口
 */
router.post(
  "/uploadFile/furniture",
  multer({ dest: `resources/temp-furniture` }).array("file", 10),
  //upload.single('file'),
  async (req, res) => {
    const renderId = req.body.renderId || ''
    const filename = req.body.filename || 'temp'
    console.log(filename)
    // 创建文件目录
    // fs.mkdirSync(`./resources/${renderId}`)
    // 将文件保存到目录中
    let oldPath = `resources/temp-furniture`
    let newPath = `resources/${renderId}`
    try {
      await commonUpload(renderId, oldPath, newPath, filename)
      res.json({
        code: 1,
        data: "文件上传成功",
        filename
      });
    } catch (error) {
      res.json({
        code: 2,
        data: "文件上传失败",
        filename
      });
    }
  }
);

/**
 * actors.json上传接口
 */
router.post(
  "/uploadFile/actors",
  multer({ dest: `resources/temp-actors` }).array("file", 100),
  async (req, res) => {
    const renderId = req.body.renderId || ''
    const filename = req.body.filename || 'temp'
    console.log(filename)
    // 将文件保存到目录中
    let oldPath = `resources/temp-actors`
    let newPath = `resources/${renderId}`
    try {
      await commonUpload(renderId, oldPath, newPath, filename)
      res.json({
        code: 1,
        data: "文件上传成功",
        filename
      });
    } catch (error) {
      res.json({
        code: 2,
        data: "文件上传失败",
        filename
      });
    }
  }
);

/**
 * 相机上传接口
 */
router.post(
  "/uploadFile/frame",
  multer({ dest: `resources/temp-frame` }).array("file", 100),
  //upload.single('file'),
  async (req, res) => {
    const renderId = req.body.renderId || ''
    const filename = req.body.filename || 'temp'
    console.log(filename)
    // 将文件保存到目录中
    let oldPath = `resources/temp-frame`
    let newPath = `resources/${renderId}`
    try {
      await commonUpload(renderId, oldPath, newPath, filename)
      res.json({
        code: 1,
        data: "文件上传成功",
        filename
      });
    } catch (error) {
      res.json({
        code: 2,
        data: "文件上传失败",
        filename
      });
    }
  }
);
/**
 * 灯光上传接口
 */
router.post(
  "/uploadFile/light",
  multer({ dest: `resources/temp-light` }).array("file", 100),
  //upload.single('file'),
  async (req, res) => {
    const renderId = req.body.renderId || ''
    const filename = req.body.filename || 'temp'
    console.log(renderId)
    let oldPath = `resources/temp-light`
    let newPath = `resources/${renderId}`
    // 将文件保存到目录中
    try {
      await commonUpload(renderId, oldPath, newPath, filename)
      res.json({
        code: 200,
        data: "文件上传成功",
        filename
      });
    } catch (error) {
      console.log(error)
      res.json({
        code: 400,
        data: "文件上传失败",
        filename
      });
    }
  }
);

/**
 * 公共上传方法
 * 
 */
const commonUpload = async (renderId, oldPath, newPath, filename) => {
  try {
    // 存在renderId的文件夹
    if (fs.existsSync(newPath)) {
      const fileType = /\.[^\.]+$/.exec(filename)
      if (fileType[0] === '.json') {
        copyFile(oldPath, newPath + '/json', filename, renderId)
      } else {
        copyFile(oldPath, newPath + '/asset', filename, renderId)
      }
    } else {
      // 创建文件夹
      fs.mkdirSync(`./resources/${renderId}`)
      fs.mkdirSync(`./resources/${renderId}/asset`)
      fs.mkdirSync(`./resources/${renderId}/json`)
      const fileType = /\.[^\.]+$/.exec(filename)
      if (fileType[0] === '.json') {
        copyFile(oldPath, newPath + '/json', filename, renderId)
      } else {
        copyFile(oldPath, newPath + '/asset', filename, renderId)
      }
    }
    return Promise.resolve()
  }
  catch (e) {
    return Promise.reject(e)
  }
}

/**
 * 文件复制
 * @param {*} sourcePath 
 * @param {*} targetPath 
 * @param {*} filename 
 */
const copyFile = (sourcePath, targetPath, filename, renderId) => {
  const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true })
  try {
    sourceFile.forEach(file => {
      const newSourcePath = path.resolve(sourcePath, file.name)
      const newTargetPath = path.resolve(targetPath, file.name)
      const renamePath = newTargetPath.replace(file.name, filename)
      // 复制文件
      fs.copyFileSync(newSourcePath, newTargetPath)
      // 重命名文件
      fs.renameSync(newTargetPath, renamePath)
      // 删除文件
      fs.unlinkSync(newSourcePath)
      // 重写actors
      if (filename === 'actors.json') {
        let res = mappingFurniture(renamePath, renderId)
        fs.writeFileSync(renamePath, res, 'utf-8')
      }
    })
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}
/**
 * 高模组装映射
 * @param {*} actorsPath 
 * @returns 
 */
const mappingFurniture = function (actorsPath, renderId) {
  const highModelHand = 'RightZ'
  const file = fs.readFileSync(actorsPath, 'utf-8')
  const fileObject = JSON.parse(file)
  let exitErrorModel = false
  const ActorsListNode = fileObject.filter(item => item.Actors)
  const ActorsList = ActorsListNode[0]
  console.log(ActorsList)
  ActorsList.Actors.forEach((iv) => {
    for (let i = 0; i < config.length; i++) {
      if (iv.lowModel === config[i].id) {
        iv.Name = config[i].highModel ? config[i].highModel : iv.lowModel
        iv.Hand = highModelHand
      }
    }
    // check model is error model
    if (iv.isErrorModel) {
      exitErrorModel = true
      const originModel = iv.Name
      iv.originModel = originModel
      iv.Name = DefaultGLTFModelName
    }
  })
  // ActorsList.Actors.forEach((item) => {
  //   // mapping high model
  //   item.forEach((iv) => {
  //     for (let i = 0; i < config.length; i++) {
  //       if (iv.lowModel === config[i].id) {
  //         iv.Name = config[i].highModel ? config[i].highModel : iv.lowModel
  //         iv.Hand = highModelHand
  //       }
  //     }
  //     // check model is error model
  //     if (iv.isErrorModel) {
  //       exitErrorModel = true
  //       const originModel = iv.Name
  //       iv.originModel = originModel
  //       iv.Name = DefaultGLTFModelName
  //     }
  //   })
  // })

  // exit error model， create default-model gltf to assets
  if (exitErrorModel) createNormalModel2Asset(renderId)
  return JSON.stringify(fileObject, null, 2)
}

const createNormalModel2Asset = function (renderId) {
  const readPath = './public/default-model/normalModel.gltf'
  const defaultModelGLTF = fs.readFileSync(readPath, 'utf-8')
  fs.writeFileSync(`./resources/${renderId}/asset/${DefaultGLTFModelName}`, defaultModelGLTF, 'utf-8')
}

module.exports = router;
