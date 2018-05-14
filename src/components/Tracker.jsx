import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper';

import * as firebase from 'firebase';
import { Map, withAuth } from 'fireview';
import { db } from '../utils/firebase.config';
import { getRootRef } from '../utils/componentUtils';
import AddBox from '@material-ui/icons/AddBox';
import Done from '@material-ui/icons/Done';
import Grid from 'material-ui/Grid';


class Tracker extends Component {

  render() {
  return (
  <div>Wheeee</div>
  )
  }
}

export default withAuth(Tracker);