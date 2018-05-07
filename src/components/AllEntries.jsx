import React, { Component } from 'react';
<<<<<<< HEAD
import { Link, Redirect } from 'react-router-dom';
import Button from "material-ui/Button";

import { getRootRef } from '../utils/componentUtils';

=======
import { db, admin } from '../utils/firebase.config.js';
import { convertFromRaw, convertToRaw } from 'draft-js';
>>>>>>> e8fc19c39d1ca8fcffddf361527046d4a6f4343d

export default class AllEntries extends Component {
  constructor(){
    super();
<<<<<<< HEAD
    this.state = {
      rootRef: getRootRef('entries'), 
      entries: [], 
      allEntryIds: []
    };
    this.addEntry = this.addEntry.bind(this);
=======
   
  

>>>>>>> e8fc19c39d1ca8fcffddf361527046d4a6f4343d
  }

  componentDidMount(){
<<<<<<< HEAD
    const { rootRef } = this.state;
    rootRef.get()
      .then(querySnapshot => {
        querySnapshot.forEach(entry => this.setState({ entries: [...this.state.entries, {[entry.id] : entry.data() }], allEntryIds: [...this.state.allEntryIds, entry.id]}))
    })
  }

  addEntry(){
    console.log('assigning new entry to journal AND generating new entry id');
    const newEntryId = this.state.allEntryIds.length > 0 ? Number(this.state.allEntryIds[this.state.allEntryIds.length - 1]) + 1 : 1;
    this.props.history.push(`/entries/${newEntryId}`);
  }

  render() {
    const { entries, newEntryId } = this.state;
    return (
      <div>
        { entries.map( entry => (
          <Link key={Object.keys(entry)} to={`/entries/${Object.keys(entry)}`}>LINK</Link>
        )
        )}
        <Button onClick={this.addEntry}>New Entry</Button>
        { newEntryId && <Redirect to={`/entries/${newEntryId}`}/> }
        
=======
  //  console.log('db.collection(entries)', db.collection('entries'))
   //to add to database
  //  db.collection('entries').add({
  //    content: 'blahhhhhh', 
  //    id: 'second entry'
  //  })
  //  .then(docRef => console.log('document written with id: ', docRef.id))
  //  .catch(console.error)
   //to get from database
  //  db.collection('entries').get().then(querySnapshot => {
  //    querySnapshot.forEach(doc => {
  //      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
  //    })
  //  })

  }


  
  render() {
   

    return (
      <div>
        <h1>MAP OVER ENTRIES HERE</h1>
>>>>>>> e8fc19c39d1ca8fcffddf361527046d4a6f4343d
      </div>
    )
  }
}
