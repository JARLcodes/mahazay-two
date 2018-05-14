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

class SingleTracker extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      entry: {}
    };
    this.habitDone = this.habitDone.bind(this);
  }

  componentDidMount() {
    db.collection('habits').get()
      .then(snaps => snaps.forEach(snap => this.setState({ habits: [...this.state.habits, snap.data()] })
    ))
    this.props.entry.get().then(entry => console.log('the state of entry', entry.data()))
  }

  // handleCheck(event, id) {
  //   event.preventDefault();
  //   console.log('thisstate', this.state.habits);
  //   const habitsArr = this.state.habits;
  //   console.log('this is the event', event.target.checked)
  //   this.setState({ [event.target.name] : event.target.checked})
  //   // this.setState({ checked: this.state.checked.concat(`${id}`)});
  //   habitsArr.map(habit => {
  //     if (habit.name === event.target.name) this.setState({ checked: !this.state.checked })
  //   });
    // db.collection('habits').doc(`${id}`).update({ habits: {dates: new Date()}, checked: true });
    
    // db.collection('habits').get()
    //   .then(snapshot => snapshot.forEach(doc => {
    //     if (checkedTracker) this.setState({checked: this.state.checked.filter(x => x !== doc.id)});
    //     else (this.setState({checked: [...this.state.checked, doc.id]}));
    //   console.log('the state of the snaps', checkedTracker, this.state.checked)
    //     db.collection('habits').doc(doc.id)
    //       .update({ dates: [ new Date() ] });
    //   })
    // );
  // }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) db.collection('habits').get()
      .then(querySnapshot => querySnapshot.forEach(habit => {
        if (this.habitDone(habit.data().name)) habit.update({checked: true})
      }));
  }

  habitDone(habitName) {
    console.log('the entry state', this.state.entry)
    return false;
    // return convertFromRaw(this.state.entry.data().content).getPlainText().includes(habitName);
  }

  render() {
    const AllHabits = db.collection('habits');
    const habitChecked = this.state.checked;

    const Habit = props => {
      const { name, checked } = props;
      return <div> 
        {name}
        <Checkbox
        onClick={this.handleCheck}
        name={name}
        checked={checked}
        />
        </div>
    }

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

export default withAuth(SingleTracker);