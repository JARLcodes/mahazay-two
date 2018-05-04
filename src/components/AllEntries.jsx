import React, { Component } from 'react';
// export const db = firebase.firestore(); defined in src/App.js



export default class AllEntries extends Component {
  constructor(){
    super();
    this.state = {};
  

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
        <h1>here here hereeeee</h1>
      </div>
    )
  }
}
