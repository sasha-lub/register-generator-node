import { reset } from 'redux-form';

export const resetForm = () => (dispatch) => {
  dispatch(reset('generatorData'));
};
