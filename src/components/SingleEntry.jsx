import React from "react";
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from "draft-js";
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import Button from "material-ui/Button";
import { FormControlLabel, Switch, FormGroup } from "material-ui";

import SingleEntrySidebar from './SingleEntrySidebar.jsx';
const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();

const styles = {
  makePublic: {
    marginLeft: '46%'
  }
}
const decorator = composeDecorators(
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [
  blockDndPlugin,
  focusPlugin,
  imagePlugin
];

/* eslint-disable */
const initialState = {
  "entityMap": {
      "0": {
          "type": "IMAGE",
          "mutability": "MUTABLE",
          "data": {
              "src": "/images/cherry-blossom.jpg"
          }, 
      "1": {
        "type": "IMAGE",
        "mutability": "MUTABLE",
        "data": {
            "src": "/images/cherry-blossom.jpg"
        }
      }
    }
  },
  "blocks": [{
      "key": "9gm3s",
      "text": "",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
  }, 
  {
    "key": "ov7r",
    "text": " ",
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [{
        "offset": 0,
        "length": 1,
        "key": 0
    }],
    "data": {}
}]
};
/* eslint-enable */


const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
  'UNDERLINE': {
    textDecoration: 'underline'
  }
};

export default class SingleEntry extends React.Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState)), 
    alignment: 'left', 
    showStyleToolbar: false, 
    showAlignmentToolbar: false, 
    public: false
  }
  
  //used to update editor with user input
  onChange = editorState => {
    // to send data from entry to firebase WHILE USER IS UPDATING: use convertToRaw(editorState.getCurrentContent())
    console.log(convertToRaw(editorState.getCurrentContent()))
    this.setState({editorState})
  }

  //used for text formatting toolbar (BIU)
  toggleInlineStyle = style => () => 
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      style
    ))

  onBold = this.toggleInlineStyle('BOLD')
  onItalic = this.toggleInlineStyle('ITALIC')
  onUnderline = this.toggleInlineStyle('UNDERLINE')
  onStrikethrough = this.toggleInlineStyle('STRIKETHROUGH')

  //not yet functional
  onAlignmentChange(alignment){
    this.setState({ alignment })
  }

  //used to toggle entry between public and private -- no functionality yet
  shareEntry(){
    this.setState({ public: !this.state.public })
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
        <Button onClick={this.onAlignmentChange.bind(this, 'left')}>Left</Button>
        <Button onClick={this.onAlignmentChange.bind(this, 'center')}>Center</Button>
        <Button onClick={this.onAlignmentChange.bind(this, 'right')}>Right</Button>
    </React.Fragment>
  }

  render() {
    const { alignment, showStyleToolbar, showAlignmentToolbar } = this.state;
    return (

      <div id="singleEntry">
        <div id="sidebar"> <SingleEntrySidebar/> </div>
        <div id="editor">
          <FormGroup row style={styles.makePublic}>
            <FormControlLabel 
              control={
                <Switch
                  onChange={this.shareEntry.bind(this)}
                  value={this.state.public}
                />
              }
              label="Make Entry Public"
              />
          </FormGroup>
          <Button onClick={this.showStyleToolbar.bind(this)}><b>B</b><i>I</i><u>U</u></Button>
          {showStyleToolbar && <div>{this.renderStyleToolbar()}</div>}
          <Button onClick={this.showAlignmentToolbar.bind(this)}>Align</Button>
          {showAlignmentToolbar && <div>{this.renderAlignmentToolbar()}</div>}
          
              <Editor
                customStyleMap={styleMap}
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
