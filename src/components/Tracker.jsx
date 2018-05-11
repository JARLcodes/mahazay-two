import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper';

import * as firebase from 'firebase';
import { Map, withAuth } from 'fireview';
import { db } from '../utils/firebase.config';
import { getRootRef } from '../utils/componentUtils';
import AddBox from '@material-ui/icons/AddBox';
import Done from '@material-ui/icons/Done'

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
    minWidth: 500
  }
});

export default class Tracker extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      habitToAdd: {}
    };
    this.handleAddHabit = this.handleAddHabit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    console.log('its a thing', this.state.habits)
    db.collection('habits').get()
      .then(snaps => snaps.forEach(snap => this.setState({ habits: [...this.state.habits, snap.data() ]})))
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ habitToAdd : {name: event.target.value, checked: false }});
  }

  handleAddHabit() {
    const habitToAdd = this.state.habitToAdd;
    db.collection('habits').add(habitToAdd);
  }

  handleCheck(event) {
    event.preventDefault();
    const query = db.collection('habits').where('name', '==', event.target.name);
    const habits = this.state.habits;
    query.get()
    .then(snap => snap.forEach(habit => {
      const checkedHabit = habits.filter(targetHabit => targetHabit.name === habit.data().name);
      db.collection('habits').doc(habit.id).update({checked: !habit.data().checked})
    }));
  }

  render() {
  const AllHabits = db.collection('habits');
  const Habit = props => {
    const { name } = props;
    return <TableRow><TableCell>{props.name}</TableCell><TableCell>
    <Checkbox
      onClick={this.handleCheck}
      name={name}
      label="Simple with controlled value"
      />
    </TableCell></TableRow>;};

    return (
    <Paper>
      <form className={styles.container}> 
      <TextField
        id="name"
        label="placeholder"
        name="habitToAdd"
        className={styles.textField}
        onChange={this.handleChange}
        margin="normal"
      />
      <Button onClick={this.handleAddHabit}>Add</Button>
      </form>
    <Table>
      <TableHead>
    <TableRow>
    <TableCell>Habit</TableCell>
    </TableRow>
      </TableHead>
        <TableBody>
          <Map from={AllHabits}
          Render={Habit}
          />
        </TableBody>
      </Table>
    </Paper>
    );
  }
}

