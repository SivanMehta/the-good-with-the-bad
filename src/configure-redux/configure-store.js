import rootReducer from './reducers'
import {createStore} from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    devToolsEnhancer()
  )
}
