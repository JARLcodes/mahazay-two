import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from "material-ui/Button";
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { withAuth } from 'fireview';

import { getRootRef } from '../utils/componentUtils';


const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

export class AllEntries extends Component {
  constructor(){
    super();
    this.state = {
      entries: []
    };
  
  }

  componentDidMount(){
    getRootRef('entries').get()
      .then(querySnapshot => {
        querySnapshot.forEach(entry => this.setState({ 
          entries: [...this.state.entries, {[entry.id] : entry.data(), journalId: entry.data().journalId }] 
        }));
    });
  }

  render() {
    const { entries } = this.state;
    return (
      <div>
        <Grid container spacing={24}>
        { entries.map( entry => {
          return (
            <Grid key={Object.keys(entry)} item xs={3} >
              <Card>
                <CardContent>
                  <Link to={`/journals/${entry.journalId}/entries/${Object.keys(entry)}`}>{"Entry #" + Object.keys(entry)[0]}</Link>
                </CardContent>
              </Card>
            </Grid>
          );}
        )}
        </Grid>
      </div>
    );
  }
}

export default withAuth(withStyles(styles)(AllEntries));
