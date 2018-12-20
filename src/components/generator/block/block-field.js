import React from 'react';
import { Field, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

const BlockFieldComponent = ({fields, fieldTypes}) => {
  return (
    <div>
      <button
        className="btn add-field-btn"
        onClick={() => fields.push({})}
      >
        + reg/block
      </button>

      {fields.map((field, index) => (
        <div className="section-field" key={`block-field-${index}`}>
          <Field className="form__input creating-field"
                 name={`${field}.type`}
                 component="select">
            <option value="">type</option>
            {
              fieldTypes.map((type) => {
                return (<option value={type}>{type}</option>)
              })
            }
          </Field>
          <Field className="form__input creating-field"
                 name={`${field}.name`}
                 component="input"
                 type="text"
                 placeholder="name"/>
          <Field className="form__input creating-field"
                 name={`${field}.offset`}
                 component="input"
                 type="text"
                 placeholder="offset"/>
          <Field className="form__input creating-field"
                 name={`${field}.access`}
                 component="select"
          >
            <option value="">access</option>
            <option value="RW">RW</option>
            <option value="RO">RO</option>
            <option value="RO">WO</option>
            <option value="RO">W1</option>
            <option value="RC">RC</option>
            <option value="RS">RS</option>
            <option value="WRC">WRC</option>
            <option value="WRS">WRS</option>
            <option value="WC">WC</option>
            <option value="WS">WS</option>
          </Field>
          [<Field className="form__input creating-field"
                  name={`${field}.amount`}
                  component="input"
                  type="number"
                  placeholder="amount"/>]
          <button
            className="field-btn"
            onClick={() => fields.push(fields.get(index))}
          >
            <i className="far fa-copy"/>
          </button>
          <button
            className="field-btn"
            onClick={() => fields.remove(index)}
          >
            <i className="far fa-trash-alt"/>
          </button>
        </div>

      ))}
    </div>
  );
};

export const BlockField = connect(
  state => {
    const registerModelForm = getFormValues('generatorData')(state).regModel;
    const registerTypes = registerModelForm.registers.map((register) => register.name);
    const blockTypes = registerModelForm.blocks.map((block) => block.name);
    const fieldTypes = registerTypes.concat(blockTypes);
    return {
      fieldTypes
    };
  }
)(BlockFieldComponent);
