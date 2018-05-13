import React, { Component } from "react";
import { EditorState, RichUtils, convertFromRaw, convertToRaw, ContentState } from "draft-js";
import Editor from 'draft-js-plugins-editor';
import Button from "material-ui/Button";
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';
import { withAuth } from 'fireview';

import { storage } from '../utils/firebase.config';
import { getRootRef } from '../utils/componentUtils';
import { plugins, styles, confirmMedia, mediaBlockRenderer } from './../utils/singleEntryUtils';
import SingleEntrySidebar from './SingleEntrySidebar.jsx';
import { getTokenTone, analyzeTone, analyzePersonality } from '../utils/watsonFuncs.js'

class EditorComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      editorState: null, 
      alignment: 'left', 
      showStyleToolbar: false, 
      showAlignmentToolbar: false, 
      showMediaInput: false,
      showMediaTypeButtons: false,
      mediaUrlValue: '', 
      urlType: '',
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
        : this.setState({ editorState: EditorState.createEmpty()})
    })
  };

  onChange = editorState => {
    // to send data from entry to firebase WHILE USER IS UPDATING: use convertToRaw(editorState.getCurrentContent())
    this.setState({editorState})
    console.log('this is editor state after change', this.state.editorState);
    this.state.rootRef.update({ content: convertToRaw(editorState.getCurrentContent()) });
    //analyze input with each change
    const text = this.state.editorState.getCurrentContent().getPlainText();
    //only call tone analyzer if length of text is greater than 350 -- to limit api calls
    if (text.length > 350){
      getTokenTone().then((token) => analyzeTone(token, text ));
      analyzePersonality(this.props.entry.entryId)
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

 

  onURLChange(e){
    const files = e.target.files;
    const filesToUpload = [];
    for (let i = 0; i < files.length; i++){
      filesToUpload.push(new File(files, files[i].name, {
        type: files[i].type
      }))
    }

    filesToUpload.forEach(file => {
      console.log('file', file)
      storage.ref(file.name).put(file)
      .then(res => this.setState({ mediaUrlValue: res.downloadURL }))
      // .then(() => console.log('this is media url value', this.state.mediaUrlValue)) 1. all good here
      .catch(console.error)
    })
  }

  onURLInputKeyDown(e) {
    let newState = this.state.editorState;
    if (e.which === 13) {
      // console.log('this.state.mediaUrlValue', this.state.mediaUrlValue); 2. all good here
      this.onChange(confirmMedia(this.state.editorState, this.state.mediaUrlValue, this.state.urlType));
      this.setState({ showMediaInput: !this.state.showMediaInput })
    };

    
  }

  showMediaInput(type){
    this.setState({ showMediaInput: !this.state.showMediaInput, urlType: type })
  }

  showMediaTypeButtons(){
    this.setState({ showMediaTypeButtons: !this.state.showMediaTypeButtons })
  }

  render() {
    const { alignment, showStyleToolbar, showAlignmentToolbar, showMediaInput, urlValue, urlType, showMediaTypeButtons, editorState } = this.state;
    if (!editorState) return 'loading';
    
    return ( 
      
        <div style={styles.editor}>
          <Button onClick={this.showStyleToolbar.bind(this)}><b>B</b><i>I</i><u>U</u></Button>
          {showStyleToolbar && <div>{this.renderStyleToolbar()}</div>}
          <Button onClick={this.showAlignmentToolbar.bind(this)}>Align</Button>
          {showAlignmentToolbar && <div>{this.renderAlignmentToolbar()}</div>}
          {!showMediaTypeButtons && <Button onClick={this.showMediaTypeButtons.bind(this)}>Add Media</Button>}
          { showMediaInput 
            ? <div>
            <input 
            type="file" 
            id="file" 
            onChange={this.onURLChange}
            onKeyDown={this.onURLInputKeyDown.bind(this)}
            />
            <Button>Hit Enter to Submit</Button>
            </div>
            : <div>
              { showMediaTypeButtons && <Button onClick={this.showMediaInput.bind(this, 'image')}>Add Image</Button> }
              { showMediaTypeButtons && <Button onClick={this.showMediaInput.bind(this, 'audio')}>Add Audio</Button> }
              { showMediaTypeButtons && <Button onClick={this.showMediaInput.bind(this, 'video')}>Add Video</Button> }
            </div>
          }
              <Editor
                customStyleMap={styles.styleMap}
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
                placeholder="...start below"
                plugins={plugins}
                textAlignment={alignment}
                blockRendererFn={mediaBlockRenderer}
                ref="editor"
              />
          </div>
  
    );
  }
}


export default withAuth(EditorComponent);