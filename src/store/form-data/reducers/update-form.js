import {
  LOAD_FORM
} from '../actions';

const updateFormCollection = new Map([
  [LOAD_FORM, (state, action) => ({
    ...state,
    data: action.data,
  })],
]);

export const formData = (state = {}, action) => {
  console.log("form data reducer");
  if (!updateFormCollection.has(action.type)) {
    return state;
  }

  return updateFormCollection.get(action.type)(state, action);
};
