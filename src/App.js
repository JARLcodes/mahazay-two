import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import * as firebase from 'firebase';
import 'firebase/firestore';

import { firebaseConfigs } from './utils/firebase.config.js';
import './App.css';
import Navbar from './components/Navbar';
import AllEntries from './components/AllEntries.jsx';
import SingleEntry from './components/SingleEntry.jsx';

firebase.initializeApp(firebaseConfigs);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
export const db = firestore;

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
