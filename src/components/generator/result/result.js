import ModelsActions from '../../../actions/ModelsActions';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { render } from 'velocityjs';
import { block} from '../../../templates';

import './result.css';
export const ResultClass = (props) => {

  const { values, loadForm } = props;
  ModelsActions.createModel(values.regModel);
  const generatedData = render(block, values, null);
  loadForm({data:"lol kek"});
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
        <p className="download-text">Press the icon to download</p>
      </section>

      <section className="download-wrapper">
        <p className="download-text">Quick view</p>
        <pre className="text-block">
          {generatedData}
        </pre>
      </section>

      <div className="row row-button">
      <Link to="/generator/env">
        <button className="initial-btn btn btn_large" onClick={props.resetForm}>
          Generate a new one
        </button>
      </Link>
      <Link to="/generator">
        <button className="initial-btn btn btn_large" >
          Go back and modify
        </button>
      </Link>
      </div>
    </Fragment>
  );
};

export const Result = connect(
  state => ({
      values : getFormValues('generatorData')(state),
  }))(ResultClass);
