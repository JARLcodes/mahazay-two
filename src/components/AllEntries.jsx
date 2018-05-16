import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Subheader from 'material-ui/List/ListSubheader';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { withAuth } from 'fireview';
import ReactPlayer from 'react-player';
import { withTheme } from 'material-ui/styles';

import { getRootRef } from '../utils/componentUtils';

const styles = theme => ({
  card: {
    width: 300,
    height: 400,
    borderRadius: ".5em .5em"
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    
  },
  subheader: {
    
  }, 
  subheaderWrapper: {
    
  }
});

export class AllEntries extends Component {
  constructor(){
    super();
    this.state = {
      entries: []
    };

  }

  componentWillReceiveProps(nextProps){
    if(this.props._user !== nextProps._user){
       getRootRef('entries').where('userId', '==', nextProps._user.uid).orderBy('dateCreated', "desc").get()
      .then(querySnapshot => {
        querySnapshot.forEach(entry => {
          this.setState({entries: [...this.state.entries, {entryId: entry.id, content: entry.data().content, journalId: entry.data().journalId, dateCreated: entry.data().dateCreated }]});
        });
      });

    }
  }
  goToJournals(){
    this.props.history.push('/journals');
  }

// For entries => each entry has a content key which has an object with the key blocks which is an array of objects , each with the key of text
  render() {
    const {entries} = this.state;
    const users = [];
    getRootRef('users').get().then(querySnap => {
      querySnap.forEach(doc => {
        users.push({userId: doc.id, data: doc.data()});
      });
    });
    return (
      <div>
        <Grid container spacing={24} style={{"paddingLeft": 24 + "px", "paddingRight": 24 + "px", "marginBottom": 24 +"px" }}>
        { entries.length > 0
          ? entries.map( entry => {
            return (
              <Grid key={entry.entryId} item xs={3} >
                <Card>
                  <CardContent>
                    <Link style={{ textDecoration: 'none', color: "black" }} to={`/journals/${entry.journalId}/entries/${entry.entryId}`}>"{entry.content && entry.content.blocks[0].text ? entry.content.blocks[0].text.substr(0, 20) + "..." : "A Blank Page"}" <br /> { new Date(entry.dateCreated).toDateString()}</Link>
                  </CardContent>
                </Card>
              </Grid>
              );
            })
          : <div style={{marginLeft: "38%"}}><Subheader component="div" style={{fontSize: "2.5em", fontVariant: 'small-caps', color: 'grey'}}>No entries made</Subheader><Button onClick={this.goToJournals.bind(this)}>go to journals</Button></div> 
          
        }
        </Grid>

      </div>
    );
  }
}

export default withTheme()(withAuth(AllEntries));
