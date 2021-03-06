import React, { Fragment } from 'react';
import { Field, FieldArray } from 'redux-form';
import { BlockField } from './block-field';
import { RegField } from './reg-field';

import './block.css';

export const Block = ({fields}) => (
  <div>
      {fields.map((block, index) => (
    <Fragment key={`block-${index}`}>
      <fieldset className="form__section">
        <legend className="section-field__name">
          Block {index+1}
          <button
            className="field-btn"
            onClick={() => fields.remove(index)}
          >
            <i className="far fa-times-circle"/>
          </button>
        </legend>
          <div className="section-field left">
            <label>block :</label>

            <Field className="form__input creating name"
               name={`${block}.name`}
               component="input"
               type="text"
               placeholder="name"/>
          <Field className="form__input creating"
                 name={`${block}.coverageMode`}
                 component="select">
              <option value="">coverage mode</option>
              <option value="UVM_NO_COVERAGE">UVM_NO_COVERAGE</option>
              <option value="UVM_CVR_REG_BITS">UVM_CVR_REG_BITS</option>
              <option value="UVM_CVR_ADDR_MAP">UVM_CVR_ADDR_MAP</option>
              <option value="UVM_CVR_FIELD_VALS">UVM_CVR_FIELD_VALS</option>
              <option value="UVM_CVR_ALL">UVM_CVR_ALL</option>
          </Field>
          </div>
          <div className="section-field left">
            <label>map  :</label>
          <Field className="form__input creating name"
                 name={`${block}.map.name`}
                 component="input"
                 type="text"
                 placeholder="map name"/>
              <Field className="form__input creating"
                 name={`${block}.map.offset`}
                 component="input"
                 type="text"
                 placeholder="offset"/>
              <Field className="form__input creating"
                 name={`${block}.map.size`}
                 component="input"
                 type="number"
                 placeholder="map size"/>
              <Field className="form__input creating"
                 name={`${block}.map.endian`}
                 component="select">
                  <option value="UVM_NO_ENDIAN">UVM_NO_ENDIAN</option>
                  <option value="UVM_LITTLE_ENDIAN">UVM_LITTLE_ENDIAN</option>
                  <option value="UVM_BIG_ENDIAN">UVM_BIG_ENDIAN</option>
                  <option value="UVM_LITTLE_FIFO">UVM_LITTLE_FIFO</option>
                  <option value="UVM_BIG_FIFO">UVM_BIG_FIFO</option>
              </Field>
          </div>
        <div className="section-field left">
          <label>mem  :</label>
          <Field className="form__input creating name"
                 name={`${block}.mem.name`}
                 component="input"
                 type="text"
                 placeholder="mem name"/>
          <Field className="form__input creating"
                 name={`${block}.mem.offset`}
                 component="input"
                 type="text"
                 placeholder="offset"/>
          <Field className="form__input creating"
                 name={`${block}.mem.size`}
                 component="input"
                 type="number"
                 placeholder="mem size"/>
        </div>
          <FieldArray
              name={`${block}.regFields`}
              component={RegField}
          />
          <FieldArray
              name={`${block}.blockFields`}
              component={BlockField}
          />
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