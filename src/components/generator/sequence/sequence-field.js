import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

import {
  selectSequenceFieldsAmount,
} from '../../../store';

export const SequenceFieldComponent = (props) => {
  const sequenceFieldsArray = Array.from(
    { length: props.sequenceFieldsAmount },
    (value, index) => index + 1,
  );

  return sequenceFieldsArray.map((index) => (
    <div className="section-field" key={`sequence-${index}`}>
      <Field
        className="form__input creating"
        name={`sequence${index}.type`}
        component="input"
        type="text"
        placeholder="type"
      />

      <Field
        className="form__input creating"
        name={`sequence${index}.typeSize`}
        component="input"
        type="text"
        placeholder="size"
      />

      <Field
        className="form__input creating"
        name={`sequence${index}.name`}
        component="input"
        type="text"
        placeholder="name"
      />
      
      <Field
        className="form__input creating"
        name={`sequence${index}.nameSize`}
        component="input"
        type="text"
        placeholder="size"
      />
    </div>
  ));
};

const mapStateToProps = (state) => ({
  sequenceFieldsAmount: selectSequenceFieldsAmount(state),
});

export const SequenceField = connect(mapStateToProps)(SequenceFieldComponent);
