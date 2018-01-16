import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import * as images from './images-uploader'

export default combineReducers({
  routing: routerReducer
  // images: images.reducer
})
