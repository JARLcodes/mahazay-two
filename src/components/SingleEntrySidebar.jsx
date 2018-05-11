'use strict';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from "material-ui/Button";
import Add from '@material-ui/icons/Add';
import Upload from 'material-ui-upload/Upload';
import { withAuth } from 'fireview';


import { storage } from '../utils/firebase.config';


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
  addVideo: {
    display: "flex", 
    flexDirection: "column", 
    marginLeft: "10%"
  }
}
class SingleEntrySidebar extends Component {
  state = {
    mediaToAdd: '',
    video: '', 
    image: '', 
    audio: ''
  };

  addMedia(e){
    console.log(" event ", e.target.files);
    e.preventDefault();
    // const file = e.target.value
    // storage.ref('/images').put(file);
  };

  deleteEntry(entry){
    entry.delete().then(() => this.props.history.push('/entries'))
  };

  render() {
    const { video, image, audio } = this.state;
    return (
      <div style={styles.singleEntrySidebar}>
        <Add style={styles.addMedia}/>
        <Button
          label='Media'
          style={styles.addVideo}
        >
          <input type="file" id="file" style={styles.addVideo} onChange={this.addMedia.bind(this)}/>
        </Button>
        <Button name="image" type="submit">Add Media</Button>
        <Button variant="raised" color="secondary" style={styles.delete} onClick={this.deleteEntry.bind(this, this.props.entry)}>Delete Entry</Button>
       
      </div>
    )
  }
}

export default withAuth(SingleEntrySidebar);