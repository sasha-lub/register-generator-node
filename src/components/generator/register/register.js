import React, { Fragment } from 'react';
import { Field, FieldArray } from 'redux-form';

import { RegisterField } from './register-field';

import 'react-toastify/dist/ReactToastify.css';
import './register.css';

export const Register = ({fields}) => (

<div>
    {fields.map((register, index) => (
    <Fragment key={`register-${index}`} >
      <fieldset className="form__section">
        <legend className="section-field__name">
          Register {index+1}
          <button
            className="field-btn"
            onClick={() => fields.remove(index)}
          >
            <i className="far fa-times-circle"/>
          </button>
        </legend>
          <div className="section-field">
        <Field className="form__input"
               name={`${register}.name`}
               component="input"
               type="text"
               placeholder="name"/>
        <Field className="form__input"
               name={`${register}.size`}
               component="input"
               type="int"
               placeholder="size" />
        <Field className="form__input"
               name={`${register}.coverageMode`}
               component="select">
            <option value="UVM_NO_COVERAGE">UVM_NO_COVERAGE</option>
            <option value="UVM_CVR_REG_BITS">UVM_CVR_REG_BITS</option>
            <option value="UVM_CVR_ADDR_MAP">UVM_CVR_ADDR_MAP</option>
            <option value="UVM_CVR_FIELD_VALS">UVM_CVR_FIELD_VALS</option>
            <option value="UVM_CVR_ALL">UVM_CVR_ALL</option>
        </Field>
          </div>
        <FieldArray
          name={`${register}.fields`}
          component={RegisterField}
        />

      </fieldset>


    </Fragment>
    ))}
        <button
            className="btn initial-btn"
            onClick={() => fields.push({})}
        >
            Add register
        </button>

</div>
);