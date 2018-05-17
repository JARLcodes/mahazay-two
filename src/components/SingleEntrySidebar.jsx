import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from 'fireview';
import { storage } from '../utils/firebase.config';
import Button from "material-ui/Button";
import { confirmAlert } from 'react-confirm-alert';
import { withTheme } from 'material-ui/styles';
import { SingleTracker } from './index';

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
      { this.props._user && <SingleTracker entry={this.props.entry} user={this.props._user}/> }
      <div style={{display: "flex", flexDirection: "column", margin: "0em 2em 2em 2em"}}>
        <Button variant="raised" style={{alignSelf: 'center', width: '20%', backgroundColor: "#EF5350", color: "#fff", borderRadius: "0.5em", margin: '1em 1em 1em'}} onClick={this.deleteEntry.bind(this, this.props.entry)}>
          Delete Entry
        </Button>
      </div>
      </div>
    );
  }
}

export default withTheme()(withAuth(SingleEntrySidebar));
