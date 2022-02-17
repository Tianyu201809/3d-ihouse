const { spawn } = require('child_process');
const express = require("express");
const path = require('path');
const router = express.Router();

router.post("/call", async (req, res) => {
  const renderId = req.body.renderId || 'KbbEoG2Zfj8_qingshe_20'
  try {
    const rendererPath = path.resolve(__dirname, '..', 'trex220115', 'TrexCLI.exe')
    const resourceDirPath = path.resolve(__dirname, '..', 'resources', renderId)
    let message = await execCommand(rendererPath, [resourceDirPath])
    res.send({
      code: 1,
      message: 'success',
      renderId,
      message
    })
  } catch (error) {
    res.send({
      code: 2,
      message: 'error',
      error,
      renderId
    })
  }
});



function execCommand(command, option) {
  return new Promise((resolve, reject) => {
    const ls = spawn(command, option)
    
    const result = []
    ls.stdout.on('data', (data) => {
      result.push(messageParse(data.toString()))
    })
    ls.stderr.on('data', (data) => {
      // console.log('error:', data.toString())
    })
    ls.on('close', (code, singnal) => {
      if (code === 3) {
        reject(result)
        return
      }
      resolve(result)
    })
  })
}

const MESSAGE_REG = /^#(\d{3})(.+)/

/**
 * success message parser
 * @param {*} message 
 * @returns 
 */
function messageParse(message) {
  const [, type, dataRaw] = message.match(MESSAGE_REG);
  
  return {
    type,
    message: JSON.parse(dataRaw)
  }
}

/**
 * error message 
 */
function errorMessageHandle(errorMessage) {

}




module.exports = router