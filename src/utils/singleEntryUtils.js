import React from 'react';
import { CompositeDecorator, EditorState, RichUtils } from 'draft-js';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import { composeDecorators } from 'draft-js-plugins-editor';

const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

export const plugins = [
  blockDndPlugin,
  focusPlugin,
  imagePlugin
];


export const styles = {
  styleMap: {
    'STRIKETHROUGH': {
      textDecoration: 'line-through',
    },
    'UNDERLINE': {
      textDecoration: 'underline'
    }
  }, 
  singleEntry: {
    display: "flex"
  }, 
  sidebar: {
    width: "20%",
    height: "100%"
  }, 
  editor: {
    width: "70%",
    height: "100%",
    boxSizing: "borderBox",
    border: "1px solid #ddd",
    cursor: "text",
    padding: "20px",
    borderRadius: "2px",
    marginBottom: "2em",
    boxShadow: "inset 0px 1px 8px -3px #ABABAB",
    background: "#fefefe"
  }
}





export const findLinkEntities = function (contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export const Link = function(props){
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url}>
      {props.children}
    </a>
  );
};

export const linkDecorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);


export const promptForLink = function(e, editorState){
  e.preventDefault();
  console.log('editor state in prompt for link: ', editorState);
  const selection = editorState.getSelection();
  console.log('selection: ', selection);
  if (!selection.isCollapsed()){
   
    const contentState = editorState.getCurrentContent();
    const startKey = editorState.getSelection().getStartKey();
    const startOffset = editorState.getSelection().getStartOffset();
    const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    //the following line returns null (getEntityAt(startOffset) isn't working)
    const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    console.log('this.refs: ', this.refs);
    console.log('linkKey', linkKey);
    let url = '';
    if (linkKey){
      const linkInstance = contentState.getEntity(linkKey);
      url = linkInstance.getData().url;
      console.log('url', url);
    };
    
      this.setState({
        showUrlInput: true, 
        urlValue: url, 
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0);
      })
    }
    

}

export const confirmLink = function(e, editorState, urlValue){
  e.preventDefault();
 
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'LINK',
    'MUTABLE',
    {url: urlValue}
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
  this.setState({
    editorState: RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ),
    showURLInput: false,
    urlValue: '',
  }, () => {
    setTimeout(() => this.refs.editor.focus(), 0);
  });
  
}

export const removeLink = function(e, editorState){
  e.preventDefault();
  
}


