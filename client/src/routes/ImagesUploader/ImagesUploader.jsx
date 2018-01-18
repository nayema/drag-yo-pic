import React from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import Gallery from 'react-photo-gallery'
import Button from 'material-ui/Button'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import { withStyles } from 'material-ui/styles'

import Photo from './Photo'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.contentFrame
  },
  button: {
    margin: theme.spacing.unit
  }
})

const SortablePhoto = SortableElement(Photo)
const SortableGallery = SortableContainer(({ photos }) => (
  <Gallery photos={photos} ImageComponent={SortablePhoto}/>
))

class ImagesUploader extends React.Component {
  constructor (props) {
    super(props)
    this.classes = props.classes
    this.state = { photos: [] }

    this.onDrop = this.onDrop.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
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
          const newPhotos = res.body.files.map(file => ({
            src: `uploads/${file.filename}`,
            width: 1,
            height: 1
          }))
          return {
            photos: oldPhotos.concat(newPhotos)
          }
        })
      })
  }

  onClick () {
    const orderedFileNames = this.state.photos.map(img => img.src)
    request.post('/reorder')
      .send(orderedFileNames)
      .end((err, res) => {
      })
  }

  onSortEnd ({ oldIndex, newIndex }) {
    this.setState({
      photos: arrayMove(this.state.photos, oldIndex, newIndex)
    })
  }

  render () {
    return (
      <Dropzone style={{}} disableClick={true} onDrop={this.onDrop} accept={'image/*'}>
        <Button raised color="accent" className={this.classes.button} onClick={this.onClick}>
          Reorder
        </Button>
        <div>Upload your pictures here</div>
        <SortableGallery axis={'xy'} photos={this.state.photos} onSortEnd={this.onSortEnd}/>
      </Dropzone>
    )
  }
}

export default withStyles(styles)(ImagesUploader)
