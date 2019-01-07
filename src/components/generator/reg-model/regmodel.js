import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {Block} from '../block';
import {Register} from '../register';

import './reg-model.css';
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

export const RegisterModelComponent = (props) => {
  return (
    <div className="btn-wrapper">
      <div className="row">
        <label>Give me the name: </label>
        <Field className="form__input creating"
               name={'regModel.name'}
               component="input"
               type="text"
               placeholder="model name"/>
        <Field className="form__input creating"
               name={'regModel.package'}
               component="input"
               type="text"
               placeholder="package"/>
      </div>
      <div className="section-field left">
        <label>Generate stubs: </label>
        <label className="check-box-label" htmlFor="generateAgent">
          Agent
        <Field name={'regModel.generateAgent'}
               id="generateAgent"
               component="input"
               type="checkbox"/>
        </label>
        <label className="check-box-label" htmlFor="generateEnv">
          Env
          <Field name={'regModel.generateEnv'}
                 id="generateEnv"
                 component="input"
                 type="checkbox"/>
        </label>
        <label className="check-box-label" htmlFor="generateDriver">
          Driver
          <Field name={'regModel.generateDriver'}
                 id="generateDriver"
                 component="input"
                 type="checkbox"/>
        </label>
        <label className="check-box-label" htmlFor="generateAdapter">
          Adapter
          <Field name={'regModel.generateAdapter'}
                 id="generateAdapter"
                 component="input"
                 type="checkbox"/>
        </label>
        <label className="check-box-label" htmlFor="generateTransaction">
        Transaction
        <Field name={'regModel.generateTransaction'}
               id="generateTransaction"
               component="input"
               type="checkbox"/>
      </label>
        <label className="check-box-label" htmlFor="generateSequence">
          Sequence
          <Field name={'regModel.generateSequence'}
                 id="generateSequence"
                 component="input"
                 type="checkbox"/>
        </label>
      </div>

      <div>
        <input id="tab1" type="radio" name="tabs" className="tab-header" defaultChecked/>
        <label htmlFor="tab1">Register</label>
        <input id="tab2" type="radio" name="tabs" className="tab-header"/>
        <label htmlFor="tab2">Block</label>

        <div className="tab-section" id="content1">
          <FieldArray
            name="regModel.registers"
            component={Register}
          />
        </div>
        <div className="tab-section" id="content2">
          <FieldArray
            name="regModel.blocks"
            component={Block}
          />
        </div>
      </div>
      <div className="row row-button">
        <Link to="/generator/done">
          <button
            className="initial-btn btn"
          >
            Generate model
          </button>
        </Link>
        <button
          className="initial-btn btn"
          onClick={props.resetForm}
        >
          Reset model
        </button>
      </div>
    </div>
  );
};

export const RegisterModel = connect(
  // validate
)(RegisterModelComponent);
