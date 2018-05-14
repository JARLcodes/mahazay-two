import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Person from '@material-ui/icons/Person';
import CheckBox from '@material-ui/icons/CheckBox';
import Poll from '@material-ui/icons/Poll';
import ImportContacts from '@material-ui/icons/ImportContacts';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import Search from '@material-ui/icons/Search';
// import firebase from 'firebase';
import { auth } from '../utils/firebase.config';
import { withAuth } from 'fireview';

const styles = {
    root: {
        flexGrow: 1,
        marginBottom: 50,
    },
    toolbar: {
        background: "white"
    },
    journalButton: {
        color: "#A1887F",
<<<<<<< HEAD
    },
    entryButton: {
        color: "#82B1FF",
    },
    trackerButton: {
        color: "#EF9A9A",
    },
    insightButton: {
        color: "#9FA8DA",
    },
    logoutButton: {
        color: "#424242",
    },
    textField: {
        color: '#FAFAFA',
=======
        fontFamily: 'Merienda One'
    },
    entryButton: {
        color: "#82B1FF",
        fontFamily: 'Merienda One'
    },
    trackerButton: {
        color: "#EF9A9A",
        fontFamily: 'Merienda One'
    },
    insightButton: {
        color: "#9FA8DA",
        fontFamily: 'Merienda One'
    },
    logoutButton: {
        color: "#424242",
        fontFamily: 'Merienda One'
    },
    textField: {
        color: '#FAFAFA',
        fontFamily: 'Merienda One'
>>>>>>> master
    },
    image: {
        width: 75,
        height: 75
    }
};

export class Navbar extends Component {
    render () {
        const user = this.props._user;
        const userEmail = user && user.email ? user.email : null;
        const disabled = user ? false : true;
        return (
            <div>
                <AppBar position="static" style={styles.root}>
                    <Toolbar style={styles.toolbar}>
                        <Button href="/">
                            <div>
                                <img src="https://i.pinimg.com/564x/d6/3b/f1/d63bf1221116ebb6102c77e7e9a74808.jpg" style={styles.image}/>
                                <Typography variant="subheading"
<<<<<<< HEAD
                                            style={{color: '#cc8c04', textTransform:"lowercase", fontFamily: 'Merienda One'}}>
=======
                                            style={{color: '#FFAB00', textTransform:"lowercase", fontFamily: 'Merienda One'}}>
>>>>>>> master
                                    ( ma • hā • zay )
                                </Typography>
                            </div>
                        </Button>
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
                                    <InputAdornment position="start" style={{fontFamily: 'Merienda One'}}>
                                        <Search style={{fontFamily: 'Merienda One'}}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        { user ?
                        <Button href="/" color="inherit" style={styles.logoutButton}
                            onClick={() => auth.signOut()}>
                            <Person />
                            Logout
                        </Button>
                        : null }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withAuth(Navbar);