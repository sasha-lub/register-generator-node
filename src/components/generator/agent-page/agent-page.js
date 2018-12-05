import React, { Fragment } from 'react';
import { FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Agent } from './agent';

import 'react-toastify/dist/ReactToastify.css';

export const AgentPage = (props) => {
  const handleGenerate = () => {
    props.resetAgentAmount();

    toast('🦄 Your file is successfully generated!');
  };

  return (
    <Fragment>
      <FieldArray
        name="agent"
        component={Agent}
      />

      <button
        className="initial-btn btn"
        onClick={props.updateAgentAmount}
      >
        add agent
      </button>

      <Link to="/generator/done">
        <button 
          className="initial-btn btn" 
          onClick={handleGenerate}
        >
          Generate
        </button>
      </Link>
    </Fragment>
  );
};
