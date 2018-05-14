import React, { Component } from 'react';
import EditorComponent from './Editor.jsx';
import SingleEntrySidebar from './SingleEntrySidebar.jsx';
import { withAuth } from 'fireview';

import { getRootRef } from '../utils/componentUtils';
import { styles } from '../utils/singleEntryUtils';

class SingleEntry extends Component {
  render(){
    return (
    <div style={styles.entry}>
      <SingleEntrySidebar history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)} style={styles.sidebar}/>
      <EditorComponent history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)}/>
    </div>
    )
  }
}

export default withAuth(SingleEntry);