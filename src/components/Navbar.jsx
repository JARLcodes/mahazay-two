import React, { Component } from 'react';
import { withTheme } from 'material-ui/styles';
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
import ResponsiveMenu from 'react-responsive-navbar';
import { Link } from 'react-router-dom';
import { withAuth } from 'fireview';

import { auth } from '../utils/firebase.config';
import Searchbar from './Searchbar.jsx';

class Navbar extends Component {
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
          <Toolbar style={{ background: "#FAFAFA", display: 'flex', padding: ".3em .3em"}}>
            <Link to="/" style={{textDecoration:"none"}}>
              <img src="https://i.pinimg.com/564x/d6/3b/f1/d63bf1221116ebb6102c77e7e9a74808.jpg" style={{ height: 75, width: 75, paddingRight: "1em" }}/>
            </Link>
            <Link to="/" style={{textDecoration:"none"}}>
              <Typography variant="display1">MA•HĀ•ZAY</Typography>
            </Link>
            <Button href="/journals" color="inherit" style={{color: "#A1887F", padding: "1em 1em"}} disabled={disabled}>
              <ImportContacts />
              Journals
            </Button>
            <Button href="/entries" color="inherit" style={{color: "#82B1FF", padding: "1em 1em"}} disabled={disabled}> 
              <LibraryBooks />
              Entries
            </Button>
            <Button href="/tracker" color="inherit" style={{color: "#EF9A9A", padding: "1em 1em", marginRight: "20%"}} disabled={disabled}>
              <CheckBox />
              Tracker
            </Button>
            { user && <Searchbar style={{justify: 'flexEnd'}} userId={user.uid} history={this.props.history}/> }
            { user ? 
              <Button href="/" color="inherit" style={{color: "#424242"}}
                  onClick={() => auth.signOut()}>
                  <Person />
                  Logout
                </Button>
              : null }
          </Toolbar>
        }
      />
    );
  }
}

export default withTheme()(withAuth(Navbar));