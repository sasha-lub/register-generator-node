import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

const BlockFieldComponent = ({fields}) => (
    <div>
        <button
            className="btn"
            onClick={() => fields.push({})}
        >
            Add register
        </button>

        {fields.map((register, index) => (
            <div className="section-field" key={`register-${index}`}>
                <Field className="form__input creating-field"
                       name={`${register}.type`}
                       component="input"
                       type="text"
                       placeholder="type"/>
                <Field className="form__input creating-field"
                       name={`${register}.name`}
                       component="input"
                       type="text"
                       placeholder="name"/>
                <Field className="form__input creating-field"
                       name={`${register}.offset`}
                       component="input"
                       type="text"
                       placeholder="offset"/>
                <Field className="form__input creating-field"
                       name={`${register}.access`}
                       component="select"
                >
                    <option value="RW">RW</option>
                    <option value="RO">RO</option>
                </Field>
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

export const BlockField = connect()(BlockFieldComponent);
