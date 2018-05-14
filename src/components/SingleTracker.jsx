import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Checkbox from 'material-ui/Checkbox';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

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
      checked: [],
    };
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    db.collection('habits').get()
      .then(snaps => snaps.forEach(snap => this.setState({ habits: [...this.state.habits, snap.data()] })
    ));
  }

  handleCheck(id) {
    console.log('thisstate', this.state.habits);
    console.log('this is the checked array', this.state.checked)
    const checkedTrackers = this.state.checked;
    this.setState({ checked: this.state.checked.concat(`${id}`)})
    db.collection('habits').doc(`${id}`).set({ habits: {dates: new Date()}, checked: true });
    
    // db.collection('habits').get()
    //   .then(snapshot => snapshot.forEach(doc => {
    //     if (checkedTracker) this.setState({checked: this.state.checked.filter(x => x !== doc.id)});
    //     else (this.setState({checked: [...this.state.checked, doc.id]}));
    //   console.log('the state of the snaps', checkedTracker, this.state.checked)
    //     db.collection('habits').doc(doc.id)
    //       .update({ dates: [ new Date() ] });
    //   })
    // );
  }

  render() {
    const AllHabits = db.collection('habits');
    const habitChecked = this.state.checked;
    console.log('habit chekced', habitChecked)

    const Habit = props => {
      const { name } = props;
      const checkedArray = this.state.checked;
      return <div> 
        {name}
        <Checkbox
        onClick={this.handleCheck}
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