import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { getRootRef } from '../utils/componentUtils';
import { styles } from '../utils/singleEntryUtils';

import {
  SingleEntrySidebar,
  EditorComponent } from './index';

class SingleEntry extends Component {
  render(){
    return (
    <div style={styles.entry}>
      <SingleEntrySidebar history={this.props.history} match={this.props.match} entry={getRootRef('entries', this.props.match.params.entryId)} style={styles.sidebar}/>
      <EditorComponent history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)}/>
    </div>
    )
  }
}

export default withAuth(SingleEntry);