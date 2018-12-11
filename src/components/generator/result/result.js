import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { render } from 'velocityjs';
import { block} from '../../../templates';

import './result.css';
export const ResultClass = (props) => {

  const { values } = props;
  const generatedData = render(block, values, null);

  localStorage.setItem(`sv-${values.regModel.name}`, generatedData);

  const handleDownload = () => {
    const file = new Blob([generatedData], { type: 'text/plain' });

    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = `${values.regModel.name}.sv`;
    element.click();
  };

  return (
    <Fragment>
      <section className="download-wrapper">
        <button
          className="download-btn"
          onClick={handleDownload}
        >
          <i className="fas fa-file-code icon"/>
        </button>
        <p className="dowload-text">Press the icon to download</p>
      </section>

      <section className="download-wrapper">
        <p className="dowload-text">Quick view</p>
        <pre>
          {generatedData}
        </pre>
      </section>

      <Link to="/generator/env">
        <button className="initial-btn btn btn_large" onClick={props.resetForm}>
          Generate a new one
        </button>
      </Link>
    </Fragment>
  );
};

export const Result = connect(
  state => ({
      values : getFormValues('generatorData')(state),
  }))(ResultClass);
