const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { DateTime } = require('luxon')
const { ExifTool } = require('exiftool-vendored')

const upload = multer({ dest: 'public/uploads' })

router.post('/upload', upload.array('photos'), function (req, res, next) {
  res.send({ files: req.files })
})

router.post('/reorder', async function (req, res) {
  const exiftool = new ExifTool()
  const startOrderTime = req.body.startOrderTime
  let setStartOrderTime = DateTime.fromISO(startOrderTime)
  const orderedFileNames = req.body.orderedFileNames
  for (let i = 0; i < orderedFileNames.length; i++) {
    await exiftool.write(
      'public/' + orderedFileNames[i],
      { AllDates: setStartOrderTime.toString() },
      ['-overwrite_original_in_place']
    )
    setStartOrderTime = setStartOrderTime.plus({ minutes: 1 })
  }
  await exiftool.end()
  res.end()
})

router.post('/clear-all', function (req, res) {
  const directory = 'public/uploads'
  const files = fs.readdirSync(directory)
  for (const file of files) {
    fs.unlinkSync(path.join(directory, file))
  }
  res.end()
})

module.exports = router
