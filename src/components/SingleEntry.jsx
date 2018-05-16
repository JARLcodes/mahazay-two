import React, { Component } from 'react';
import EditorComponent from './Editor.jsx';
import SingleEntrySidebar from './SingleEntrySidebar.jsx';
import InsightComponent from './insights/Insights.jsx'
import { withAuth } from 'fireview';
import Button from "material-ui/Button";
import { withTheme } from 'material-ui/styles';

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
        <div style={{ display: "flex"}}>
          <SingleEntrySidebar item xs={4} history={this.props.history} match={this.props.match} entry={getRootRef('entries', this.props.match.params.entryId)} style={{width: "20%",
    height: "100%"}}/>
          <EditorComponent item xs={8} history={this.props.history} match={this.props.match} entry={getRootRef('entries', this.props.match.params.entryId)}/>
        </div>

        <div style={{ gridColumnEnd: 'span 12' }}>
          <Button onClick = {this.clickHandler} > Get Insights! </Button>
          {this.state.showInsight && <InsightComponent item xs={12} history={this.props.history} entry={getRootRef('entries', this.props.match.params.entryId)} entryId = {this.props.match.params.entryId}/>}
        </div>
      </div>
    )
  }
}

export default withTheme()(withAuth(SingleEntry));
