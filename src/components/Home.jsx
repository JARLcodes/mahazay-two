import React, { Component }from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import firebase, { auth, provider } from '../utils/firebase.config'

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
	}
});

export default class HomepageForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      showLogin: false,
      showSignUp: false,
      newUser: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginForm = this.handleLoginForm.bind(this);
    this.handleSignUpForm = this.handleSignUpForm.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  
  handleChange(event) {
    this.setState({ [event.target.name ] : event.target.value });
  }

  handleLoginForm() {
    this.setState({ showLogin: !this.state.showLogin });
  }

  handleSignUpForm() {
    this.setState({ showSignUp: !this.state.showSignUp });
  }
  
  handleSignUp() {
    const { email, password } = this.state;
    auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUser = res.newUser;
      this.setState({ newUser });
    })
    .catch(err => console.log(err.message));
  }

  handleLogin() {
    const { email, password } = this.state;
    auth.signInWithEmailAndPassword(email, password)
    .catch(err => console.log(err.message));
  }

  render() {
    console.log('signup', this.handleSignUp)
    console.log('state', this.state.email)
    return (
      <form className={styles.container}>
      <Grid container spacing={24} justify="center"style={styles.gridList}>
        <div>
        <Button onClick={this.handleSignUpForm}>New to Mahazay?</Button>
          <Grid item>
          { this.state.showSignUp ? 
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
              <Button onClick={this.handleSignUp}>
              Sign Up
              </Button>
            </div> : null }
          </Grid> 
        </div>

        <div>
        <Button onClick={this.handleLoginForm}>Already a Member?</Button>
          <Grid item>
          { this.state.showLogin ? 
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
              <Button onClick={this.handleLogin}>
              Login
              </Button>
            </div> : null }
            </Grid> 
          </div>

        </Grid>
      </form>
    );
  }
}