import React, { Component } from "react";
import { EditorState, RichUtils, convertFromRaw, convertToRaw, ContentState } from "draft-js";
import Editor from 'draft-js-plugins-editor';
import Button from "material-ui/Button";
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';
import { withAuth } from 'fireview';

import { getRootRef } from '../utils/componentUtils';
import { plugins, styles } from './../utils/singleEntryUtils';
import SingleEntrySidebar from './SingleEntrySidebar.jsx';
import { getTokenTone, analyzeTone, analyzePersonality } from '../utils/watsonFuncs.js'

class SingleEntry extends Component {
  state = {
    editorState: null, 
    alignment: 'left', 
    showStyleToolbar: false, 
    showAlignmentToolbar: false, 
    rootRef: getRootRef('entries', this.props.match.params.entryId)
  }
  
  componentDidMount(){
    
   
    this.state.rootRef.get()
      .then(snap => {
        snap.data() && snap.data().content
        ? this.setState({ editorState: EditorState.createWithContent(convertFromRaw(snap.data().content)) }) 
        : this.setState({ editorState: EditorState.createEmpty()})
    })
  };

  onChange = editorState => {
    // to send data from entry to firebase WHILE USER IS UPDATING: use convertToRaw(editorState.getCurrentContent())
    this.setState({editorState})
    //at this point, entry has been created, only fields on entry are journal id and date created -- NO CONTENT
    this.state.rootRef.update({ content: convertToRaw(editorState.getCurrentContent()) });
    //analyze input with each change
    // const { toneInsightIds } = this.state;
    const text = this.state.editorState.getCurrentContent().getPlainText()
    // const toneInsightId = toneInsightIds.length > 0 ? toneInsightIds.length : 0;
   
    //only call tone analyzer if length of text is greater than 350 -- to limit api calls
    if (text.length > 350){
      getTokenTone().then((token) => analyzeTone(token, text ));
      analyzePersonality(this.props.match.params.entryId)
    } 
    //change to button to limit amout of times we hit watson
  }

  // getInsightIds = (collectionName) => {
  //   const ids = getIds(collectionName)
  //   if(collectionName === 'toneInsights') this.setState({ toneInsightIds: ids});
  // }

  toggleInlineStyle = style => () => 
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      style
    ))

  onBold = this.toggleInlineStyle('BOLD')
  onItalic = this.toggleInlineStyle('ITALIC')
  onUnderline = this.toggleInlineStyle('UNDERLINE')
  onStrikethrough = this.toggleInlineStyle('STRIKETHROUGH')

  onAlignmentChange(alignment){
    this.setState({ alignment })
  }

  showStyleToolbar(){
    this.setState({ showStyleToolbar: !this.state.showStyleToolbar })
  }
  
  showAlignmentToolbar(){
    this.setState({ showAlignmentToolbar: !this.state.showAlignmentToolbar })
  }

  renderStyleToolbar() {
    return <React.Fragment>
        <Button onClick={this.onBold}>Bold</Button>
        <Button onClick={this.onItalic}>Italic</Button>
        <Button onClick={this.onUnderline}>Underline</Button>
        <Button onClick={this.onStrikethrough}>Strikethrough</Button>
    </React.Fragment>
  }

  renderAlignmentToolbar(){
    return <React.Fragment>
        <Button onClick={this.onAlignmentChange.bind(this, 'left')}><FormatAlignLeft/></Button>
        <Button onClick={this.onAlignmentChange.bind(this, 'center')}><FormatAlignCenter/></Button>
        <Button onClick={this.onAlignmentChange.bind(this, 'right')}><FormatAlignRight/></Button>
    </React.Fragment>
  }

  render() {
    const { alignment, showStyleToolbar, showAlignmentToolbar, editorState } = this.state;
    if (!editorState) return 'loading';
    
    return ( 
      <div style={styles.singleEntry}>
        <div style={styles.sidebar}> <SingleEntrySidebar/> </div>
        <div style={styles.editor}>
          <Button onClick={this.showStyleToolbar.bind(this)}><b>B</b><i>I</i><u>U</u></Button>
          {showStyleToolbar && <div>{this.renderStyleToolbar()}</div>}
          <Button onClick={this.showAlignmentToolbar.bind(this)}>Align</Button>
          {showAlignmentToolbar && <div>{this.renderAlignmentToolbar()}</div>}
          
              <Editor
                customStyleMap={styles.styleMap}
                editorState={this.state.editorState}
                onChange={this.onChange}
                placeholder="...start here"
                plugins={plugins}
                textAlignment={alignment}
              />
          
          </div>
      </div>
    );
  }
}


export default withAuth(SingleEntry);