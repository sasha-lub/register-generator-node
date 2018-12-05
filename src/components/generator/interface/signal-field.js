import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

import {
  selectSignalFieldsAmount,
} from '../../../store';

export const SignalFieldComponent = (props) => {
  const signalFieldsArray = Array.from(
    { length: props.signalFieldsAmount },
    (value, index) => index + 1,
  );

  return signalFieldsArray.map((index) => (
    <div className="section-field" key={`signal-${index}`}>
      <Field
        className="form__input creating"
        name={`signal${index}.type`}
        component="input"
        type="text"
        placeholder="type"
      />

      <Field
        className="form__input creating"
        name={`signal${index}.typeSize`}
        component="input"
        type="text"
        placeholder="size"
      />

      <Field
        className="form__input creating"
        name={`signal${index}.name`}
        component="input"
        type="text"
        placeholder="name"
      />
      
      <Field
        className="form__input creating"
        name={`signal${index}.nameSize`}
        component="input"
        type="text"
        placeholder="size"
      />
    </div>
  ));
};

const mapStateToProps = (state) => ({
  signalFieldsAmount: selectSignalFieldsAmount(state),
});

export const SignalField = connect(mapStateToProps)(SignalFieldComponent);
