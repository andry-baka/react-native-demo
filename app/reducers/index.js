/**
 * Created by tai on 3/21/17.
 */
import { combineReducers } from 'redux';
import profileReducer, { profileActionCreators } from './profile';
import notificationReducer, { notificationActionCreators } from './notifications';

export {
  profileActionCreators,
  notificationActionCreators
};

export default combineReducers({
  profileReducer,
  notificationReducer
});

