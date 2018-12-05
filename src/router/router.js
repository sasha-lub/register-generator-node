import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {
  Generator,
  Home,
  Archive,
} from '../components';

import './menu.css';

const RouterApp = () => {
  return (
    <Router>
      <div>
        <ul className="menu-main">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/generator">Generator</Link>
          </li>
          <li>
            <Link to="/archive">Archive</Link>
          </li>
        </ul>

        <Route exact path="/" component={Home} />
        <Route path="/generator" component={Generator} />
        <Route path="/archive" component={Archive} />
      </div>
    </Router>
  );
};

export default RouterApp;
