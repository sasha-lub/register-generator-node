import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Link } from 'react-router-dom';

import './env.css';

export const Environment = () => {
  return (
    <Fragment>
      <fieldset className="form__section">
        <legend className="section-field__name">Environment</legend>

        <label className="form__title" htmlFor="env.name">
          Name:
          <Field
            className="form__input"
            name="env.name"
            component="input"
            type="text"
          />
        </label>

        <label className="form__title" htmlFor="env.baseType">
          Base type:
          <Field
            className="form__input"
            name="env.baseType"
            component="input"
            type="text"
            placeholder="uvm_env"
          />
        </label>

        <label className="form__title container" htmlFor="env.testbench">
          Include TestBench
          <Field
            className="form__input"
            name="env.testbench"
            component="input"
            type="checkbox"
            id="env.testbench"
          />
          <span className="checkmark"></span>
        </label>

        <label className="form__title" htmlFor="env.config">
          Config:
          <Field
            className="form__input textarea"
            name="env.config"
            component="textarea"
            type="text"
          />
        </label>
      </fieldset>

      <Link to="/generator/agent">
        <button className="initial-btn btn">
          Next
        </button>
      </Link>
    </Fragment>
  );
};
