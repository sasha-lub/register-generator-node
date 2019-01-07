import React, { Component } from 'react';

import './archive.css';
import ModelsStore from "../../store/ModelsStore";
import ModelsActions from "../../db/actions/ModelsActions";
import api from "../../db/api";

export class Archive extends Component {

  handleLoad = (name) => {
    ModelsActions.loadSingleModel(name,
      function () {
        const model = ModelsStore.getSelectedModel();
        console.log(model);
      }
  );
    // const data = localStorage.getItem(name);
    // const file = new Blob([data], { type: 'text/plain' });
    //
    // const element = document.createElement('a');
    // element.href = URL.createObjectURL(file);
    // element.download = `${name.slice(3)}.sv`;
    // element.click();
  };

  formatModel = (model) => {
    return <li
      key="name"
      onClick={() => this.handleLoad(model.name)}
      className="file-name"
      title="download file"
    >
      {model.name}
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
