import React, { Component } from "react";
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import Editor from 'draft-js-plugins-editor';
import Button from "material-ui/Button";
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';
// import TextField from 'material-ui/TextField';

import { getRootRef } from '../utils/componentUtils';
import { plugins, styles, promptForLink, removeLink, confirmLink, linkDecorator } from './../utils/singleEntryUtils';
import SingleEntrySidebar from './SingleEntrySidebar.jsx';

<<<<<<< HEAD
=======
// const getRootRef = (entryId) => {
//   return db.collection('entries').doc(entryId)
// };

const rootRef = db.collection('entries').doc('K9xhcdKXioAH6oQ7Hv5k');
// const rootRef = db.collection('entries')
>>>>>>> e8fc19c39d1ca8fcffddf361527046d4a6f4343d

export default class SingleEntry extends Component {
  state = {
    editorState: null, 
    alignment: 'left', 
    showStyleToolbar: false, 
    showAlignmentToolbar: false, 
<<<<<<< HEAD
    showLinkToolbar: false,
    showUrlInput: false,
    urlValue: '',
    rootRef: getRootRef('entries', this.props.match.params.id)
  }
  
  componentDidMount(){
    this.state.rootRef.get()
      .then(snap => {
        snap.data() 
        ? this.setState({ editorState: EditorState.createWithContent(convertFromRaw(snap.data().content)) }) 
        : this.setState({ editorState: EditorState.createEmpty(linkDecorator)})
    });
=======
  }
  
  componentDidMount(){
    rootRef.get()
      .then(snap => {
      const content = snap.data().content ?  convertFromRaw(snap.data().content) : ContentState.createFromText('');
      console.log('data', snap.id) //doc id lives here
      this.setState({ editorState: EditorState.createWithContent(content) })
    })
   
>>>>>>> e8fc19c39d1ca8fcffddf361527046d4a6f4343d
  }

  onChange = editorState => {
    // to send data from entry to firebase WHILE USER IS UPDATING: use convertToRaw(editorState.getCurrentContent())
    this.setState({editorState})
    this.state.rootRef.content 
      ? this.state.rootRef.update({ content: convertToRaw(editorState.getCurrentContent()) })
      : this.state.rootRef.set({ content: convertToRaw(editorState.getCurrentContent()) });

  }

  //for BIU toolbar
  toggleInlineStyle = style => () => 
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      style
    ))

  onBold = this.toggleInlineStyle('BOLD')
  onItalic = this.toggleInlineStyle('ITALIC')
  onUnderline = this.toggleInlineStyle('UNDERLINE')
  onStrikethrough = this.toggleInlineStyle('STRIKETHROUGH')

  onAlignmentChange(){
    console.log('change alignment...')
  }

  showToolbar(type){
    switch(type){
      case 'STYLE':
        return this.setState({ showStyleToolbar: !this.state.showStyleToolbar });
      case 'ALIGN':
        return this.setState({ showAlignmentToolbar: !this.state.showAlignmentToolbar });
      case 'LINK':
        return this.setState({ showLinkToolbar: !this.state.showLinkToolbar });
      default:
        console.log(type);
    }
    
  }

  renderToolbar(type){
    switch(type){
      case 'STYLE':
        return ( 
          <React.Fragment>
            <Button onClick={this.onBold}>Bold</Button>
            <Button onClick={this.onItalic}>Italic</Button>
            <Button onClick={this.onUnderline}>Underline</Button>
            <Button onClick={this.onStrikethrough}>Strikethrough</Button>
          </React.Fragment> 
        )
      case 'ALIGN': 
        return (
          <React.Fragment>
            <Button onClick={this.onAlignmentChange.bind(this, 'left')}><FormatAlignLeft/></Button>
            <Button onClick={this.onAlignmentChange.bind(this, 'center')}><FormatAlignCenter/></Button>
            <Button onClick={this.onAlignmentChange.bind(this, 'right')}><FormatAlignRight/></Button>
          </React.Fragment>
        )
      case 'LINK': 
        return (
          <React.Fragment>
            <Button onClick={e => promptForLink.call(this, e, this.state.editorState) }>Add Link</Button>
            <Button onClick={e => removeLink.call(this, e, this.state.editorState )}>Remove Link</Button> 
            
          </React.Fragment>
        )
      default:
        console.log('render toolbar please select a type: STYLE, ALIGN, or LINK');
      }
  }


  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    let urlInput;
    const { alignment, showStyleToolbar, showAlignmentToolbar, showLinkToolbar, showUrlInput, editorState } = this.state;
    if (!editorState) return 'loading';
    return (
      <div style={styles.singleEntry}>
        <div style={styles.sidebar}> <SingleEntrySidebar/> </div>
        <div style={styles.editor}>

          <Button onClick={this.showToolbar.bind(this, 'STYLE')}><b>B</b><i>I</i><u>U</u></Button>
          {showStyleToolbar && <div>{this.renderToolbar('STYLE')}</div>}

          <Button onClick={this.showToolbar.bind(this, 'ALIGN')}>Align</Button>
          {showAlignmentToolbar && <div>{this.renderToolbar('ALIGN')}</div>}

          <Button onClick={this.showToolbar.bind(this, 'LINK')}>Link</Button>
          {showLinkToolbar && <div>{this.renderToolbar('LINK')}</div>}
           {/* {showUrlInput && 
           <div> */}
            <input
                onChange={this.onURLChange}
                ref="url"
                style={styles.urlInput}
                type="text"
                value={this.state.urlValue}
                onKeyDown={this.onLinkInputKeyDown}
              />
              <Button onClick={e => confirmLink.call(this, e, this.state.editorState, this.state.urlValue)}>Confirm Link</Button>
            {/* </div>
           } */}
              <Editor
                customStyleMap={styles.styleMap}
                editorState={this.state.editorState}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand.bind(this)}
                placeholder="...start here"
                plugins={plugins}
                textAlignment={alignment}
                ref="editor"
              />
          </div>
       
      </div>
    );
  }
}
