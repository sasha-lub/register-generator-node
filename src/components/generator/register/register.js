import React, { Fragment } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { RegisterField } from './register-field';

import 'react-toastify/dist/ReactToastify.css';
import './register.css';

export const Register = (props) => {
  const handleClick = () => {
    toast('🦄 Register is successfully created!');
  };

  return (
    <Fragment>
      <fieldset className="form__section">
        <legend className="section-field__name">
          Register
        </legend>
        <Field className="form__input creating"
               name={'register.name'}
               component="input"
               type="text"
               placeholder="name"/>
        <Field className="form__input creating"
               name={'register.size'}
               component="input"
               type="int"
               placeholder="size" />
        <Field className="form__input"
               name={'register.coverageMode'}
               component="select">
            <option value="1">COVERAGE</option>
            <option value="0">NO COVERAGE</option>
        </Field>

        <FieldArray
          name="register.fields"
          component={RegisterField}
        />
          <button
              className="btn"
              onClick={props.updateRegisterFieldsAmount}
          >
              New field
          </button>
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
