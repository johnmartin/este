import createLoggerMiddleware from 'redux-logger'
import shortid from 'shortid'

import configureStorage from './configureStorage'
import validate from './validate'

// Like redux-thunk but with dependency injection.
const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({ ...deps, dispatch, getState })
    : action
  )

// Like redux-promise-middleware but without the noise.
const promiseMiddleware = ({ dispatch }) => next => action => {
  const { type, payload: promise } = action
  const isPromise = promise && typeof promise.then === 'function'
  if (!isPromise) return next(action)
  const createAction = (suffix, payload) => ({
    type: `${type}_${suffix}`, meta: { action }, payload
  })
  next(createAction('START'))
  const onFulfilled = value => {
    dispatch(createAction('SUCCESS', value))
    return value
  }
  const onRejected = error => {
    dispatch(createAction('ERROR', error))
    throw error
  }
  return promise.then(onFulfilled, onRejected)
}

export default function configureMiddleware (initialState, platformDeps, platformMiddleware) {

  const {
    STORAGE_SAVE,
    storageEngine,
    storageMiddleware
  } = configureStorage(initialState, platformDeps.createStorageEngine)

  const middleware = [
    injectMiddleware({
      ...platformDeps,
      getUid: () => shortid.generate(),
      now: () => Date.now(),
      storageEngine,
      validate
    }),
    promiseMiddleware,
    ...platformMiddleware
  ]

  if (storageMiddleware) {
    middleware.push(storageMiddleware)
  }

  const enableLogger = process.env.NODE_ENV !== 'production'

  // Logger must be the last middleware in chain.
  if (enableLogger) {
    const ignoredActions = [STORAGE_SAVE]
    const logger = createLoggerMiddleware({
      collapsed: true,
      predicate: (getState, action) => ignoredActions.indexOf(action.type) === -1,
      // Convert immutable to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    })
    middleware.push(logger)
  }

  return middleware
}
