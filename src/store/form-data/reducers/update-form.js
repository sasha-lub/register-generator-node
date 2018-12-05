import {
  UPDATE_AGENT_AMOUNT,
  RESET_AGENT_AMOUNT,
  UPDATE_TRANSACTION_FIELDS_AMOUNT,
  RESET_TRANSACTION_FIELDS_AMOUNT,
  UPDATE_SIGNAL_FIELDS_AMOUNT,
  RESET_SIGNAL_FIELDS_AMOUNT,
  UPDATE_SEQUENCE_FIELDS_AMOUNT,
  RESET_SEQUENCE_FIELDS_AMOUNT,
} from '../actions';

const initialState = {
  agentAmount: 1,
  transactionFieldsAmount: 1,
  signalFieldsAmount: 1,
  sequenceFieldsAmount: 1,
};

const updateFormCollection = new Map([
  [UPDATE_AGENT_AMOUNT, (state) => ({
    ...state,
    agentAmount: state.agentAmount + 1,
  })],
  [RESET_AGENT_AMOUNT, (state) => ({
    ...state,
    agentAmount: initialState.agentAmount,
  })],
  [UPDATE_TRANSACTION_FIELDS_AMOUNT, (state) => ({
    ...state,
    transactionFieldsAmount: state.transactionFieldsAmount + 1,
  })],
  [RESET_TRANSACTION_FIELDS_AMOUNT, (state) => ({
    ...state,
    transactionFieldsAmount: initialState.transactionFieldsAmount,
  })],
  [UPDATE_SIGNAL_FIELDS_AMOUNT, (state) => ({
    ...state,
    signalFieldsAmount: state.signalFieldsAmount + 1,
  })],
  [RESET_SIGNAL_FIELDS_AMOUNT, (state) => ({
    ...state,
    signalFieldsAmount: initialState.signalFieldsAmount,
  })],
  [UPDATE_SEQUENCE_FIELDS_AMOUNT, (state) => ({
    ...state,
    sequenceFieldsAmount: state.sequenceFieldsAmount + 1,
  })],
  [RESET_SEQUENCE_FIELDS_AMOUNT, (state) => ({
    ...state,
    sequenceFieldsAmount: initialState.sequenceFieldsAmount,
  })],
]);

export const formData = (state = initialState, action) => {
  if (!updateFormCollection.has(action.type)) {
    return state;
  }

  return updateFormCollection.get(action.type)(state, action);
};
