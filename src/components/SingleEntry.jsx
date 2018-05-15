import React, { Component } from 'react';
import EditorComponent from './Editor.jsx';
import SingleEntrySidebar from './SingleEntrySidebar.jsx';
import { withAuth } from 'fireview';
import Button from "material-ui/Button";

import { getRootRef } from '../utils/componentUtils';
import { styles } from '../utils/singleEntryUtils';
import { ToneInsights } from './insights/ToneInsights';

class SingleEntry extends Component {
  constructor(){
    super()
    this.state = {
      showInsight: false
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(event){
    this.setState({showInsight: !this.state.showInsight})
  }

  render(){
    return (
    <div style={styles.entry}>
      <SingleEntrySidebar history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)} style={styles.sidebar}/>
      <EditorComponent history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)}/>
      <Button onClick = {this.clickHandler}>Get Insights! </Button>
      {this.state.showInsight && <ToneInsights entryId = {this.props.match.params.entryId}  />}
    </div>
    )
  }
}

export default withAuth(SingleEntry);
