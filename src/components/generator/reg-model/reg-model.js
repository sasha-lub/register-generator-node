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
      <section>
          <div className="btn-wrapper">
              <FieldArray
                  name="regModel.registers"
                  component={Register}
              />
              <FieldArray
                  name="regModel.blocks"
                  component={Block}
              />

              <p className="paragraph"/>
              <Field className="form__input creating"
                     name={'regModel.name'}
                     component="input"
                     type="text"
                     placeholder="Register model name"/>
              <Link to="/generator/done">
                  <button
                        type="submit"
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
      </section>
  );
};

export const RegisterModel = connect(
  validate
)(RegisterModelComponent);
