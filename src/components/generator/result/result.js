import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import { agent } from '../../../templates';

import './result.css';
export const ResultClass = (props) => {
  const { name } = props;
  const generatedData = agent({ name });

  localStorage.setItem(`sv-${name}`, generatedData);

  const handleDownload = () => {
    const file = new Blob([generatedData], { type: 'text/plain' });

    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = `${name.slice(3)}.sv`;
    element.click();
  };

  return (
    <Fragment>
      <section className="download-wrapper">
        <button
          className="download-btn"
          onClick={handleDownload}
        >
          <i className="fas fa-file-code icon"></i>
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
        <button className="initial-btn btn btn_large">
          Generate a new one
        </button>
      </Link>
    </Fragment>
  );
};

const selector = formValueSelector('generatorData');

export const Result = connect(
  state => {
    // const testbench = selector(state, 'env.testbench');
    const name = selector(state, 'env.name');
    // const { firstName, lastName } = selector(state, 'firstName', 'lastName')
    return {
      // testbench,
      name,
      // fullName: `${firstName || ''} ${lastName || ''}`
    };
  }
)(ResultClass);
