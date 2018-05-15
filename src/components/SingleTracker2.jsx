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
<<<<<<< HEAD
      entry: {}, 
      isChecked: false
    };
    this.habitDone = this.habitDone.bind(this);
=======
      entry: {}
    };
    // this.habitDone = this.habitDone.bind(this);
>>>>>>> 882103c0c75b9e33d8442733c85b99f835e7338b
   
  }

  componentDidMount() {
    this.props.entry.get().then(entryItem => this.setState({entry: entryItem}));
    db.collection('habits').where('userId', '==', this.props.user.uid).get()
      .then(querySnapshot => {
<<<<<<< HEAD
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
            habit.ref.update({ dates: { checked: isChecked, date: dateCompleted }}) //this should leave dates.date untouched
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
      let isChecked = Object.values(dates)[0];
=======
        querySnapshot.forEach(habit => { 
          console.log('habit being added to state', habit);
          this.setState({ habits: [...this.state.habits, habit] })
      })
    })
  }

  componentWillReceiveProps(nextProps){
    const { habits } = this.state;
    if (nextProps !== this.props && habits.length){
      console.log('nextprops', nextProps, this.state);
      
      console.log('habits in will receive props', habits);
      // if (habits.length){
        habits.forEach(habit => {
          const entryContent = convertFromRaw(this.state.entry.data().content).getPlainText().toLowerCase();
          console.log('entrycontent', entryContent);
          const habitWordArray = habit.data().name.split(' ');
          //according to previous line, completed will be undefined if entryContent does not include one of the habit words. if this is the case, completed needs to be a boolean - false.
          const completed = !!habitWordArray.filter(word => entryContent.includes(word)).length;
          const entryDate = this.state.entry.data().dateCreated;
          habit.ref.update({ dateCompleted: entryDate, completed: completed });
        })
      // }
    }
   
  }

  componentDidUpdate(){
    const { habits } = this.state;
    if (habits.length){
      habits.forEach(habit => {
        const entryContent = convertFromRaw(this.state.entry.data().content).getPlainText().toLowerCase();
        console.log('entrycontent', entryContent);
        const habitWordArray = habit.data().name.split(' ');
        //according to previous line, completed will be undefined if entryContent does not include one of the habit words. if this is the case, completed needs to be a boolean - false.
        const completed = !!habitWordArray.filter(word => entryContent.includes(word)).length;
        const entryDate = this.state.entry.data().dateCreated;
        habit.ref.update({ dateCompleted: entryDate, completed: completed });
      })
   
    }
  }

  handleCheck(e){
    e.persist();
    const { habits } = this.state;
    if (habits.length){
      habits.forEach(habit => {
        const isCompleted = habit.data().completed;
        if (e.target.name === habit.data().name) habit.ref.update({ completed: !isCompleted });
      })
    }
  }

 

  render() {
    
    const AllHabits = db.collection('habits').where('userId', '==', this.props.user.uid);
    const Habit = props => {
      if (Object.keys(props).length) {
      const { name, dateCompleted, completed } = props;
      let entryDate = Object.values(this.state.entry).length ? this.state.entry.data().dateCreated : '';
      let isChecked = entryDate === dateCompleted ? completed : false;
>>>>>>> 882103c0c75b9e33d8442733c85b99f835e7338b
      
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

<<<<<<< HEAD
export default SingleTracker2;
=======
export default SingleTracker2;
>>>>>>> 882103c0c75b9e33d8442733c85b99f835e7338b
