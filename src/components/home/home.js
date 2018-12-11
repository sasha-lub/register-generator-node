import React, { Component } from 'react';

import '../../styles/index.css';

export class Home extends Component {
  render() {
    return (
      <main className="main">
        <section className="section">
          <header className="heading">
            <h2>Welcome</h2>
          </header>
          <p>Hello!</p>
          <p>Register Model Generator allows you:</p>
          <ul>
            <li> Configure register with full specification of its fields </li>
            <li> Based on configured registers, create register blocks, with memory bus and stuff </li>
            <li> Create so much elements as you need</li>
            <li> Copy or delete elements</li>
            <li> Download the result file</li>
          </ul>
        </section>
      </main>
    );
  }
}
