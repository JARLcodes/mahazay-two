import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from "material-ui/Button";
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';

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
      rootRef: getRootRef('entries'),
      entries: [],
      allEntryIds: []
    };
    this.addEntry = this.addEntry.bind(this);
  }

  componentDidMount(){
    const { rootRef } = this.state;
    rootRef.get()
      .then(querySnapshot => {
        querySnapshot.forEach(entry => this.setState({ entries: [...this.state.entries, {[entry.id] : entry.data() }], allEntryIds: [...this.state.allEntryIds, entry.id]}))
    })
  }

  addEntry(){
    console.log('assigning new entry to journal AND generating new entry id');
    const newEntryId = this.state.allEntryIds.length > 0 ? Number(this.state.allEntryIds[this.state.allEntryIds.length - 1]) + 1 : 1;
    this.props.history.push(`/entries/${newEntryId}`);
  }

  render() {
    const { rootRef, entries, newEntryId } = this.state;

    return (
      <div>
        <Grid container spacing={24}>
        { entries.map( entry => {
          return (
            <Grid key={Object.keys(entry)} item xs={3} >
              <Card>
                <CardContent>
                  <Link to={`/entries/${Object.keys(entry)}`}>{"Entry #" + Object.keys(entry)[0]}</Link>
                </CardContent>
              </Card>
            </Grid>
          )}
        )}
        <Button onClick={this.addEntry}>New Entry</Button>
        { newEntryId && <Redirect to={`/entries/${newEntryId}`}/> }
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AllEntries)
