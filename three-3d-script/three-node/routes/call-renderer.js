const { spawn } = require('child_process');
const express = require("express");
const path = require('path');
const router = express.Router();

router.post("/call", async (req, res) => {
  const renderId = req.body.renderId

  try {
    const rendererPath = path.resolve(__dirname, '..', 'trex220221', 'TrexCLI.exe')

    const resourceDirPath = path.resolve(__dirname, '..', 'resources', renderId)
    let message = await execCommand(rendererPath, [resourceDirPath])
    const isProcessError = checkMessageProcess(message)

    if (isProcessError) {
      res.send({
        code: 2,
        message: isProcessError,
        error,
        renderId
      })
      return
    }
    res.send({
      code: 1,
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


/**
 * exec command function
 * @param { *String } command 
 * @param { *Array<string> } option 
 * @returns { Promise }
 */
function execCommand(command, option) {
  return new Promise((resolve, reject) => {
    const ls = spawn(command, option)

    const successResult = []
    const errorResult = []
    ls.stdout.on('data', (data) => {
      console.log(data.toString())
      successResult.push(messageParse(data.toString()))
    })
    ls.stderr.on('data', (errorMsg) => {
      console.log(errorMsg.toString())
      errorResult.push(handleErrorMessage(errorMsg.toString()))
    })
    ls.on('close', code => {
      if (code === 3) {
        reject(errorResult)
        return
      }
      resolve(successResult)
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

function handleErrorMessage(message) {
  return {
    error: message
  }
}

function checkMessageProcess(result) {
  let message = null

  result.forEach(element => {
    if (element.type === '004') {
      message = element.message.Failed
    }
  })

  if (message === null) {
    message = 'error'
  }
  return message
}

// async function redirectTarget() {
//   return new Promise((resolve) => {
//     const rendererPath = path.resolve(__dirname, '..', 'trex220221')
//     exec(`cd ${rendererPath}`, (err) => {
//       console.log(err)
//       console.log(1)
//       resolve()
//       return
//     })
//   })
// }

module.exports = router