import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {postReducer} from './reducers/post';
import {libraryReducer} from './reducers/library';
import {userReducer} from './reducers/user';

const rootReducer = combineReducers({
  post: postReducer,
  library: libraryReducer,
  user: userReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
