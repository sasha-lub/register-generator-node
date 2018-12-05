import React, { Fragment } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { SignalField } from './signal-field';

import 'react-toastify/dist/ReactToastify.css';

export const Interface = (props) => {
  const handleClick = () => {
    toast('🦄 Signal is successfully created!');
  };

  return (
    <Fragment>
      <fieldset className="form__section">
        <legend className="section-field__name">
          Interface
        </legend>

        <FieldArray
          name="Signal"
          component={SignalField}
        />

        <button
          className="btn"
          onClick={props.updateSignalFieldsAmount}
        >
          add field
        </button>

        <label className="code-textarea" htmlFor="signalCode">
          <p>Code:</p>
          <Field
            className="form__input textarea"
            name="signalCode"
            component="textarea"
            type="text"
          />
        </label>
      </fieldset>

      <Link to="/generator">
        <button 
          className="initial-btn btn" 
          onClick={handleClick}
        >
          Create
        </button>
      </Link>
    </Fragment>
  );
};
