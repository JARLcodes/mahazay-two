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
import Paper from 'material-ui/Paper';
import { Map, withAuth } from 'fireview';
import { db } from '../utils/firebase.config';

import { TrackerSummary } from './index';

class SingleTracker extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  componentDidMount() {
    const user = this.props && this.props._user ? this.props._user : null;
    db.collection('habits').get();
    // const user = this.props._user;
  }

  handleCheck(event) {
    event.preventDefault();
  }

  render() {
    const UserHabits = db.collection('habits');
    const Habit = props => {
      const { name } = props;
      return <Grid container><Grid item>{name}</Grid>
      <Checkbox 
      checked={this.state.checked}/>
      </Grid>
    }
    console.log('the props or something', this.props)
    return (
      <Map from={UserHabits}
      Render={Habit}
      />
    )
  }
}

export default withAuth(SingleTracker);