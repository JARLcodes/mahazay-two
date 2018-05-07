import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from "material-ui/Button";

import { getRootRef } from '../utils/componentUtils';


export default class AllEntries extends Component {
  constructor(){
    super();
    this.state = {
      rootRef: getRootRef('entries'), 
      entries: [], 
      allEntryIds: []
    };
    this.addEntry = this.addEntry.bind(this);
  }

  componentDidMount(){
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
    const { rootRef, docs, newEntryId } = this.state;
    return (
      <div>
        { docs.map( doc => (
          <Link key={Object.keys(doc)} to={`/entries/${Object.keys(doc)}`}>LINK</Link>
        )
        )}
        <Button onClick={this.addEntry}>New Entry</Button>
        { newEntryId && <Redirect to={`/entries/${newEntryId}`}/> }
        
      </div>
    )
  }
}
