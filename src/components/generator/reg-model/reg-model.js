import React from 'react';
import { Field, FieldArray } from 'redux-form';
import { Block } from '../block';
import { Register } from '../register';
import validate from './validate';

import 'react-toastify/dist/ReactToastify.css';
import './reg-model.css';
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

export const RegisterModelComponent = (props) => {
    const handleGenerate = () => {
        toast('🦄 Your file is successfully generated!');
    };

  return (
    <div className="btn-wrapper">
      <div className="row">
      <label>Give me the name: </label>
      <Field className="form__input creating"
             name={'regModel.name'}
             component="input"
             type="text"
             placeholder="Register model name"/>
      </div>
      <div className="tabs-wrapper">
        <input id="tab1" type="radio" name="tabs" className="tab-header" checked/>
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
                        onClick={handleGenerate}
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
