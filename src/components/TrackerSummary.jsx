import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router-dom';

import { Map, withAuth } from 'fireview';
import { db } from '../utils/firebase.config';

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

class TrackerSummary extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      habitToAdd: {}
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    db.collection('habits').get()
      .then(snaps => snaps.forEach(snap => this.setState({ habits: [...this.state.habits, snap.data()] })
    ));
  }

  handleChange(event) {
    event.preventDefault();
    const user = this.props._user;
    const userId = user && user.uid ? user.uid : null;
    this.setState({ habitToAdd : { name: event.target.value, userId: userId } });
  }

  handleAdd(event) {
    event.preventDefault();
    const habitToAdd = this.state.habitToAdd;
    db.collection('habits').add(habitToAdd)
      .then(() => {
        this.setState({ habitToAdd: { name: '' } });
        this.props.history.push(`/tracker/${habitToAdd.name}`);
      });
  }

  // handleDelete(habit) {
  //   console.log('state', this.state.habits)
  //   // db.collection('habits').get()
  //   //   .then(snaps => snaps.forEach(snap => snap.delete()));
  // }

  render() {
    const AllHabits = db.collection('habits');
    const user = this.props._user;
    const userId = user && user.uid ? user.uid : null;
    const Habit = props => {
          const { name } = props;
            return <TableRow><Link to={`/tracker/${name}`}><TableCell>
             {name}</TableCell></Link><TableCell>
            </TableCell></TableRow>;};

    return (
      <Grid container style={{padding: "1vh"}}>
        <Grid item>
        <form onSubmit={this.handleAdd} className={styles.container}> 
        <TextField
          id="name"
          label="Add Tracker?"
          name="habitToAdd"
          className={styles.textField}
          onChange={this.handleChange}
          margin="normal"
          value={this.state.habitToAdd.name}
        />
        <Button type="submit">Add</Button>
        </form>
      </Grid>

      <Table>
      <TableHead>
        <TableRow>
        <TableCell variant="body-2">Habit</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
          <Map from={AllHabits.where('userId', '==', userId)}
          Render={Habit}
          />
        </TableBody>
      </Table>

      </Grid>
      );
  }
}

export default withAuth(TrackerSummary);