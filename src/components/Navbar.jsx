import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Person from '@material-ui/icons/Person';
import CheckBox from '@material-ui/icons/CheckBox';
import Poll from '@material-ui/icons/Poll';
import ImportContacts from '@material-ui/icons/ImportContacts';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Search from '@material-ui/icons/Search';
import ResponsiveMenu from 'react-responsive-navbar';
import { withAuth } from 'fireview';

import { auth } from '../utils/firebase.config';


const styles = {
  root: {
      flexGrow: 1,
      marginBottom: 50
  },
  toolbar: {
      background: "white"
  },
  backButton: {
      color: "#424242", 
      borderRadius: "1em"
  },
  journalButton: {
      color: "#A1887F", 
      borderRadius: "1em"
  },
  entryButton: {
      color: "#82B1FF", 
      borderRadius: "1em"
  },
  trackerButton: {
      color: "#EF9A9A", 
      borderRadius: "1em"
  },
  insightButton: {
      color: "#9FA8DA", 
      borderRadius: "1em"
  },
  logoutButton: {
      color: "#424242", 
      borderRadius: "1em"
  },
  textField: {
      color: '#FAFAFA'
  }
};

class Navbar2 extends Component {
  render() {
    const user = this.props._user;
    const userEmail = user && user.email ? user.email : null;
    const disabled = user ? false : true;

    return (
      <ResponsiveMenu
        menuOpenButton={<div />}
        menuCloseButton={<div />}
        changeMenuOn="500px"
        largeMenuClassName="large-menu-classname"
        smallMenuClassName="small-menu-classname"
        menu={
          <Toolbar>
            <div>
              <Typography variant="display3">
                  Mahazay
              </Typography>
              <Typography variant="subheading"
                          style={{fontStyle:"italic", textTransform:"lowercase"}}>
                  ( ma • hā • zay )
              </Typography>
            </div>
            <Button href="/journals" color="inherit" style={styles.journalButton} disabled={disabled}>
              <ImportContacts />
              Journals
            </Button>
            <Button href="/entries" color="inherit" style={styles.entryButton} disabled={disabled}> 
              <LibraryBooks />
              Entries
            </Button>
            <Button href="/tracker" color="inherit" style={styles.trackerButton} disabled={disabled}>
              <CheckBox />
              Tracker
            </Button>
            <Button href="/insights" color="inherit" style={styles.insightButton} disabled={disabled}>
              <Poll />
              Insights
            </Button>
            <TextField
              id="search"
              type="search"
              style={styles.textField}
              placeholder="Search"
              InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
              }}
            />
          </Toolbar>
        }
      />
    );
  }
}

export default withAuth(Navbar2);