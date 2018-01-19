const express = require('express')
const router = express.Router()
const multer = require('multer')
const { DateTime } = require('luxon')
const { ExifTool } = require('exiftool-vendored')

const upload = multer({ dest: 'public/uploads' })

router.post('/upload', upload.array('photos'), function (req, res, next) {
  res.send({ files: req.files })
})

router.post('/reorder', async function (req, res) {
  const exiftool = new ExifTool()
  let setStartOrderTime = DateTime.fromISO('2018-01-01T00:00:00')
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

module.exports = router
