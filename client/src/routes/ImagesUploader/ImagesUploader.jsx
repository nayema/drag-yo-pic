import React from 'react'
import request from 'superagent'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Gallery from 'react-photo-gallery'
import Dropzone from 'react-dropzone'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import { withStyles } from 'material-ui/styles'

import Photo from './Photo'

const styles = (theme) => ({
  dropzone: {
    flexGrow: 1,
    justifyContent: 'space-around',
    overflowX: 'auto',
    backgroundColor: theme.palette.background.contentFrame,
    height: 500

  },
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
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
    this.onReorder = this.onReorder.bind(this)
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

  onReorder () {
    const orderedFileNames = this.state.photos.map(img => img.src)
    const reorderedPhotos = {
      startOrderTime: '',
      orderedFileNames: orderedFileNames
    }
    request.post('/reorder')
      .send(reorderedPhotos)
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
      <div>
        <form noValidate>
          <TextField
            id="datetime-local"
            label="Set Start Time"
            type="datetime-local"
            defaultValue="2000-01-30T00:30"
            className={this.classes.textField}
            InputLabelProps={{
              shrink: true
            }}
          />
        </form>
        <Button raised color="accent" className={this.classes.button} onClick={this.onReorder}>
          Reorder
        </Button>
        <Dropzone className={this.classes.dropzone} style={{}} disableClick={true} onDrop={this.onDrop}
          accept={'image/*'}>
          <div>Upload your pictures here</div>
          <SortableGallery axis={'xy'} photos={this.state.photos} onSortEnd={this.onSortEnd}/>
        </Dropzone>
      </div>
    )
  }
}

export default withStyles(styles)(ImagesUploader)
