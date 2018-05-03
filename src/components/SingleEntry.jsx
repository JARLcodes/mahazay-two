import React from "react";
import { EditorState, RichUtils, convertFromRaw } from "draft-js";
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import Button from "material-ui/Button";

const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();

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
          "mutability": "IMMUTABLE",
          "data": {
              "src": "/images/canada-landscape-small.jpg"
          }
      }
  },
  "blocks": [{
      "key": "9gm3s",
      "text": "You can have images in your text field which are draggable. Hover over the image press down your mouse button and drag it to another position inside the editor.",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
      "data": {}
  }, {
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
  }, {
      "key": "e23a8",
      "text": "You can checkout the alignment tool plugin documentation to see how to build a compatible block plugin …",
      "type": "unstyled",
      "depth": 0,
      "inlineStyleRanges": [],
      "entityRanges": [],
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
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createWithContent(convertFromRaw(initialState))};
    this.onChange = (editorState) => this.setState({editorState});
  }

  onStyleClick(style) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      style
    ));
  }

  render() {
    
    return (
      <div>
        <Button onClick={this.onStyleClick.bind(this, 'BOLD')}>Bold</Button>
        <Button onClick={this.onStyleClick.bind(this, 'ITALIC')}>Italic</Button>
        <Button onClick={this.onStyleClick.bind(this, 'UNDERLINE')}>Underline</Button>
        <Button onClick={this.onStyleClick.bind(this, 'STRIKETHROUGH')}>Strikethrough</Button>
        <div>
          <Editor
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="...start here"
            plugins={plugins}
          />
        </div>
      </div>
    );
  }
}
