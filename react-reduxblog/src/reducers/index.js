import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostReducer from './PostReducer';

const rootReducer = combineReducers({
  // state: (state = {}) => state
  // form absolutely must be assigned to formReducer to work
  posts: PostReducer,
  form: formReducer
});

export default rootReducer;