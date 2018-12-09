import React from 'react';
import { Field, FieldArray } from 'redux-form';
import { Block } from '../block';
import { Register } from '../register';

import 'react-toastify/dist/ReactToastify.css';
import './reg-model.css';
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

export const RegisterModel = (props) => {
    const handleGenerate = () => {
        toast('🦄 Your file is successfully generated!');
    };

  return (
      <section>
          <div className="btn-wrapper">
              <FieldArray
                  name="reg-model.registers"
                  component={Register}
              />
              <FieldArray
                  name="reg-model.blocks"
                  component={Block}
              />

              <p className="paragraph"/>
              <Field className="form__input creating"
                     name={'reg-model.name'}
                     component="input"
                     type="text"
                     placeholder="Register model name"/>
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
      </section>
  );
};