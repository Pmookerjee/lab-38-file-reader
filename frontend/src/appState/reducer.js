import {combineReducers} from 'redux';

import costumeReducer from '../components/Costume/reducer';
import authReducer from '../components/Authentication/reducer';
import profileReducer from '../components/Profile/reducer';


export default combineReducers({
  costumes: costumeReducer,
  auth: authReducer,
  profile: profileReducer
})