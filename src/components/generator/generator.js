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

class GeneratorClass extends React.Component {

  renderContent() {
    const {pathname} = this.props.location;

    switch (true) {
      case (pathname.includes('done')):
        return <Result {...this.props} />;

      default:
        return <RegisterModel {...this.props} />;
    }
  }

  renderHeader() {
    const {pathname} = this.props.location;

    switch (true) {
      case (pathname.includes('done')):
        return 'Here is your file!';
      default:
        return 'Let\'s generate register model';
    }
  }

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
        <header className="heading">
          <h2>
            {this.renderHeader()}
          </h2>
        </header>
        <p>Saved models:</p>
           <ul>
             {filesList}
           </ul>
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