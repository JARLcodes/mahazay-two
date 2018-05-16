'use strict';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from "material-ui/Button";
import { withAuth } from 'fireview';


import { storage } from '../utils/firebase.config';

import { confirmAlert } from 'react-confirm-alert';
import { SingleTracker2 } from './index';

const styles = {
  addMedia: {
    margin: 20,
    alignSelf: 'center'
  },
  delete: {
    alignSelf: 'center',
    width: '20%',
    backgroundColor: "#EF9A9A",
    color: "#fff",
    borderRadius: "1em"
  },
  singleEntrySidebar : {
    display: "flex",
    flexDirection: "column"
  },
  addVideo: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10%"
  },
}

class SingleEntrySidebar extends Component {

  deleteEntry(entry){
    confirmAlert({
      title: 'Are you sure you want to delete this entry?',
      message: '',
      buttons: [
        {
          label: 'Yes, delete entry',
          onClick: () => entry.delete().then(() => this.props.history.push('/entries'))
        },
        {
          label: 'No, keep entry',
          onClick: () => this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${this.props.match.params.entryId}`)
        }
      ]
    });
  }

  render() {
    return (
      <div>
      { this.props._user && <SingleTracker2 entry={this.props.entry} user={this.props._user}/> }
      <div style={styles.singleEntrySidebar}>

        <Button variant="raised" style={styles.delete} onClick={this.deleteEntry.bind(this, this.props.entry)}>Delete Entry</Button>

      </div>
     
      
     
      </div>
    )
  }
}

export default withAuth(SingleEntrySidebar);
