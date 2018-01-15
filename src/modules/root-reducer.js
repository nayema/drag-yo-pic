import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import * as tasks from './task-list'

export default combineReducers({
  routing: routerReducer
  // taskList: tasks.reducer,
})
