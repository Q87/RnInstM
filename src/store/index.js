import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {postReducer} from './reducers/post';
import {libraryReducer} from './reducers/library';

const rootReducer = combineReducers({
  post: postReducer,
  library: libraryReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
