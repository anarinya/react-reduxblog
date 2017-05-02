import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

// lodash alternative
// _.mapKeys(action.payload.data), 'id')
const mapArrToObject = (arr, key = 'id') => {
  let newObject = {};

  for (let i = 0, len = arr.length; i < len; i++) {
    newObject[arr[i][key]] = arr[i];
  }
  return newObject;
};

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return mapArrToObject(action.payload.data);
    case FETCH_POST:
      // es5
      // const post = action.payload.data;
      // const newState = { ...state };
      // newState[post.id] = post;
      // return newState;
      // es6
      return { ...state, [action.payload.data.id]: action.payload.data };
    case DELETE_POST:
      // lodash: look at state object, if it has specified key, drop it and return new obj
      // return _.omit(state, action.payload);
      const obj = state;
      delete obj[action.payload];
      return obj;
    default:
      return state;
  }
};