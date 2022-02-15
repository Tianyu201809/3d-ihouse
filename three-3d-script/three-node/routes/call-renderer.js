const { exec } = require('child_process');
const express = require("express");
const path = require('path');
const router = express.Router();

router.post("/call", (req, res) => {
  const renderId = req.body.renderId || ''
  const rendererPath = path.resolve(__dirname, '..', 'trex220115')
  const dirPath = path.resolve(__dirname, '..', 'resources', `${renderId}`)
  const cmd1 = `cd ${rendererPath}`
  const cmd2 = `trexcli.exe ${dirPath}`
  exec(cmd1, (err, stdout, stderr) => {
    if (err) {
      console.log(err)
    }
    console.log(stdout)
    console.log(stderr)
    console.log('================')
    exec(cmd2, (err, stdout2, stder2) => {
      console.log(err)
      console.log(stdout2)
      console.log(stder2)
      console.log(cmd2)
      res.send({
        code: 1,
        message: "success",
        sceneName: renderId
      })
    })
  })
});

module.exports = router