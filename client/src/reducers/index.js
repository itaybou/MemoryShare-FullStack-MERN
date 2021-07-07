import auth from './auth';
import { combineReducers } from 'redux';
import posts from './posts';

export default combineReducers({ posts, auth });
