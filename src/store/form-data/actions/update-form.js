import { reset } from 'redux-form';

import {
  updateAgentAmountAction,
  resetAgentAmountAction,
  updateTransactionFieldsAmountAction,
  resetTransactionFieldsAmountAction,
  updateSignalFieldsAmountAction,
  resetSignalFieldsAmountAction,
  updateRegisterFieldsAmountAction,
  resetRegisterFieldsAmountAction,
} from './update-form-action';

export const resetForm = () => (dispatch) => {
  dispatch(reset('generatorData'));
};

export const updateAgentAmount = () => (dispatch) => {
  dispatch(updateAgentAmountAction());
};

export const resetAgentAmount = () => (dispatch) => {
  dispatch(resetAgentAmountAction());
};

export const updateTransactionFieldsAmount = () => (dispatch) => {
  dispatch(updateTransactionFieldsAmountAction());
};

export const resetTransactionFieldsAmount = () => (dispatch) => {
  dispatch(resetTransactionFieldsAmountAction());
};

export const updateSignalFieldsAmount = () => (dispatch) => {
  dispatch(updateSignalFieldsAmountAction());
};

export const resetSignalFieldsAmount = () => (dispatch) => {
  dispatch(resetSignalFieldsAmountAction());
};

export const updateRegisterFieldsAmount = () => (dispatch) => {
  dispatch(updateRegisterFieldsAmountAction());
};

export const resetRegisterFieldsAmount = () => (dispatch) => {
  dispatch(resetRegisterFieldsAmountAction());
};
