import React from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';

import {
    selectRegisterFieldsAmount,
} from '../../../store';

export const RegisterFieldComponent = (props) => {
    const registerFieldsArray = Array.from(
        { length: props.registerFieldsAmount },
        (value, index) => index + 1,
    );

    return registerFieldsArray.map((index) => (
        <div className="section-field" key={`register-field-${index}`}>
            <Field className="form__input creating"
                   name={`registerField${index}.name`}
                   component="input"
                   type="text"
                   placeholder="name"/>
            <Field className="form__input creating"
                   name={`registerField${index}.size`}
                   component="input"
                   type="int"
                   placeholder="size" />
            <Field className="form__input creating"
                   name={`registerField${index}.lsbPos`}
                   component="input"
                   type="text"
                   placeholder="lsb_pos"/>
            <Field className="form__input creating"
                   name={`registerField${index}.access`}
                   component="select"
             >
                <option value="RW">RW</option>
                <option value="RO">RO</option>
            </Field>
            <Field className="form__input creating"
                   name={`registerField${index}.volatile`}
                   component="input"
                   type="text"
                   placeholder="volatile"/>
            <Field className="form__input creating"
                   name={`registerField${index}.reset`}
                   component="input"
                   type="text"
                   placeholder="reset"/>
            <Field className="form__input creating"
                   name={`registerField${index}.reset`}
                   component="input"
                   type="text"
                   placeholder="has reset"/>
            <Field className="form__input creating"
                   name={`registerField${index}.isRand`}
                   component="select"
            >
                <option value="1">1</option>
                <option value="0">0</option>
            </Field>
            <Field className="form__input creating"
                   name={`registerField${index}.individuallyAccessible`}
                   component="input"
                   type="text"
                   placeholder="individually accessible"/>
            {/*<button*/}
                {/*className="field-btn"*/}
                {/*onClick={props.updateRegisterFieldsAmount}*/}
            {/*>*/}
                {/*<i className="far fa-copy"/>*/}
            {/*</button>*/}
            {/*<button*/}
                {/*className="field-btn"*/}
                {/*onClick={props.updateRegisterFieldsAmount}*/}
            {/*>*/}
                {/*<i className="far fa-trash-alt"/>*/}
            {/*</button>*/}
        </div>
    ));
};

const mapStateToProps = (state) => ({
    registerFieldsAmount: selectRegisterFieldsAmount(state),
});

export const RegisterField = connect(mapStateToProps)(RegisterFieldComponent);
