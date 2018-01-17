import React from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
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
    const photos = new FormData()
    files.forEach(file => photos.append('photos', file))
    request.post('/upload')
      .send(photos)
      .end((err, res) => {
        if (err) console.log(err)
        this.setState(prevState => {
          const oldPhotos = prevState.photos
          const newPhotos = res.body.files.map(file => `uploads/${file.filename}`)
          return {
            photos: oldPhotos.concat(newPhotos)
          }
        })
      })
  }

  render () {
    return (
      <Dropzone style={{}} disableClick={true} onDrop={this.onDrop} accept={'image/*'}>
        <div>Upload your pictures here</div>
        {this.state.photos.map((photo) => (
          <img key={photo} src={photo} width={200}/>
        ))}
      </Dropzone>
    )
  }
}

export default withStyles(styles)(ImagesUploader)
