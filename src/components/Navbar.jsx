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

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 50
  },
//   toolbar: {

//   },
//   button: {

//   },
//   logoutButton: {

//   },
    textField: {
        color: '#FAFAFA'
    }
};

export default class Navbar extends Component {
    
    render () {
        return (
            <div>
                <AppBar position="static" style={styles.root}>
                    <Toolbar style={styles.toolbar}>
                        <Button color="inherit" style={styles.button}>
                            <ArrowBack />
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