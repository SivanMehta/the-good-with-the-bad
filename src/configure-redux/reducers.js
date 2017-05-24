import * as types from './action-types'

const pathReducer = (path = '', action) => {
  // change this to use statement not pro and index
  switch (action.type) {
    case types.CHANGE_ARGUEMENT:
      return path
    default:
      return path
  }
}

import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  pathReducer,
})

export default rootReducer
