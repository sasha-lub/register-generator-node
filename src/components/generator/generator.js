import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {ToastContainer} from 'react-toastify';

import {Block, Register, RegisterModel, Result,} from './';

import {resetForm,} from '../../store';

import '../../styles/index.css';
import './generator.css';

class GeneratorClass extends Component {
  renderContent() {
    const { pathname } = this.props.location;

    switch (true) {

    case (pathname.includes('done')):
      return <Result {...this.props} />;

    case (pathname.includes('register')):
      return <Register {...this.props} />;

    case (pathname.includes('block')):
      return <Block {...this.props} />;

    default:
      return <RegisterModel {...this.props} />;
    }
  }

  renderHeader() {
    const { pathname } = this.props.location;

    switch (true) {
    case (pathname.includes('done')):
      return 'Here is your file!';

    case (pathname.includes('register')):
      return 'Let\'s create a register';
      case (pathname.includes('block')):
            return 'Let\'s create a block';
    default:
      return 'Let\'s generate register model';
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
};

export const Generator = reduxForm({
  form: 'generatorData',
  enableReinitialize: true,
  initialValues: {
    regModel: {
      name: 'register_model',
      registers: [{
        fields: [{
          size: 8,
          lsbPos: 0,
        }]
      }],
      blocks: [{}]
    },
  },
})(connect(null, mapDispatchToProps)(GeneratorClass));
