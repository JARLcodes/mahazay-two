import React, { Component } from 'react';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import { composeDecorators } from 'draft-js-plugins-editor';
import TextField from 'material-ui/TextField';
import Button from "material-ui/Button";

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
    cursor: "text",
    padding: "20px",
    marginBottom: "2em",
  }, 
  entry: {
    display: "flex"
  }, 
  media: {
    width: "20%", 
    height: "auto"
  }
}


export const confirmMedia = function(editorState, urlValue, urlType, e){
  if (e) e.preventDefault();
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    urlType, 
    'MUTABLE', 
    {src: urlValue}
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

export const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />;
};

export const Image = (props) => {
  return <img src={props.src} style={styles.media} />;
};

export const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />;
};

export const Media = (props) => {
  let media = null;
  const entity = props.block.getEntityAt(0) ? props.contentState.getEntity(props.block.getEntityAt(0)) : null;
  console.log(props.block.getEntityAt(0), props.block);
  const src = entity ? entity.getData().src : null;
  const type = entity ? entity.getType() : 'text';
  if (entity) console.log('type', entity.getType());
  
  switch(type){
    case 'audio':
      media = <Audio src={src} />;
      break;
    case 'image':
      media = <Image src={src} />;
      break;
    case 'video':
      media = <Video src={src} />;
      break;
    default:
      media = null;
      break;
  }
  console.log(props.block.getEntityAt(0), media)
  return media;

};




