import React from 'react';
import { Link } from 'react-router-dom';

import './home-page.css';

export const HomePage = (props) => {
  return (
    <section>
      <Link to="/generator/env">
        <button className="initial-btn btn" onClick={props.resetForm}>
          Start
        </button>
      </Link>

      <p className="paragraph">
        You also have an opportunity to create register / interface / sequence right now,
        so you can use it during generating template afterwards.
      </p>
      <div className="btn-wrapper">
        <Link to="/generator/register">
          <button className="initial-btn btn" onClick={props.resetForm}>
            Create register
          </button>
        </Link>

        <Link to="/generator/interface">
          <button className="initial-btn btn" onClick={props.resetForm}>
            Create interface
          </button>
        </Link>
      </div>
    </section>
  );
};
