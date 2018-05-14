import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Audio from 'react-audioplayer';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import { composeDecorators } from 'draft-js-plugins-editor';
import TextField from 'material-ui/TextField';
import Button from "material-ui/Button";


const focusPlugin = createFocusPlugin();


const imagePlugin = createImagePlugin({ 
  decorator: composeDecorators(
    focusPlugin.decorator
  )
});

export const plugins = [
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
    }, 
    'KARLA': {
      fontFamily: 'Karla, sans-serif'
    }
  }, 
  singleEntry: {
    display: "flex",
  }, 
  sidebar: {
    width: "20%",
    height: "100%"
  }, 
  editor: {
    width: "80%",
    height: "100%",
    border: "1px dotted #454545",
    boxSizing: "borderBox",
    boxShadow: "inset 0px 1px 8px -3px #ABABAB", 
    cursor: "text",
    padding: "20px",
    marginBottom: "2em",
    borderRadius: '1em'
  }, 
  entry: {
    display: "flex"
  }, 
  media: {
    width: "20%", 
    height: "auto", 
    zIndex: "1"
  }, 
  allButtons: {
    borderRadius: "1em"
  }
}


export const confirmMedia = function(editorState, urlValue, urlType, e){
  if (e) e.preventDefault();
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    urlType, 
    'MUTABLE', 
    { urlValue }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(
    editorState, 
    {currentContent: contentStateWithEntity}
  );

  const newState = AtomicBlockUtils.insertAtomicBlock(
    newEditorState, 
    entityKey, 
    ' '
  );
  return newState;
}

export const mediaBlockRenderer = function(block) {
  
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const AudioPlayer = (props) => ( <audio src={props.src} preload="auto" controls/> );


export const Image = (props) => ( <img src={props.src}  style={styles.media} alt="image cannot be displayed"/> );

const Video = (props) => ( <ReactPlayer url={props.src} style={styles.media} controls /> );


const Media = ({
  block, // eslint-disable-line no-unused-vars
  blockProps, // eslint-disable-line no-unused-vars
  customStyleMap, // eslint-disable-line no-unused-vars
  customStyleFn, // eslint-disable-line no-unused-vars
  decorator, // eslint-disable-line no-unused-vars
  forceSelection, // eslint-disable-line no-unused-vars
  offsetKey, // eslint-disable-line no-unused-vars
  selection, // eslint-disable-line no-unused-vars
  tree, // eslint-disable-line no-unused-vars
  contentState, // eslint-disable-line no-unused-vars
  style,
  
}, config = {}) => {
  let mediaComponent = null;
  const entity = block.getEntityAt(0) ? contentState.getEntity(block.getEntityAt(0)) : null;

  const src = entity ? entity.getData().urlValue : null;
  const type = entity ? entity.getType() : 'text';
  switch(type){
    case 'audio':
      mediaComponent = <AudioPlayer src={src} />;
      break;
    case 'image':
      mediaComponent = <Image src={src} />
      break;
    case 'video':
      mediaComponent = <Video src={src} />;
      break;
    default:
      mediaComponent = null;
      break;
  }
  
  return mediaComponent;

}




