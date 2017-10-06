/**
 * Created by tai on 3/21/17.
 */
import { combineReducers } from 'redux';
import profileReducer, { profileActionCreators } from './profile';

export {
  profileActionCreators
};

export default combineReducers({
  profileReducer
});

