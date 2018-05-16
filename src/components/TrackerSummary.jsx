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


import { Map, withAuth } from 'fireview';
import { db } from '../utils/firebase.config';
import { generateWeek, months } from '../utils/trackerSummaryUtils';

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
  }, 
  check: {
    color: 'green', 
    alignSelf: 'center', 
  }, 
  x: {
    color: 'red', 
    alignSelf: 'center'
  }
});

class TrackerSummary extends Component {
  constructor() {
    super();
    this.state = {
      habits: [],
      habitToAdd: {}, 
      weeksAgo: 0, 
      week: generateWeek(0)
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getWeek = this.getWeek.bind(this);
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
    this.setState({ habitToAdd : { name: event.target.value, userId: userId, datesCompleted: [] }});
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

  resetToThisWeek(){
    this.setState({ weeksAgo: 0 })
  }

  getWeeksAgo(){
    console.log('this.state.weeksAgo before decrement', this.state.weeksAgo);
    this.setState({ weeksAgo: this.state.weeksAgo++ });
    console.log('this.state.weeksAgo after increment', this.state.weeksAgo);
    this.setState({ week: this.getWeek() })
  }

  getWeek(){
    return generateWeek(this.state.weeksAgo);
  }

  render() {
    const AllHabits = db.collection('habits');
    const user = this.props._user;
    const userId = user && user.uid ? user.uid : null;
    const { week } = this.state;

    const Habit = props => {
      const { name, datesCompleted } = props;
      return (
        <TableRow key={props}>
          <TableCell>
          {name}
          </TableCell>
            { week.map(day => {
             
              if (props){
                const datesCompletedArr = [];
                datesCompleted.forEach(date => datesCompletedArr.push(new Date(date).toString().split(' ')));
                const formattedDatesCompleted = datesCompletedArr.map(date => `${date[0]} ${months.indexOf(date[1]) + 1}/${date[2]}`);
                let isChecked = false;
                const datesMatch = day => {
                  for (let i = 0; i < formattedDatesCompleted.length; i++){
                    if (formattedDatesCompleted[i] === day) return true;
                  }
                  return false;
                }
                if (datesMatch(day)) {
                  console.log('days match!', day);
                  return <TableCell key={day}><b style={{color: 'green'}}>Y</b></TableCell>
                }
                else if (!datesMatch(day)) return <TableCell key={day}><b style={{ color: 'red' }}>X</b></TableCell>
              }
              
              
              
              }) 
            }
        </TableRow>
      )
    };
    


    return (
      <Grid container style={{marginLeft: "5%", paddingRight: "15%", marginBottom: "5%", display: 'flex', flexDirection: "column"}}>
        <Grid item>
        <form onSubmit={this.handleAdd} style={{ alignSelf: "center" }}> 
        <TextField
          id="name"
          label="Add Habit?"
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
        <TableCell><Button onClick={this.getWeeksAgo.bind(this)}>Previous Week</Button></TableCell>
        <TableCell><Button onClick={this.resetToThisWeek.bind(this)}>This Week</Button></TableCell>
        <TableCell variant="body-2">Habits</TableCell>
        </TableRow>
      </TableHead>
        <TableBody>
        <TableCell></TableCell>
        {week.map(day => <TableCell key={day}><b>{day}</b></TableCell>)}
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