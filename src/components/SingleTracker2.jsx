import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { convertFromRaw } from 'draft-js';

import { Map, withAuth } from 'fireview';
import { db } from '../utils/firebase.config';

const styles = {
  grid: {
		maxWidth: 200,
		padding: "2vh 2vh",
    margin: "2vh 2vh",
    border: "dashed",
    borderWidth: ".1vh",
    borderColor: "grey", 
    display: "flex",
    flexDirection: "column",
    position: "sticky"
  }
};

class SingleTracker2 extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      entry: {}, 
      isChecked: false
    };
    this.habitDone = this.habitDone.bind(this);
   
  }

  componentDidMount() {
    this.props.entry.get().then(entryItem => this.setState({entry: entryItem}));
    db.collection('habits').where('userId', '==', this.props.user.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(habit => this.setState({ habits: [...this.state.habits, habit] }))
      })
  }

 
 
  // componentDidUpdate() {
    // then(snap =>  snap.data().dateCreated)
    // db.collection('habits').where('userId', '==', this.props._user.uid).get()
    //   .then(querySnapshot => querySnapshot.forEach(habit => {
    //     if (this.habitDone(habit.data().name)) return this.props.entry.get()
    //     else return 
    //   })
    //   .then(querySnap => )
      // .then(entryDate => {
      //   //if the habit was completed on the entry date, then set checked to true
      //   if (new Date(new Date().setHours(0,0,0,0)) == entryDate) this.setState({ isChecked: true });
      //   habit.ref.update({dates: {checked: isChecked, date: entryDate}})
      // })
      // .catch(console.error('you made a booboo, component did update in single tracker'))
  //}

  //for user to manually toggle checkbox
  handleCheck(e){
    e.persist();
    db.collection('habits').where('userId', '==', this.props.user.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(habit => {
          if (habit.data().name === e.target.name) {
            console.log('obj.values', Object.values(habit.data().dates)[0])
            let isChecked = Object.values(habit.data().dates)[0];
            let dateCompleted = isChecked ? new Date().setHours(0,0,0,0) : '';
            habit.ref.update({ dateCompleted: { checked: isChecked, date: dateCompleted }}) //this should leave dates.date untouched
          }
        })
      })
  }

  habitDone(habitName) {
    let theEntry = this.state.entry;
    if (Object.keys(this.state.entry).length && habitName) {
      let entryContent = convertFromRaw(theEntry.data().content).getPlainText().toLowerCase();
      return entryContent.includes(habitName.toLowerCase());
    }
  }

  render() {
    
    // const AllHabits = db.collection('habits').where('userId', '==', this.props._user.uid);
    const AllHabits = db.collection('habits');
    const Habit = props => {
      if (Object.keys(props).length) {
      const { name, dates } = props;
      // let entryDate = this.state.entry.data().dateCreated;
      // console.log('entry date', entryDate, new Date().setHours(0,0,0,0));
      //let isChecked = Object.values(dates)[0];
      let isChecked = false;
      return <div> 
        {name}
        <Checkbox
          onClick={this.handleCheck.bind(this)}
          name={name}
          checked={isChecked}
        />
        </div>;
      } else {
        return <div></div>
      }
    };

    return (
      <Grid style={styles.grid}>
      <Typography variant="subheading" component="h2">Tracker</Typography>
          <Map from={AllHabits}
          Render={Habit}
          />
      </Grid>
    );
  }
}

export default SingleTracker2;