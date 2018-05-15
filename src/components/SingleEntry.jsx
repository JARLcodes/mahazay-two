import React, { Component } from 'react';
import EditorComponent from './Editor.jsx';
import SingleEntrySidebar from './SingleEntrySidebar.jsx';
import InsightComponent from './insights/Insights.jsx'
import { withAuth } from 'fireview';
import { getRootRef } from '../utils/componentUtils';
import { styles } from '../utils/singleEntryUtils';

class SingleEntry extends Component {
  render(){
    return (
      <div>
        <div style={styles.entry}>
          <SingleEntrySidebar item xs={4} history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)} style={styles.sidebar}/>
          <EditorComponent item xs={8} history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)}/>
        </div>
        <div style={{ gridColumnEnd: 'span 12' }}>
          <InsightComponent item xs={12} history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)}/>
        </div>
      </div>
    )
  }
}

export default withAuth(SingleEntry);