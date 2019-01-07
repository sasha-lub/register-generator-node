const LOAD = 'redux-form-examples/account/LOAD';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD: {
      console.log("$$$$$$$ ACCOUNT $$$$$$$$$");
      return {
        selectedForm : action.data,
      };}
    default:
      return state;
  }
};

/**
 * Simulates data loaded into this reducer from somewhere
 */
export const load = data => ({ type: LOAD, data });

export default reducer;
