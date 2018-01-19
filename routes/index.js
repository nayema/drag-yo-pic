const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { DateTime } = require('luxon')
const { ExifTool } = require('exiftool-vendored')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/upload', upload.array('photos'), function (req, res) {
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

router.get('/save', function (req, res) {
  res.zip({
    files: [
      { path: 'public/uploads', name: 'photos' }
    ],
    filename: 'photos.zip'
  })
})

module.exports = router
