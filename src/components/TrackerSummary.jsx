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
import moment from 'moment';

import { Map, withAuth } from 'fireview';
import { db } from '../utils/firebase.config';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: '30%',
  },
  textField: {
    
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
    this.setState({ habitToAdd : { name: event.target.value, userId: userId, dates: {checked: false, date: ''} }});
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


  render() {
    const AllHabits = db.collection('habits');
    const user = this.props._user;
    const userId = user && user.uid ? user.uid : null;
    const generateWeek = () => {
      let week = [];
      let nextDay;
      let formattedNextDay;
      for (let i = 0; i < 7; i++){
        nextDay = moment().add(i, 'days');
        formattedNextDay = `${nextDay.month() + 1}/${nextDay.date()}`;
        week.push(formattedNextDay);
      }
      return week;
    };
    const week = generateWeek();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const Habit = props => {
          const { name, dates } = props;
          let dateArray = Object.values(dates)
          return (
            <TableRow key={props}>
              <TableCell>
              {name}
              </TableCell>
                { week.map(day => {
                  let isChecked = false, 
                      alreadyChecked = false;
                  if (dates) { 
                    const dateArray = new Date(Object.values(dates)[1]).toString().split(' ');
                    const formattedDate = `${months.indexOf(dateArray[1]) + 1}/${dateArray[2]}`;
                    if(formattedDate == day) isChecked = true;
                    if (dates[0]) alreadyChecked = Object.values(dates)[0];
                  }
                  return <TableCell key={day}><Checkbox day={day} checked={isChecked || alreadyChecked}/></TableCell>
                  }) 
                }
            </TableRow>
          )
        };

    return (
      <Grid container style={{padding: "1vh"}}>
        <Grid item>
        <form onSubmit={this.handleAdd} style={styles.container}> 
        <TextField
          id="name"
          label="Add Tracker?"
          name="habitToAdd"
          style={styles.textField}
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
        <TableCell></TableCell>
        {week.map(day => <TableCell>{day}</TableCell>)}
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

// const formattedDate = `${months.indexOf(dateArray[1]) + 1}/${dateArray[2]}`;
//                     console.log('formatted date', formattedDate);