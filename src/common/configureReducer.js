import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import config from './config/reducer'
import intl from './intl/reducer'
import { updateStateOnStorageLoad } from './configureStorage'

export default function configureReducer (initialState, platformReducers) {
  let reducer = combineReducers({
    ...platformReducers,
    config,
    intl,
    routing
  })

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = updateStateOnStorageLoad(reducer)

  return reducer
}
