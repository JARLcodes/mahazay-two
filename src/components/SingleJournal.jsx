import React, { Component } from 'react';
import {db} from '../utils/firebase.config'
import Button from "material-ui/Button";

import { getRootRef } from '../utils/componentUtils';

export default class SingleJournal extends Component {
  constructor(props){
    super(props);
    this.addEntry = this.addEntry.bind(this);

  }

  addEntry(){
    getRootRef('entries').add({})
      .then(docRef =>
        this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${docRef.id}`));
  };

  render() {
    let entries = []
    db.collection('entries').where("journalId", "==", this.props.match.params.id ).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          entries.push(doc.data())
        })
      })
    console.log("params",this.props.match.params.id ,"example:", entries)
    return (
      <div>
        hello there :)
        <Button onClick={this.addEntry}>New Entry</Button>
      </div>
    )
  }
}
