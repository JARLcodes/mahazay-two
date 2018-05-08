import React, { Component } from "react";
import { EditorState, RichUtils, convertFromRaw, convertToRaw, ContentState } from "draft-js";
import Editor from 'draft-js-plugins-editor';
import Button from "material-ui/Button";
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';

import { getRootRef, getIds } from '../utils/componentUtils';
import { plugins, styles } from './../utils/singleEntryUtils';
import SingleEntrySidebar from './SingleEntrySidebar.jsx';
import { getTokenTone, analyzeTone } from '../utils/watsonFuncs.js'


export default class SingleEntry extends Component {
  state = {
    editorState: null, 
    alignment: 'left', 
    showStyleToolbar: false, 
    showAlignmentToolbar: false, 
    insightIds: [], 
    rootRef: getRootRef('entries', this.props.match.params.id)
  }
  
  componentDidMount(){
    this.getInsightIds('insights');
    this.state.rootRef.get()
      .then(snap => {
        snap.data()
        ? this.setState({ editorState: EditorState.createWithContent(convertFromRaw(snap.data().content)) }) 
        : this.setState({ editorState: EditorState.createEmpty()})
    })
  }
  onChange = editorState => {
    // to send data from entry to firebase WHILE USER IS UPDATING: use convertToRaw(editorState.getCurrentContent())
    this.setState({editorState})
    this.state.rootRef.content 
      ? this.state.rootRef.update({ content: convertToRaw(editorState.getCurrentContent()) })
      : this.state.rootRef.set({ content: convertToRaw(editorState.getCurrentContent()) });
  }

  getInsightIds = (collectionName) => {
    const ids = getIds(collectionName)
    this.setState({ insightIds: ids })
  }

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
    const text = this.state.editorState.getCurrentContent().getPlainText();
    const { insightIds } = this.state;
    console.log('insightIds', insightIds);
    const insightId = insightIds.length > 0 ? insightIds.length : 0;
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
          
          <Button onClick={() => getTokenTone().then((token) => analyzeTone(token, text, insightId ))}>Analyze</Button>
          </div>
      </div>
    );
  }
}
