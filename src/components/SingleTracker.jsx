import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { Map, withAuth } from 'fireview';
import { db } from '../utils/firebase.config';

import { TrackerSummary } from './index';

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
    // this.state = {
    //   checked: false,
    // };
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    const user = this.props && this.props._user ? this.props._user : null;
    db.collection('habits').get();
    // const user = this.props._user;
  }

  async handleCheck(event) {
    event.preventDefault();
    event.persist()
    const user = this.props._user;
    const userId = user && user.uid ? user.uid : null;
    const userHabits = await db.collection('habits').where("userId", '==', user.uid).get()
      .then(snapshot => snapshot.forEach(snap => console.log('woooeoeo', snap)));
      console.log('event', event.target)
    // console.log('user habits', userHabits)
    // userHabits.doc().set({ dates: [ new Date() ] }, { merge: true });
    // this.setState({checked: !this.state.checked})
  }

  render() {
    const AllHabits = db.collection('habits');
    const Habit = props => {
      const { name } = props;
      return <Grid container>
        <Grid item>
        <Typography content="p">{name}
          <Checkbox 
          onClick={this.handleCheck}
          />
        </Typography>
        </Grid>
      </Grid>;
    };

    console.log('the props or something', this.state)
    return (
      <Grid style={styles.grid}>
      <Typography variant="subheading" component="h2">Your Daily Tracker</Typography>
          <Map from={AllHabits}
          Render={Habit}
          />
      </Grid>
    );
  }
}

export default withAuth(SingleTracker);