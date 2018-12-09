import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './home-page.css';

export const HomePage = (props) => {
    const handleGenerate = () => {
        toast('🦄 Your file is successfully generated!');
    };

  return (
    <section>
      <Link to="/generator/env">
        <button className="initial-btn btn">
          Start
        </button>
      </Link>

      <p className="paragraph">
        You also have an opportunity to create register / interface / sequence right now,
        so you can use it during generating template afterwards.
      </p>
      <div className="btn-wrapper">
        <Link to="/generator/register">
          <button className="initial-btn btn">
            Create register
          </button>
        </Link>
          <Link to="/generator/done">
              <button
                  className="initial-btn btn"
                  onClick={handleGenerate}
              >
                  Generate
              </button>
          </Link>

      </div>
    </section>
  );
};
