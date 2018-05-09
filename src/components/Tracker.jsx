import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles, Typography } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Calendar from 'react-calendar';
import moment from 'moment';

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
      date: new Date(),
      habit: '',
      habitTable: [{ habit: '' }]
    };
    this.handleAddHabit = this.handleAddHabit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { habit, habitTable } = this.state;
    this.setState({ [event.target.name]: event.target.value })
  }

  handleAddHabit(event) {
    event.preventDefault();
    this.setState({
      habitTable: this.state.habitTable.concat([{ habit: '' }])
    });
  }

  render() {
    console.log('table state', this.state.habitTable)
    const days = ['Su', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
    const dummy = ['Water', 'Exercise', 'Meditation', 'Reading'];
    return (
      <div>
      <form onSubmit={this.handleSubmit} className={styles.container}> 
        <TextField
        id="name"
        label="placeholder"
        className={styles.textField}
        value={this.state.name}
        onChange={this.handleAddHabit}
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
          <Calendar
            value={this.state.date}
          />
      </div>
    );
  }
}
