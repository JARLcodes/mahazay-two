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
    width: '20%', 
    backgroundColor: "#EF9A9A", 
    color: "#fff"
  }, 
  singleEntrySidebar : {
    display: "flex",
    flexDirection: "column"
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
        <Button style={styles.delete}>Delete Entry</Button>
       
      </div>
    )
  }
}
