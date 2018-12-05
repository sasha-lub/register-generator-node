import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ToastContainer } from 'react-toastify';

import { AgentPage } from './agent-page';
import { HomePage } from './home-page';

import {
  Environment,
  Result,
  Transaction,
  Interface,
  Sequence,
} from './';

import {
  resetForm,
  updateAgentAmount,
  resetAgentAmount,
  updateTransactionFieldsAmount,
  resetTransactionFieldsAmount,
  updateSignalFieldsAmount,
  resetSignalFieldsAmount,
  updateSequenceFieldsAmount,
  resetSequenceFieldsAmount,
} from '../../store';

import '../../styles/index.css';
import './generator.css';

class GeneratorClass extends Component {
  renderContent() {
    const { pathname } = this.props.location;

    switch (true) {

    case (pathname.includes('env')):
      return <Environment/>;

    case (pathname.includes('agent')):
      return <AgentPage {...this.props} />;

    case (pathname.includes('done')):
      return <Result {...this.props} />;

    case (pathname.includes('transaction')):
      return <Transaction {...this.props} />;

    case (pathname.includes('interface')):
      return <Interface {...this.props} />;

    case (pathname.includes('sequence')):
      return <Sequence {...this.props} />;

    default:
      return <HomePage {...this.props} />;
    }
  }

  renderHeader() {
    const { pathname } = this.props.location;

    switch (true) {
    case (pathname.includes('done')):
      return 'Here is your file!';

    case (pathname.includes('transaction')):
      return 'Let\'s create a transaction';

    case (pathname.includes('interface')):
      return 'Let\'s create a interface';

    case (pathname.includes('sequence')):
      return 'Let\'s create a sequence';

    default:
      return 'Let\'s generate template of verification';
    }
  }

  render() {
    return (
      <main className="main">
        <header className="heading">
          <h2>
            {this.renderHeader()}
          </h2>
        </header>
        <section className="page section">
          {this.renderContent()}
        </section>
        <ToastContainer />
      </main>
    );
  }
}

const mapDispatchToProps = {
  resetForm,
  updateAgentAmount,
  resetAgentAmount,
  updateTransactionFieldsAmount,
  resetTransactionFieldsAmount,
  updateSignalFieldsAmount,
  resetSignalFieldsAmount,
  updateSequenceFieldsAmount,
  resetSequenceFieldsAmount,
};

export const Generator = reduxForm({
  form: 'generatorData',
  enableReinitialize: true,
  initialValues: {
    env: {
      baseType: 'uvm_env',
      testbench: false,
    },
  },
})(connect(null, mapDispatchToProps)(GeneratorClass));
