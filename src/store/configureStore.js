import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers/mainReducer.js';

export default function configureStore () {
  const middlewares = [
    applyMiddleware(thunk)
  ];
  const createStoreWithMiddleware = compose(...middlewares)(createStore);
  return createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
