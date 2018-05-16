import React, { Component } from "react";
import { EditorState, RichUtils, convertFromRaw, convertToRaw, ContentState } from "draft-js";
import Editor from 'draft-js-plugins-editor';
import { withTheme } from 'material-ui/styles';
import Button from "material-ui/Button";
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';
import Add from '@material-ui/icons/Add';
import { withAuth } from 'fireview';
import { CircularProgress } from 'material-ui/Progress';

import { storage } from '../utils/firebase.config';
import { getRootRef } from '../utils/componentUtils';
import { plugins, styles, confirmMedia, mediaBlockRenderer } from './../utils/singleEntryUtils';
import SingleEntrySidebar from './SingleEntrySidebar.jsx';
import { analyzePersonality } from '../utils/watsonFuncs.js';

class EditorComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: null,
      showStyleToolbar: false,
      showMediaInput: false,
      showMediaTypeButtons: false,
      mediaUrlValue: '',
      urlType: '',
      fileToUpload: {},
      rootRef: this.props.entry
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onURLChange = this.onURLChange.bind(this);
    this.onURLInputKeyDown = this.onURLInputKeyDown.bind(this);
  }


  focus = () => this.refs.editor.focus();

  handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  componentDidMount(){
    this.state.rootRef.get()
      .then(snap => {
        snap.data() && snap.data().content
        ? this.setState({ editorState: EditorState.createWithContent(convertFromRaw(snap.data().content)) })
        : this.setState({ editorState: EditorState.createEmpty()});
    });
  }

  onChange = editorState => {
    // to send data from entry to firebase WHILE USER IS UPDATING: use convertToRaw(editorState.getCurrentContent())
    this.setState({editorState});
    this.state.rootRef.update({ content: convertToRaw(editorState.getCurrentContent()) });
    //analyze input with each change
    const text = this.state.editorState.getCurrentContent().getPlainText();
    //only call tone analyzer if length of text is greater than 350 -- to limit api calls
    if (text.length > 350){
      analyzePersonality(this.props.entry.entryId);
    }
    //change to button to limit amout of times we hit watson
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

  showStyleToolbar(){
    this.setState({ showStyleToolbar: !this.state.showStyleToolbar });
  }

  renderStyleToolbar() {
    return <React.Fragment>
        <Button onClick={this.onBold} style={styles.allButtons}>Bold</Button>
        <Button onClick={this.onItalic} style={styles.allButtons}>Italic</Button>
        <Button onClick={this.onUnderline} style={styles.allButtons}>Underline</Button>
        <Button onClick={this.onStrikethrough} style={styles.allButtons}>Strikethrough</Button>
    </React.Fragment>;
  }


  onURLChange(e){
    const file = e.target.files[0];
    return this.setState({fileToUpload: file});

  }

  onURLInputKeyDown(e) {
    e.preventDefault();
    if (e.which === 13) {
    //save the file to storage and set downloadurl on local state
    const file = this.state.fileToUpload;
    storage.ref(file.name).put(file)
      .then(res => this.setState({ mediaUrlValue: res.downloadURL, showMediaInput: !this.state.showMediaInput }))
      .then(() => this.onChange(confirmMedia(this.state.editorState, this.state.mediaUrlValue, this.state.urlType)))
      .catch(console.error);
    }
  }

  showMediaInput(type){
    this.setState({ showMediaInput: !this.state.showMediaInput, urlType: type });
  }

  showMediaTypeButtons(){
    this.setState({ showMediaTypeButtons: !this.state.showMediaTypeButtons });
  }

  render() {
    const { showStyleToolbar, showMediaInput, urlValue, urlType, showMediaTypeButtons, editorState } = this.state;
    if (!editorState) return (
      <CircularProgress />
    );
    return (
        <div style={styles.editor}>
          <Button onClick={this.showStyleToolbar.bind(this)} style={styles.allButtons}><b>B</b><i>I</i><u>U</u></Button>
          {showStyleToolbar && <div>{this.renderStyleToolbar()}</div>}


          {!showMediaTypeButtons && <Button onClick={this.showMediaTypeButtons.bind(this)} style={styles.allButtons}><Add /></Button>}
          { showMediaInput
            ? <div>
            <input
            style={{fontFamily:'Karla, sansSerif'}}
            type="file"
            id="file"
            onChange={this.onURLChange}
            onKeyDown={this.onURLInputKeyDown.bind(this)}
            />
            <Button style={styles.allButtons}>Hit Enter to Submit</Button>
            </div>
            : <div>
              { showMediaTypeButtons && <Button onClick={this.showMediaInput.bind(this, 'image')} style={styles.allButtons}>Add Image</Button> }
              { showMediaTypeButtons && <Button onClick={this.showMediaInput.bind(this, 'audio')} style={styles.allButtons}>Add Audio</Button> }
              { showMediaTypeButtons && <Button onClick={this.showMediaInput.bind(this, 'video')} style={styles.allButtons}>Add Video</Button> }
            </div>
          }
              <Editor
                customStyleMap={styles.styleMap}
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
                placeholder="...start below"
                plugins={plugins}
                blockRendererFn={mediaBlockRenderer}
                ref="editor"
              />
          </div>

    );
  }
}


export default withTheme()(withAuth(EditorComponent));
