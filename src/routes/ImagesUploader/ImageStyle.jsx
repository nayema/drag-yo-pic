import React from 'react'

const imgStyle = {
  display: 'block'
}

const cont = {
  backgroundColor: '#858585',
  cursor: 'pointer',
  overflow: 'hidden',
  float: 'left',
  position: 'relative'
}

export default ({ photo, margin }) => (
  <div style={{ margin, width: photo.width, ...cont }}>
    <img style={{ ...imgStyle }} {...photo} />
  </div>
)
