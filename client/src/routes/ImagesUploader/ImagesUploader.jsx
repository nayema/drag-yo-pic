import React from 'react'
import Dropzone from 'react-dropzone'
import upload from 'superagent'
import { withStyles } from 'material-ui/styles'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.contentFrame
  }
})

class ImagesUploader extends React.Component {
  onDrop (files) {
    upload.post('/upload')
      .attach('theseNamesMustMatch', files[0])
      .end((err, res) => {
        if (err) console.log(err)
        alert('Files(s) Uploaded!')
      })
  }

  render () {
    return (
      <Dropzone style={{}} disableClick={true} onDrop={this.onDrop}>
        <div>Upload your pictures here</div>
      </Dropzone>
    )
  }
}

export default withStyles(styles)(ImagesUploader)
