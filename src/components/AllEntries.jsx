import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from "material-ui/Button";


import { getRootRef } from '../utils/componentUtils';



export default class AllEntries extends Component {
  constructor(){
    super();
    this.state = {
      rootRef: getRootRef('entries'), 
      docs: []
    };
    this.addEntry = this.addEntry.bind(this);
  }

  componentDidMount(){
    const { rootRef, docs } = this.state;
    rootRef.get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log({ [doc.id]: doc.data() });
          this.setState({docs: [...this.state.docs, {[doc.id] : doc.data() }]})
      })
    })
  }

  addEntry(){
    console.log('adding entry')
  }

  render() {
    const { rootRef, docs } = this.state;
    if (docs.length) console.log('keys', Object.keys(docs));
    return (
      <div>
        
        { docs.map( doc => (
          <Link key={Object.keys(doc)} to={`/entries/${Object.keys(doc)}`}>LINK</Link>
        )
        
        )}
        <Button onClick={this.addEntry}>New Entry</Button>
      </div>
    )
  }
}
