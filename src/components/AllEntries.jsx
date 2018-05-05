import React, { Component } from 'react';
import { db, admin } from '../utils/firebase.config.js';
import { convertFromRaw, convertToRaw } from 'draft-js';

export default class AllEntries extends Component {
  constructor(){
    super();
   
  

  }
  componentDidMount(){
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
      </div>
    )
  }
}
