import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { getRootRef } from '../utils/componentUtils';
import { styles } from '../utils/singleEntryUtils';

import {
  SingleEntrySidebar,
  Editor,
  SingleTracker } from './index';

class SingleEntry extends Component {
  render(){
    return (
    <div style={styles.entry}>
      <SingleEntrySidebar history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)} style={styles.sidebar}/>
      <Editor history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)}/>
    
      <SingleTracker />
    </div>
    )
  }
}

export default withAuth(SingleEntry);