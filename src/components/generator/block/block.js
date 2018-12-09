import React, { Fragment } from 'react';
import { Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { BlockField } from './block-field';

import 'react-toastify/dist/ReactToastify.css';
import './block.css';

export const Block = ({fields}) => (
  <div>
      {fields.map((block, index) => (
    <Fragment>
      <fieldset className="form__section">
        <legend className="section-field__name">
          Block {index+1}
        </legend>
        <Field className="form__input creating"
               name={`${block}.name`}
               component="input"
               type="text"
               placeholder="name"/>
          <Field className="form__input"
                 name={`${block}.coverageMode`}
                 component="select">
              <option value="UVM_NO_COVERAGE">UVM_NO_COVERAGE</option>
              <option value="UVM_CVR_REG_BITS">UVM_CVR_REG_BITS</option>
              <option value="UVM_CVR_ADDR_MAP">UVM_CVR_ADDR_MAP</option>
              <option value="UVM_CVR_FIELD_VALS">UVM_CVR_FIELD_VALS</option>
              <option value="UVM_CVR_ALL">UVM_CVR_ALL</option>
          </Field>
          <FieldArray
            name={`${block}.fields`}
            component={BlockField}
          />
          <Field className="form__input creating"
                 name={`${block}.map.name`}
                 component="input"
                 type="text"
                 placeholder="name"/>
          <Field className="form__input creating"
                 name={`${block}.map.offset`}
                 component="input"
                 type="text"
                 placeholder="name"/>
          <Field className="form__input creating"
                 name={`${block}.map.size`}
                 component="input"
                 type="text"
                 placeholder="name"/>
          <Field className="form__input creating"
                 name={`${block}.map.endian`}
                 component="select">
              <option value="LITTLE_ENDIAN">LITTLE_ENDIAN</option>
              <option value="BIG_ENDIAN">BIG_ENDIAN</option>
          </Field>
      </fieldset>
    </Fragment>
  ))}
      <button
          className="initial-btn btn"
          onClick={() => fields.push({})}
      >
          Add block
      </button>
          </div>         
);