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
          <p>My name is Anastasia Hahanova. I would like to perform for you VHDL generator.</p>
          <p>The principle works as following:</p>
          <ol>
            <li>
              You enter data for environments, such as: name, base type, configs.
              Check flag if you want to include a testbench.
            </li>
            <li>
              Enter data for agents.
              You can provide information about agent name and type, monitor, 
              driver, sequencer, interface and configs.
              You can add so many agent as you want.
            </li>
            <li>Our service generates a VHDL file for you.</li>
            <li>Woola, you got it!</li>
          </ol>
        </section>
      </main>
    );
  }
}
