import {combineReducers} from 'redux';
import { reducer as form } from 'redux-form';
import {formData} from './form-data';

const rootReducer = combineReducers({
  formData,
  form,
});

export default rootReducer;
