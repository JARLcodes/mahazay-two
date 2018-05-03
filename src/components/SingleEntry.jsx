import React from "react";
import {Editor, EditorState, RichUtils} from "draft-js";
import Button from 'material-ui/Button';


const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
  'UNDERLINE': {
    textDecoration: 'underline'
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
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
          />
        </div>
      </div>
    );
  }
}
