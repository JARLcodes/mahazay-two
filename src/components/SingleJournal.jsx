import React, { Component } from 'react';
import Button from "material-ui/Button";
import { withAuth } from 'fireview';

import { getRootRef } from '../utils/componentUtils';

class SingleJournal extends Component {
  constructor(props){
    super(props);
    this.addEntry = this.addEntry.bind(this);

  }

  addEntry(){
    console.log('this.props', this.props._user.email);
    getRootRef('entries').add({ dateCreated: new Date(), journalId: this.props.match.params.journalId, userEmail: this.props._user.email })
      .then(docRef => 
        this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${docRef.id}`));
  };

  render() {
    return (
      <div>
        <Button onClick={this.addEntry}>New Entry</Button>
      </div>
    )
  }
}

export default withAuth(SingleJournal);
