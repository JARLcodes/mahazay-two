import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import './App.css';
import Navbar from './components/Navbar';
import AllEntries from './components/AllEntries.jsx';
import SingleEntry from './components/SingleEntry.jsx';



const theme = createMuiTheme();


class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <div className="col-xs-10">
              <Navbar />
            </div>
            <div className="col-xs-10">
            <Switch>
              <Route exact path="/" />
              <Route exact path="/entries" component={AllEntries}/>
              <Route exact path="/entries/:id" component={SingleEntry}/>
            </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
