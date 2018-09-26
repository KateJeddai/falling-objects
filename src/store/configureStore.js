import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import tracksReducer from '../reducers/tracksReducer';
import artistReducer from '../reducers/artistReducer';
import filterReducer from '../reducers/filterReducer';
import scrollerReducer from '../reducers/scrollerReducer';
import { saveArtist } from '../reducers/artistReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
                          
// create store
export default () => {
    const store = createStore(
        combineReducers({
            tracksReducer,
            artistReducer,
            filterReducer,
            scrollerReducer,
            saveArtist
        }),
        composeEnhancers(applyMiddleware(thunk))
       // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
};