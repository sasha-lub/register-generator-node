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
    console.log(initialValues);
    this.props.dispatch(initialize('generatorData', initialValues))
    console.log(">>>>>>>>>>>>");
    })
//  );
    // const data = localStorage.getItem(name);
    // const file = new Blob([data], { type: 'text/plain' });
    //
    // const element = document.createElement('a');
    // element.href = URL.createObjectURL(file);
    // element.download = `${name.slice(3)}.sv`;
    // element.click();
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
          <header className="heading">
            <h2>Archive</h2>
          </header>
          <p>Here is a list of files that were made before:</p>
          <ul>
            {filesList}
          </ul>
        </section>
      </main>
    );
  }
}
