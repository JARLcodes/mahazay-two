import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Audio from 'react-audioplayer';
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
    display: "flex",
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
    border: "dashed",
    borderWidth: ".1vh",
    borderColor: "grey"
  }, 
  entry: {
    display: "flex"
  }, 
  media: {
    width: "20%", 
    height: "auto", 
    zIndex: "1"
  }
}


export const confirmMedia = function(editorState, urlValue, urlType, e){
  if (e) e.preventDefault();
  const contentState = editorState.getCurrentContent();
  console.log('url value', urlValue); //3. all good here 
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

export const AudioPlayer = (props) => {
 
  return <audio src={props.src}/>
};

export const Image = (props) => {
  return <img src={props.src} style={styles.media} />;
};

export const Video = (props) => {
  return <ReactPlayer url={props.src} style={styles.media} controls />
};

export const Media = (props) => {
  let media = null;
  const entity = props.block.getEntityAt(0) ? props.contentState.getEntity(props.block.getEntityAt(0)) : null;
  // if (entity) console.log('entity data should have urlValue', entity.getData());
  const src = entity ? entity.getData().urlValue : null;
  const type = entity ? entity.getType() : 'text';
  
  switch(type){
    case 'audio':
      media = <AudioPlayer src={src} />;
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
  
  return media;

};




