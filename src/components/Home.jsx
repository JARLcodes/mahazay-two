import React, { Component }from 'react';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

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
      showSignUp: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  
  handleChange(event) {
    this.setState({ [event.target.name ] : event.target.value });
  }

  handleLoginClick() {
    this.setState({ showLogin: !this.state.showLogin });
  }

  handleSignUp() {
    this.setState({ showSignUp: !this.state.showSignUp });
  }

  render() {
    return (
      <form className={styles.container}>
      <Grid container spacing={24} justify="center"style={styles.gridList}>
        <div>
        <Button onClick={this.handleSignUp}>New to Mahazay?</Button>
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
            </div> : null }
          </Grid> 
        </div>

        <div>
        <Button onClick={this.handleLoginClick}>Already a Member?</Button>
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
            </div> : null }
            </Grid> 
          </div>

        </Grid>
      </form>
    );
  }
}