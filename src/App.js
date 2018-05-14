import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './App.css';
import { withAuth } from 'fireview';

import history from './history';
import {
  Navbar,
  SingleEntry,
  Dashboard,
  Home,
  AllEntries,
  AllJournals,
  SingleJournal,
  NewJournalForm,
  Insights,
  TrackerSummary,
  Tracker
} from './components/index.js';

const theme = createMuiTheme();

class App extends Component {

  render() {
    const user = this.props._user;

    return (
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <div className="col-xs-10">
              <Navbar />
            </div>
            <div className="col-xs-10">
            <Switch>
              <Route exact path="/entries" component={AllEntries} />
              <Route exact path="/journals/:journalId/entries/:entryId" component={SingleEntry} />
              <Route exact path="/journals" component={AllJournals} />
              <Route exact path="/journals/:journalId" component={SingleJournal} />
              <Route exact path="/insights" component={Insights} />
              <Route exact path="/new-journal" component={NewJournalForm}/>
              <Route path="/tracker" component={TrackerSummary}/>
              <Route exact path="/tracker/name" component={Tracker}/>
              <Route exact path="/:userId/new-journal" component={NewJournalForm}/>
            { user ? <Route exact path="/" component={Dashboard}/>
                    : <Route exact path="/" component={Home}/>}
            { user ? <Route component={Dashboard}/>
                    : <Route component={Home}/>}
            </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}


export default withAuth(App);
