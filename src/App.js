import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import SingleEntry from './components/SingleEntry.jsx';
import Dashboard from './components/Dashboard.jsx';
import Home from './components/UserHomepage.jsx';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="col-xs-10">NAVBAR PLACEHOLDER</div>
          <div className="col-xs-10">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/entries/:id" component={SingleEntry} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
