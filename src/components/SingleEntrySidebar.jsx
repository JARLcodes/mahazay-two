import React, { Component } from 'react'

import Button from "material-ui/Button";

import Add from '@material-ui/icons/Add';

import { getRootRef } from '../utils/componentUtils.js';
const styles = {
  addMedia: {
    margin: 20,
    alignSelf: 'center'
  }, 
  delete: {
    alignSelf: 'center', 
    width: '20%'
  }, 
  singleEntrySidebar : {
    display: "flex",
    flexDirection: "column"
  }, 
  select: {
    width: '80%',
    alignSelf: 'center', 
    // marginTop: '1em'
  }, 
  placeholder: {
    color: "#7f7f7f", 
    marginTop: "1em"
  }
}
export default class SingleEntrySidebar extends Component {


  render() {
    return (
      <div style={styles.singleEntrySidebar}>

          <Add style={styles.addMedia}/>
          <Button>Video</Button>
          <Button>Image</Button>
          <Button>Audio</Button>
          <Button variant="raised" color="secondary" style={styles.delete}>Delete Entry</Button>
      </div>
      
    )
  }
}

