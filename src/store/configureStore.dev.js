import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducers from '../reducers'

// Tip: replace the thunk and promise middleware with the redux-saga middleware

const configureStore = () => {
  const store = createStore(
    reducers,
    applyMiddleware(
      createLogger()
    )
  )

  return {
    ...store
    // Tip: you have to add something here from redux-saga
  }
}

export default configureStore
