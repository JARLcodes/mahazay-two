// import React, { Component } from 'react';
// import TextField from 'material-ui/TextField';
// import Button from 'material-ui/Button';
// import Table, {
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow
// } from 'material-ui/Table';
// import Checkbox from 'material-ui/Checkbox'
// import Paper from 'material-ui/Paper';

// import * as firebase from 'firebase';
// import { Map, withAuth } from 'fireview';
// import { db } from '../utils/firebase.config';
// import { getRootRef } from '../utils/componentUtils';
// import AddBox from '@material-ui/icons/AddBox';
// import Done from '@material-ui/icons/Done';
// import Grid from 'material-ui/Grid';

// const styles = theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//     width: 200,
//   },
//   menu: {
//     width: 200,
//   },
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 500
//   }
// });

// class Tracker extends Component {
//   constructor() {
//     super();
//     this.state = {
//       habits: [],
//       habitToAdd: {}
//     };
//     this.handleAddHabit = this.handleAddHabit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleCheck = this.handleCheck.bind(this);
//   }

//   componentDidMount() {
//     db.collection('habits').get()
//       .then(snaps => snaps.forEach(snap => this.setState({ habits: [...this.state.habits, snap.data()] })
//     ));
//   }

//   handleChange(event) {
//     event.preventDefault();
//     const user = this.props._user;
//     const userId = user && user.uid ? user.uid : null;
//     this.setState({ habitToAdd : {name: event.target.value, checked: false, userId: userId }});
//   }

//   handleAddHabit() {
//     const habitToAdd = this.state.habitToAdd;
//     db.collection('habits').add(habitToAdd);
//   }

//   handleCheck(event) {
//     event.preventDefault();
//     const query = db.collection('habits').where('name', '==', event.target.name);
//     const habits = this.state.habits;
//     query.get()
//     .then(snap => snap.forEach(habit => { 
//       habits.filter(targetHabit => targetHabit.name === habit.data().name);
//       db.collection('habits').doc(habit.id).update({checked: !habit.data().checked});
//     }));
//   }

//   render() {
//     const AllHabits = db.collection('habits');
//     const user = this.props._user;
//     const userId = user && user.uid ? user.uid : null;

//     const Habit = props => {
//     const { name } = props;
//       return <TableRow><TableCell variant="subheading">{props.name}</TableCell><TableCell>
//       <Checkbox
//         onClick={this.handleCheck}
//         name={name}
//         label="Simple with controlled value"
//         checked={props.checked}
//         />
//       </TableCell></TableRow>;};

//     return (
//     <Grid container justify="left" style={{padding: "1vh"}}>
//       <Grid item>
//       <form style={{alignContent: ""}} className={styles.container}> 
//       <TextField
//         id="name"
//         label="Add Tracker?"
//         name="habitToAdd"
//         className={styles.textField}
//         onChange={this.handleChange}
//         margin="normal"
//       />
//       <Button onClick={this.handleAddHabit}>Add</Button>
//       </form>
//       </Grid>
//     <Table>
//       <TableHead>
//     <TableRow>
//     <TableCell variant="body-2">Habit</TableCell>
//     </TableRow>
//       </TableHead>
//         <TableBody>
//           <Map from={AllHabits.where('userId', '==', userId)}
//           Render={Habit}
//           />
//         </TableBody>
//       </Table>
//     </Grid>
//     );
//   }
// }

// export default withAuth(Tracker);