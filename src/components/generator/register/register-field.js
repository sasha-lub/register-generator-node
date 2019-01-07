import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

const RegisterFieldComponent = ({fields}) => (
    <div>
        <button
            className="btn add-field-btn"
            onClick={() => fields.push({})}
        >
          + field
        </button>

      <div className="section-field left">
        <label className="form__input__label_reg">name</label>
        <label className="form__input__label_reg">size</label>
        <label className="form__input__label_reg">lsbPos</label>
        <label className="form__input__label_reg">access</label>
        <label className="form__input__label_reg">volatile</label>
        <label className="form__input__label_reg">reset</label>
        <label className="form__input__label_reg">hasReset</label>
        <label className="form__input__label_reg">isRand</label>
        <label className="form__input__label_reg">indvAccess</label>
        <label className="form__input__label_reg">dimension</label>
      </div>

        {fields.map((field, index) => (
            <div className="section-field" key={`register-field-${index}`}>
                <Field className="form__input creating-field name"
                       name={`${field}.name`}
                       component="input"
                       type="text"
                       placeholder="name"/>
                <Field className="form__input creating-field"
                       name={`${field}.size`}
                       component="input"
                       type="number"
                       placeholder="size"/>
                <Field className="form__input creating-field"
                       name={`${field}.lsbPos`}
                       component="input"
                       type="text"
                       placeholder="lsb_pos"/>
                <Field className="form__input creating-field"
                       name={`${field}.access`}
                       component="select"
                >
                    <option>access</option>
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
                <Field className="form__input creating-field"
                       name={`${field}.volatile`}
                       component="select">
                  <option>volatile</option>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </Field>
                <Field className="form__input creating-field"
                       name={`${field}.reset`}
                       component="input"
                       type="text"
                       placeholder="reset"/>
                <Field className="form__input creating-field"
                       name={`${field}.hasReset`}
                       component="select">
                  <option>has reset</option>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </Field>
                <Field className="form__input creating-field"
                       name={`${field}.isRand`}
                       component="select">
                  <option>is rand</option>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </Field>
                <Field className="form__input creating-field"
                       name={`${field}.individuallyAccessible`}
                       component="select">
                  <option>indv access</option>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </Field>
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

  export const RegisterField = connect()(RegisterFieldComponent);
