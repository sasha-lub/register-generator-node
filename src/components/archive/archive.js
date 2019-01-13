import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';

import './archive.css';
import ModelsStore from "../../store/ModelsStore";
import ModelsActions from "../../db/actions/ModelsActions";

export class Archive extends Component {

  handleLoad = (id) => {
    ModelsActions.loadSingleModel(id,() => {
    const initialValues = {regModel : ModelsStore.getSelectedModel()};
    this.props.dispatch(initialize('generatorData', initialValues))
    })
  };

  formatModel = (model) => {
    return <li id={model.id}>
      <span key="name"
            onClick={() => this.handleLoad(model.id)}
            className="file-name"
            title="download file">
      {model.name}
      </span>
      <button
        className="field-btn"
        onClick={() => ModelsActions.deleteModel(model.id)}
      >
        <i className="far fa-trash-alt"/>
      </button>
    </li>
  };

  render() {
    const models = ModelsStore.getModels();
    const filesList = models.map(this.formatModel);

    return (
      <main className="main">
        <section className="section">
          <p>Here is a list of models that were made before:</p>
          <ul>
            {filesList}
          </ul>
        </section>
      </main>
    );
  }
}
