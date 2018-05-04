import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Person from '@material-ui/icons/Person';
import CheckBox from '@material-ui/icons/CheckBox';
import Poll from '@material-ui/icons/Poll';
import ImportContacts from '@material-ui/icons/ImportContacts';
import LibraryBooks from '@material-ui/icons/LibraryBooks';


const styles = {
  root: {
    flexGrow: 1,
  },
//   appbar: {
      
//   },
//   toolbar: {

//   },
//   button: {

//   },
//   logoutButton: {

//   }
};

export default class Navbar extends Component {
    
    render () {
        return (
            <div className={styles.root}>
                <AppBar position="static" style={styles.appbar}>
                    <Toolbar style={styles.toolbar}>
                        <Button color="inherit" style={styles.button}>
                            <ArrowBack />
                            Back
                        </Button>
                        <Button href="/">
                            <Typography variant="display4" color="inherit">
                                Mahazay
                            </Typography>
                        </Button>
                        <Button href="/journals" color="inherit" style={styles.button}>
                            <ImportContacts />
                            Journals
                        </Button>
                        <Button href="/entries" color="inherit" style={styles.button}>
                            <LibraryBooks />
                            Entries
                        </Button>
                        <Button href="/tracker" color="inherit" style={styles.button}>
                            <CheckBox />
                            Tracker
                        </Button>
                        <Button href="/insights" color="inherit" style={styles.button}>
                            <Poll />
                            Insights
                        </Button>
                        <Button href="/login" color="inherit" style={styles.logoutButton}>
                            <Person />
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}