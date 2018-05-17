import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';
import { withTheme } from 'material-ui/styles';
import { Map, withAuth } from 'fireview';
import { db } from '../utils/firebase.config';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import Typography from 'material-ui/Typography';

class SingleTracker extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      entry: {}
    };
  }

  componentDidMount() {
    this.props.entry.get().then(entryItem => this.setState({entry: entryItem}));
    db.collection('habits').where('userId', '==', this.props.user.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(habit => this.setState({ habits: [...this.state.habits, habit] }));
    });
  }

  componentDidUpdate() {
    const { habits } = this.state;
    if (habits.length && this.state.entry.data().content){
      habits.forEach(habit => {
        const entryContent = convertFromRaw(this.state.entry.data().content).getPlainText().toLowerCase();
        const habitWordArray = habit.data().name.split(' ');
        const completed = !!habitWordArray.filter(word => entryContent.includes(word.toLowerCase())).length;
        const entryDate = completed ? this.state.entry.data().dateCreated : '';
        //to toggle: if datesCompleted includes entryDate and completed is false, then remove it
        if (!completed && entryDate) {
          let datesCompletedArr = [];
          habit.data().datesCompleted.forEach(date => datesCompletedArr.push(date));
          // let updatedDatesCompleted = [];
          let updatedDatesCompleted = datesCompletedArr.filter(date => date - entryDate !== 0);
          habit.ref.update({ datesCompleted: updatedDatesCompleted });
        }
        //if datesCompleted does not include entryDate and completed is true, then add it
        else {
          if (entryDate) {
            habit.ref.update({ datesCompleted: [...habit.data().datesCompleted, entryDate]});
          }
        }
      });
    }
  }

  handleCheck(event){
    event.persist();
    const { habits } = this.state;
    if (habits.length){
      habits.forEach(habit => {
        if (Object.values(this.state.entry.data()).length) {
          let entryDate = this.state.entry.data().dateCreated;
          //to toggle: if datesCompleted includes entryDate, then take it out
          if (habit.data().datesCompleted.includes(entryDate)){
            let datesCompleted = [];
            habit.data().datesCompleted.forEach(date => datesCompleted.push(date));
            let updatedDatesCompleted = datesCompleted.filter(date => date - entryDate !== 0);
            if (event.target.name === habit.data().name) habit.ref.update({ datesCompleted: updatedDatesCompleted });
          }
          //if datesCompleted does not include entryDate, then add it
          else if (event.target.name === habit.data().name) habit.ref.update({ datesCompleted: [...habit.data().datesCompleted, entryDate] });
          }
      });
    }
  }

  render() {
    const AllHabits = db.collection('habits').where('userId', '==', this.props.user.uid);
    const Habit = props => {
      if (Object.keys(props).length) {
      const { name, datesCompleted } = props;
      const datesCompletedArr = [];
      datesCompleted.forEach(date => datesCompletedArr.push(date));
      let entryDate = Object.values(this.state.entry).length ? this.state.entry.data().dateCreated : '';
      let isChecked = datesCompletedArr.includes(entryDate);

      return <div style={{display: 'flex', borderLeft: "2em"}}>
        <Checkbox
          onClick={this.handleCheck.bind(this)}
          name={name}
          checked={isChecked}
        />
        <Typography style={{justify: 'flexStart', paddingTop: '1em'}}>{name}</Typography>
        </div>;
      } else {
        return <div></div>;
      }
    };

    return (
      <Grid style={{maxWidth: 200, border: "1px dotted #454545", borderWidth: ".1vh", borderColor: "grey", display: "flex", flexDirection: "column", position: "sticky", borderRadius: "0.5em"}}>
        <Typography variant="subheading" style={{textTransform: "uppercase"}}>Your Habits</Typography>
          <Map from={AllHabits}
          Render={Habit}
        />
      </Grid>
    );
  }
}

export default withTheme()(SingleTracker);
