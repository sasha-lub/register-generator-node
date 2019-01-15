import React from 'react';
import { Field, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

const BlockFieldComponent = ({fields, blockTypes}) => {
  return (
    <div>
      <button
        className="btn add-field-btn"
        onClick={() => fields.push({})}
      >
        + block
      </button>

      {renderLabels(fields)}

      {fields.map((field, index) => (
        <div className="section-field" key={`block-field-${index}`}>
          <Field className="form__input creating-field"
                 name={`${field}.fieldType`}
                 component="select">
            <option value="">type</option>
            {
              blockTypes.map((type) => {
                return (<option value={type}>{type}</option>)
              })
            }
          </Field>
          <Field className="form__input creating-field name"
                 name={`${field}.name`}
                 component="input"
                 type="text"
                 placeholder="name"/>
          <Field className="form__input creating-field"
                 name={`${field}.offset`}
                 component="input"
                 type="text"
                 placeholder="offset"/>
          [<Field className="form__input creating-field"
                  name={`${field}.dimension`}
                  component="input"
                  type="number"
                  placeholder="dimension"/>]
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

function renderLabels(fields) {
  if (fields.length > 0) {
    return <div className="section-field left">
      <label className="form__input__label_block">type</label>
      <label className="form__input__label_block">name</label>
      <label className="form__input__label_block">offset</label>
      <label className="form__input__label_block">dimension</label>
    </div>

  }
}

export const BlockField = connect(
  state => {
    const registerModelForm = getFormValues('generatorData')(state).regModel;
    const blockTypes = registerModelForm.blocks.map((block) => block.name);
    return {
      blockTypes
    };
  }
)(BlockFieldComponent);
