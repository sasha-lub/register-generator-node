import React, { Component } from 'react';

import './archive.css';

export class Archive extends Component {
  getAllData = () => {
    return Object.keys(localStorage).filter(value => value.includes('sv-'));
  }

  handleDownload = (name) => {
    const data = localStorage.getItem(name);
    const file = new Blob([data], { type: 'text/plain' });

    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = `${name.slice(3)}.sv`;
    element.click();
  }

  render() {
    const files = this.getAllData();
    const filesList = files.map((name, index) => (
      <li 
        key="name"
        onClick={() => this.handleDownload(name)}
        className="file-name"
        title="download file"
      >
        {name.slice(3)}
      </li>
    ));

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
