import React, { Component }from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import firebase from 'firebase';
import { auth, provider, db } from '../utils/firebase.config';

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
  gridList: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
  },
  signUp: {
    background: "blue"
  }
});

export default class HomepageForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      signUp: false,
      login: true
    };
    this.handleChange = this.handleChange.bind(this);
    // this.toggleSignUp = this.toggleSignUp.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name] : event.target.value });
  }

  toggleShow() {
    this.setState({ signUp: !this.state.signUp, login: !this.state.login });
  }

  handleSignUp(event) {
    event.preventDefault();
    const { email, password } = this.state;
    auth.createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      return db.collection('users').doc(`${newUser.uid}`).set({ email: email, password: password });
    })
    .catch(err => console.log(err.message));
  }

  handleLogin() {
    const { email, password } = this.state;
    auth.signInWithEmailAndPassword(email, password)
    .catch(err => console.log(err.message));
  }

  render() {
    console.log('state login', this.state.login);
    console.log('state signup', this.state.signUp)
    return (
      <form className={styles.container}>
      <Grid container spacing={24} justify="center"style={styles.gridList}>
        <div>
        <Grid item>
        <Button onClick={this.toggleShow}>New to Mahazay?</Button>
        <Button onClick={this.toggleShow}>Already a User?</Button>
          { this.state.signUp && !this.state.login ? 
            <div>
              <div>
                <TextField
                id="emailInput"
                label="Email"
                onChange={this.handleChange}
                name="email"
                placeholder="Enter Email"
                margin="normal"
                />
            </div>
            <div>
                <TextField
                id="name"
                label="Password"
                onChange={this.handleChange}
                name="password"
                placeholder="Enter Password"
                margin="normal"
                />
              </div> 
              <Button href="/dashboard" onClick={this.handleSignUp}>
                Sign Up
              </Button>
            </div> 
            :
            this.state.login && !this.state.signUp ?
            <div>
            <div>
              <TextField
              id="emailInput"
              label="Email"
              onChange={this.handleChange}
              name="email"
              placeholder="Enter Email"
              margin="normal"
              />
          </div>
          <div>
              <TextField
              id="name"
              label="Password"
              onChange={this.handleChange}
              name="password"
              placeholder="Enter Password"
              margin="normal"
              />
            </div> 
            <Button href="/dashboard" onClick={this.handleLogin}>
             Login
            </Button>
          </div>
          : null}
          </Grid> 
        </div>
        </Grid>
      </form>
    );
  }
}