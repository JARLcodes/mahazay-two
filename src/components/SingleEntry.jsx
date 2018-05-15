import React, { Component } from 'react';
import EditorComponent from './Editor.jsx';
import SingleEntrySidebar from './SingleEntrySidebar.jsx';
import InsightComponent from './insights/Insights.jsx'
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
      <div>
        <div style={styles.entry}>
          <SingleEntrySidebar item xs={4} history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)} style={styles.sidebar}/>
          <EditorComponent item xs={8} history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)}/>
        </div>

        <div style={{ gridColumnEnd: 'span 12' }}>
          <Button onClick = {this.clickHandler} > Get Insights! </Button>
          {this.state.showInsight && <InsightComponent item xs={12} history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)} entryId = {this.props.match.params.entryId}/>}
        </div>
      </div>
    )
  }
}

export default withAuth(SingleEntry);
