'use strict';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from "material-ui/Button";
import Add from '@material-ui/icons/Add';
import { withAuth } from 'fireview';


import { storage } from '../utils/firebase.config';


const styles = {
  addMedia: {
    margin: 20,
    alignSelf: 'center'
  }, 
  delete: {
    alignSelf: 'center', 
    width: '20%', 
    backgroundColor: "#EF9A9A", 
    color: "#fff"
  }, 
  singleEntrySidebar : {
    display: "flex",
    flexDirection: "column"
  }, 
  addVideo: {
    display: "flex", 
    flexDirection: "column", 
    marginLeft: "10%"
  }, 
}
class SingleEntrySidebar extends Component {
  state = {
    mediaToAdd: [],
    mediaUrls: []
  };

  addMedia(e){
    const files = e.target.files;
    e.preventDefault();
    const filesToUpload = [];
    for (let i = 0; i < files.length; i++){
      this.setState({ mediaToAdd: [...this.state.mediaToAdd, new File(files, files[i].name, {
        type: files[i].type
      })]})
    };
    
  };

  storeMedia(){
    //add to cloud storage and set urls for uploaded files on local state
    this.state.mediaToAdd.forEach(file => storage.ref(file.name).put(file)
      .then(res => this.setState({ mediaUrls: [...this.state.mediaUrls, res.downloadURL]}))
    );
    
  }

  deleteEntry(entry){
    entry.delete().then(() => this.props.history.push('/entries'))
  };

  render() {
    console.log('this.state', this.state);
    return (
      <div style={styles.singleEntrySidebar}>
        <Add style={styles.addMedia}/>
        <Button
          label='Media'
          style={styles.addVideo}
        >
          <input type="file" id="file" style={styles.addVideo} multiple onChange={this.addMedia.bind(this)}/>
        </Button>
        <Button type="submit" onClick={this.storeMedia.bind(this)}>Add Media</Button>
        <Button variant="raised" style={styles.delete} onClick={this.deleteEntry.bind(this, this.props.entry)}>Delete Entry</Button>
       
      </div>
    )
  }
}

export default withAuth(SingleEntrySidebar);