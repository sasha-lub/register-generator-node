import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

import {
  selectTransactionFieldsAmount,
} from '../../../store';

export const TransactionFieldComponent = (props) => {
  const transactionFieldsArray = Array.from(
    { length: props.transactionFieldsAmount },
    (value, index) => index + 1,
  );

  return transactionFieldsArray.map((index) => (
    <div className="section-field" key={`trans-${index}`}>
      <Field
        className="form__input creating"
        name={`transaction${index}.type`}
        component="input"
        type="text"
        placeholder="type"
      />
      <Field
        className="form__input creating"
        name={`transaction${index}.typeSize`}
        component="input"
        type="text"
        placeholder="size"
      />
      <Field
        className="form__input creating"
        name={`transaction${index}.name`}
        component="input"
        type="text"
        placeholder="type"
      />
      <Field
        className="form__input creating"
        name={`transaction${index}.nameSize`}
        component="input"
        type="text"
        placeholder="size"
      />
    </div>
  ));
};

const mapStateToProps = (state) => ({
  transactionFieldsAmount: selectTransactionFieldsAmount(state),
});

export const TransactionField = connect(mapStateToProps)(TransactionFieldComponent);
