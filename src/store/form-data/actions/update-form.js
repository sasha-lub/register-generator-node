import { reset } from 'redux-form';

import {
  loadFormAction,
} from './update-form-actions';

export const resetForm = () => (dispatch) => {
  dispatch(reset('generatorData'));
};

export const loadForm = (data) => (dispatch) => {
  console.log(">>>>>>>>>>>>>>>>>>load form meth");
  console.log(data);
  dispatch(loadFormAction(data));
};
