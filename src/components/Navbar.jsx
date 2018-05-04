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
                <AppBar position="static" className={styles.appbar}>
                    <Toolbar className={styles.toolbar}>
                        <Button color="inherit" className={styles.button}>
                            <ArrowBack />
                            Back
                        </Button>
                        <Button href="/">
                            <Typography variant="display4" color="inherit" className="">
                                Mahazay
                            </Typography>
                        </Button>
                        <Button href="/journals" color="inherit" className={styles.button}>
                            <ImportContacts />
                            Journals
                        </Button>
                        <Button href="/entries" color="inherit" className={styles.button}>
                            <LibraryBooks />
                            Entries
                        </Button>
                        <Button href="/tracker" color="inherit" className={styles.button}>
                            <CheckBox />
                            Tracker
                        </Button>
                        <Button href="/insights" color="inherit" className={styles.button}>
                            <Poll />
                            Insights
                        </Button>
                        <Button href="/login" color="inherit" className={styles.logoutButton}>
                            <Person />
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}