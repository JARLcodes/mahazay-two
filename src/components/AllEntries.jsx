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
// .where('userId', '==', this.props._user.uid)
  componentDidMount(){
    let entries =[]
    this.props._user && getRootRef('entries').where('userId', '==', this.props._user.uid).get()
    .then(querySnapshot => {
      querySnapshot.forEach(entry => {
        entries.push({entryId: entry.id, content: entry.data().content, journalId: entry.data().journalId })
      })
    })
    .then(() => this.setState({entries}))

  }

// For entries => each entry has a content key which has an object with the key blocks which is an array of objects , each with the key of text
  render() {

    const {entries} = this.state
    console.log("user", this.props._user)
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
      </div>
    )
  }
}

export default withAuth(withStyles(styles)(AllEntries));
