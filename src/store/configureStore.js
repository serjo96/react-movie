import rootReducer from '../Reducers/mainReducer.js';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

export default function configureStore() {
    const middlewares = [
        applyMiddleware(thunk)
    ];
    const createStoreWithMiddleware = compose(...middlewares)(createStore);
    const store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return store;
}
