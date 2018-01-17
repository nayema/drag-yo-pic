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
  constructor (props) {
    super(props)
    this.state = { photos: [] }

    this.onDrop = this.onDrop.bind(this)
  }

  onDrop (files) {
    upload.post('/upload')
      .attach('theseNamesMustMatch', files[0])
      .end((err, res) => {
        if (err) console.log(err)
        this.setState(prevState => {
          const photos = prevState.photos
          return {
            photos: photos.concat(`uploads/${res.body.file.filename}`)
          }
        })
      })
  }

  render () {
    return (
      <Dropzone style={{}} disableClick={true} onDrop={this.onDrop} accept={'image/*'}>
        <div>Upload your pictures here</div>
        {this.state.photos.map((photo) => (
          <img key={photo} src={`http://localhost:3000/${photo}`} width={200}/>
        ))}
      </Dropzone>
    )
  }
}

export default withStyles(styles)(ImagesUploader)
