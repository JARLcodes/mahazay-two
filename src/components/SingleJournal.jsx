import React, { Component } from 'react';
import {db} from '../utils/firebase.config'





export default class SingleJournal extends Component {
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
      </div>
    )
  }
}
