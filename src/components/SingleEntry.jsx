import React from "react";
import { EditorState, RichUtils, convertFromRaw, convertToRaw, ContentState } from "draft-js";
import Editor from 'draft-js-plugins-editor';
import Button from "material-ui/Button";
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignJustify from '@material-ui/icons/FormatAlignJustify';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';


import SingleEntrySidebar from './SingleEntrySidebar.jsx';
import { plugins, styles } from '../utils/singleEntryUtils';
import { db, admin } from '../utils/firebase.config.js';


const getRootRef = (entryId) => {
  return db.collection('entries').doc(entryId)
};
// convertFromRaw(snap.data().content)
const rootRef = db.collection('entries').doc('K9xhcdKXioAH6oQ7Hv5k');

export default class SingleEntry extends React.Component {
  state = {
    editorState: null, 
    alignment: 'left', 
    showStyleToolbar: false, 
    showAlignmentToolbar: false
  }
  
  componentDidMount(){
    
    rootRef.get()
      .then(snap => {
      const content = snap.data().content ?  ContentState.createFromText('') : null;
      this.setState({ editorState: EditorState.createWithContent(content) })
    })
  }
  onChange = editorState => {
    // to send data from entry to firebase: use convertToRaw(editorState.getCurrentContent())
    this.setState({editorState})
    rootRef.update({ content: convertToRaw(editorState.getCurrentContent()) })
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
    if (this.state.editorState) console.log('editor state: ', this.state.editorState.getCurrentContent());
    if (!editorState) return 'loading';
    return (
      <div id="singleEntry">
        <div id="sidebar"> <SingleEntrySidebar/> </div>
        <div id="editor">
          <Button onClick={this.showStyleToolbar.bind(this)}><b>B </b><i>I </i><u>U</u></Button>
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
