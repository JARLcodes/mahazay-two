import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from 'fireview';
import { storage } from '../utils/firebase.config';
import Button from "material-ui/Button";
import { confirmAlert } from 'react-confirm-alert';
import { withTheme } from 'material-ui/styles';
import { SingleTracker } from './index';


class SingleEntrySidebar extends Component {
  state = {
    journalId: ''
  }

  componentDidMount(){
    this.props.entry.get()
      .then(entry => this.setState({ journalId: entry.data().journalId }))
  }

  backToJournal(){
    if (this.state.journalId){
      this.props.history.push(`/journals/${this.state.journalId}`)
    }
  }

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
      { this.props._user && <SingleTracker entry={this.props.entry} user={this.props._user} style={{marginBottom: '2em'}}/> }
      <div style={{display: "flex", flexDirection: "column", margin: "2em 2em 2em 2em"}}>
        <Button variant="raised" style={{alignSelf: 'center', width: '20%', backgroundColor: "#EF9A9A", color: "#fff", borderRadius: "0.5em", marginTop: '2em'}} onClick={this.deleteEntry.bind(this, this.props.entry)}>
          Delete Entry
        </Button>
      </div>
      <div style={{display: "flex", flexDirection: "column", margin: "2em 2em 2em 2em"}}>
        <Button variant="raised" style={{alignSelf: 'center', width: '20%', backgroundColor: 'lightblue', color: "#fff", borderRadius: "0.5em", marginTop: '2em'}} onClick={this.backToJournal.bind(this, this.props.entry)}>
          Back To Journal
        </Button>
      </div>

      </div>
    );
  }
}

export default withTheme()(withAuth(SingleEntrySidebar));
