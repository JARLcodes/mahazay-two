import React, { Component } from 'react'
import Button from "material-ui/Button";
import Add from '@material-ui/icons/Add';

const styles = {
  addMedia: {
    margin: 20,
    alignSelf: 'center'
  }, 
  delete: {
    alignSelf: 'center', 
    width: '20%'
  }
}
export default class SingleEntrySidebar extends Component {
  render() {
    return (
      <div id="singleEntrySidebar">
        <Add style={styles.addMedia}/>
        <Button>Video</Button>
        <Button>Image</Button>
        <Button>Audio</Button>
        <Button variant="raised" color="secondary" style={styles.delete}>Delete Entry</Button>
       
      </div>
    )
  }
}
