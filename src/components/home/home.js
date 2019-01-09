import React, { Component } from 'react';

import '../../styles/index.css';
import ModelsActions from "../../actions/ModelsActions";

export class Home extends Component {
  componentWillMount() {
    ModelsActions.loadModels();
  }

  render() {
    return (
      <main className="main">
        <section className="section">
          <header className="heading">
            <h2>Register Model Generator</h2>
          </header>
          <div className="text-block">
          <p>Hey there!</p>

          <p>This app allows to avoid painstaking manual work - declaring numerous registers and memory blocks, protects you from possible syntax error</p>
          <p>For what:</p>
            <ul>
              <li> Configure register with full specification of its fields </li>
              <li> Configure memory blocks, operating registers created before </li>
            </ul>
            <p>How to:</p>
          <ul>
            <li> To generate model, fill up at least one element (register or block) </li>
            <li> Press  <i className="far fa-times-circle"/>  to delete whole element </li>
            <li> Press  <i className="far fa-trash-alt"/>  to delete one field</li>
            <li> Press  <i className="far fa-copy"/>  to copy a field</li>
            <li> Use "reset model" to start over</li>
            <li> Use "generate model" to guess what</li>
            <li> Download file on done or copy content from "quick view" area</li>
          </ul>

            <p>That's it, good luck! <i className="fas fa-rocket"/></p>
          </div>
        </section>
      </main>
    );
  }
}
