import React, { Component } from 'react';
// import { withStyles, Typography } from 'material-ui/styles';
// import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
// import Moment from 'react-moment';
// import * as moment from 'moment';

// import firebase from 'firebase';
import { db } from '../utils/firebase.config';
import { getRootRef } from '../utils/componentUtils';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700
  }
});

export default class Tracker extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: {},
      habits: [],
      habit: '',
      rootRef: getRootRef('habits')
    };
    this.handleAddHabit = this.handleAddHabit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { rootRef } = this.state;
    rootRef.get()
      .then(snap => {
        snap.data();
      });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAddHabit() {
    db.collection('habits').add({habit: this.state.habit});
    this.setState({ habits: [...this.state.habits, this.state.habit] });
  }

  // handleSubmit() {
    
  // }

  render() {
    console.log('the state of habits', this.state.habits);
    // console.log('just the state of habit', this.state.habit);

    const days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
    const dummy = ['Water', 'Exercise', 'Meditation', 'Reading'];

    return (
      <div>
      <form className={styles.container}> 
        <TextField
        id="name"
        label="placeholder"
        name="habit"
        className={styles.textField}
        onChange={this.handleChange}
        margin="normal"
        />
        <Button onClick={this.handleAddHabit}>
          Add
        </Button>
      </form>
    <Table>
     <TableHead>
      <TableRow>
        <TableCell>Habit</TableCell>
        {days.map(day => <TableCell>{day}</TableCell>)}
      </TableRow>
      </TableHead>
      <TableBody>
        {dummy.map(habit => 
        <TableRow>
          <TableCell>
          {habit}
          </TableCell>
        </TableRow>)}
      </TableBody>
      </Table>
      </div>
    );
  }
}

