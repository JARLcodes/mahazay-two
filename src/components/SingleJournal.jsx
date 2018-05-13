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
      entries: [],
    }
    this.addEntry = this.addEntry.bind(this);

  }

  addEntry(){
    const todaysEntry = this.state.entries.filter(entry => (new Date(entry.dateCreated) - new Date(new Date().setHours(0,0,0,0)) === 0 ))[0]
    console.log("ENTRY:", todaysEntry)
    todaysEntry ? this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${todaysEntry.entryId}`)
    :
    getRootRef('entries').add({ dateCreated: (new Date()).setHours(0,0,0,0),
                                journalId: this.props.match.params.journalId,
                                userId: this.props._user.uid
                              })
      .then(docRef =>
        this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${docRef.id}`));
  }
  
  componentWillReceiveProps(nextProps){
    console.log("props: ", this.props)
    if(this.props._user !== nextProps._user){
      let entries = []
      db.collection('entries')
      .where('journalId', '==', this.props.match.params.journalId).get()
      .then(querySnapshot => {
        querySnapshot.forEach(entry => {
          this.setState({entries: [...this.state.entries, {entryId: entry.id, dateCreated: entry.data().dateCreated, content: entry.data().content, journalId: entry.data().journalId }]})
        })
      })
    }
  }

  render() {
    const entries = this.state.entries
    console.log(entries)
    // this.state.entries.forEach(entry => console.log("the date object for ", entry.entryId, " : ", entry.dateCreated))
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

export default withAuth(SingleJournal);
