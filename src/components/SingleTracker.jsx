import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { convertFromRaw } from 'draft-js';
import { withTheme } from 'material-ui/styles';

import { Map, withAuth } from 'fireview';
import { db } from '../utils/firebase.config';

const styles = theme => ({
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
});

class SingleTracker extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      entry: {}
    };
    this.habitDone = this.habitDone.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    db.collection('habits').get()
      .then(snaps => snaps.forEach(snap => this.setState({ habits: [...this.state.habits, snap.data()] })
    ));
    this.props.entry.get().then(entryItem => this.setState({entry: entryItem}));
  }

  componentDidUpdate() {
    db.collection('habits').get()
    .then(querySnapshot => querySnapshot.forEach(habit => {
      if (this.habitDone(habit.data().name)) 
      {
        this.props.entry.get().then(snap =>  {
          return snap.data().dateCreated;
        })
        .then(entryDate => {
          let isChecked = false;
          //if the habit was completed on the entry date, then set checked to true
          if (new Date().setHours(0,0,0,0) == entryDate) isChecked = true;
          habit.ref.update({ dates: {checked: isChecked, date: entryDate} });
        });
        }
      }));
  }

  handleCheck(e){
    console.log('e.target.name', e.target.name, 'user id on props?', this.props);
    db.collection('habits').where('userId', '==', this.props._user.uid).get()
      .then(querySnapshot => {
        querySnapshot.forEach(habit => {
          
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
    const AllHabits = db.collection('habits');

    const Habit = props => {
      if (Object.keys(props).length) {
      const { name, dates } = props;
      let isChecked = Object.values(dates)[0];
      console.log('the is checked', isChecked)
  
      return <div> 
        {name}
        <Checkbox
        onClick={this.handleCheck}
        name={name}
        checked={isChecked}
        />
        </div>;
      } else {
        return <div></div>;
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

export default withTheme()(withAuth(SingleTracker));