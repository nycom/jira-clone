import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
const initialState = {};

const composeEnhancer =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            shouldHotReload: false
        })) ||
    compose;
const store = createStore(
    reducers,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
