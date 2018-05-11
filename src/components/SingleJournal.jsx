import React, { Component } from 'react';
import {db} from '../utils/firebase.config'
import Button from "material-ui/Button";
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { withAuth } from 'fireview';
import { Link } from 'react-router-dom';

import { getRootRef } from '../utils/componentUtils';

export class SingleJournal extends Component {
  constructor(props){
    super(props);
    this.state = {
      entries: []
    }
    this.addEntry = this.addEntry.bind(this);

  }

  addEntry(){
    getRootRef('entries').add({userId: this.props._user.uid})
      .then(docRef =>
        this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${docRef.id}`));
  };
  componentWillReceiveProps(nextProps){
    if(this.props._user !== nextProps._user){
      let entries = []
      db.collection('entries')
      .where('journalId', '==', this.props.match.params.journalId).get()
      .then(querySnapshot => {
        querySnapshot.forEach(entry => {
          this.setState({entries: [...this.state.entries, {entryId: entry.id, content: entry.data().content, journalId: entry.data().journalId }]})
        })
      })
    }
  }

  render() {
    const entries = this.state.entries
    console.log("params",this.props.match.params.id ,"example:", entries)
    return (
      <div>
        <Grid container spacing={24}>
        { entries.map( entry => {
          return (
            <Grid key={entry.entryId} item xs={3} >
              <Card>
                <CardContent>
                  <Link style={{ textDecoration: 'none' }} to={`/journals/${entry.journalId}/entries/${entry.entryId}`}>"{entry.content && entry.content.blocks[0].text ? entry.content.blocks[0].text.substr(0, 20) + "..." : "A Blank Page"}"</Link>
                </CardContent>
              </Card>
            </Grid>
          )}
        )}
        </Grid>
        <Button onClick={this.addEntry}>New Entry</Button>
      </div>
    )
  }
}

export default withAuth(SingleJournal)
