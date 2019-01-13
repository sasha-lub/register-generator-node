import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, initialize} from 'redux-form';
import {load as loadAccount} from './account';

import {Block, Register, RegisterModel, Result,} from './';

import {resetForm} from '../../store';

import '../../styles/index.css';
import './generator.css';
import ModelsActions from "../../db/actions/ModelsActions";
import ModelsStore from "../../store/ModelsStore";
import {Archive} from "../archive";

class GeneratorClass extends React.Component {

  renderContent() {
    const {pathname} = this.props.location;

    switch (true) {
      case (pathname.includes('done')):
        return <Result {...this.props} />;
      case (pathname.includes('archive')):
        return <Archive {...this.props} />;
      default:
        return <RegisterModel {...this.props} />;
    }
  }

  renderHeader() {
    const {pathname} = this.props.location;

    switch (true) {
      case (pathname.includes('done')):
        return 'Here is your file!';
      case (pathname.includes('archive')):
        return 'Archive';
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
      </main>
    );
  }
}

const mapDispatchToProps = {
  resetForm
};

export const Generator = reduxForm({
  form: 'generatorData',
  enableReinitialize: true,
  destroyOnUnmount: false,
initialValues: {
    regModel: {
      name: 'register_model',
      registers: [{
        name : 'REG_1'
      }],
      blocks: [{
        name : 'BLK_1'
      }]
    },
  },
})(connect(null, mapDispatchToProps)(GeneratorClass));