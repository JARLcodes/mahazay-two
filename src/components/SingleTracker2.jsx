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
      entry: {}
    };
    // this.habitDone = this.habitDone.bind(this);
   
  }

  componentDidMount() {
    this.props.entry.get().then(entryItem => this.setState({entry: entryItem}));
    db.collection('habits').where('userId', '==', this.props.user.uid).get()
      .then(querySnapshot => {
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
        const habitWordArray = habit.data().name.split(' ');
        //according to previous line, completed will be undefined if entryContent does not include one of the habit words. if this is the case, completed needs to be a boolean - false.
        const completed = !!habitWordArray.filter(word => entryContent.includes(word)).length;
        const entryDate = new Date(this.state.entry.data().dateCreated);
        console.log('entry date', new Date(entryDate).toString());
        habit.ref.update({ datesCompleted: [...habit.data().datesCompleted, entryDate] });
      })
   
    }
  }

  handleCheck(e){
    e.persist();
    const { habits } = this.state;
    if (habits.length){
      habits.forEach(habit => {
        const datesCompleted = habit.data().datesCompleted;
        const entryDate = new Date(this.state.entry.data().dateCreated);
        if (datesCompleted.includes(entryDate)) datesCompleted.filter(date => date !== entryDate);
        else if (!datesCompleted.includes(entryDate)) datesCompleted.push(entryDate);
        if (e.target.name === habit.data().name) habit.ref.update({ datesCompleted: datesCompleted });
      })
    }
  }

 

  render() {
    
    const AllHabits = db.collection('habits').where('userId', '==', this.props.user.uid);
    const Habit = props => {
      if (Object.keys(props).length) {
      const { name, datesCompleted } = props;
      let entryDate = Object.values(this.state.entry).length ? new Date(this.state.entry.data().dateCreated) : '';
      console.log('dates completed', datesCompleted, 'entry date', entryDate);
      let isChecked = datesCompleted.includes(entryDate) ? true : false;
      
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
