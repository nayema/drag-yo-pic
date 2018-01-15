import React from 'react'
import { withStyles } from 'material-ui/styles'
import Gallery from 'react-photo-gallery'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

import ImageStyle from './ImageStyle'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.contentFrame
  }
})

const photos = [
  { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
  { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1 },
  { src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 3, height: 4 },
  { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 3, height: 4 },
  { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 3, height: 4 },
  { src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3 },
  { src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
  { src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 4, height: 3 },
  { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3 }
]
const SortablePhoto = SortableElement(ImageStyle)

const SortableGallery = SortableContainer(({ photos }) => {
  return <Gallery photos={photos} ImageComponent={SortablePhoto}/>
})

class ImagesUploader extends React.Component {
  constructor () {
    super()
    this.onSortEnd = this.onSortEnd.bind(this)
    this.state = {
      photos: photos
    }
  }

  onSortEnd ({ oldIndex, newIndex }) {
    this.setState({
      photos: arrayMove(this.state.photos, oldIndex, newIndex)
    })
  }

  render () {
    return (
      <SortableGallery axis={'xy'} photos={this.state.photos} onSortEnd={this.onSortEnd}/>
    )
  }
}

// const ImagesUploader = ({ classes }) => (
//   <div className={classes.root}>
//   </div>
// )

export default withStyles(styles)(ImagesUploader)
