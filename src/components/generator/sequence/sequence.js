import React, { Fragment } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { SequenceField } from './sequence-field';

import 'react-toastify/dist/ReactToastify.css';

export const Sequence = (props) => {
  const handleClick = () => {
    toast('🦄 Sequence is successfully created!');
  };

  return (
    <Fragment>
      <fieldset className="form__section">
        <legend className="section-field__name">
        Sequence
        </legend>

        <FieldArray
          name="sequence"
          component={SequenceField}
        />

        <button
          className="btn"
          onClick={props.updateSequenceFieldsAmount}
        >
          add field
        </button>

        <label className="code-textarea" htmlFor="sequenceCode">
          <p>Code:</p>
          <Field
            className="form__input textarea"
            name="sequenceCode"
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
