import React, { Component } from 'react'
import Button from "material-ui/Button";
import Add from '@material-ui/icons/Add';

const styles = {
  margin: 20,
  alignSelf: 'center'
}
export default class SingleEntrySidebar extends Component {
  render() {
    return (
      <div id="singleEntrySidebar">
        <Add style={styles}/>
        <Button>Video</Button>
        <Button>Image</Button>
        <Button>Audio</Button>
      </div>
    )
  }
}
