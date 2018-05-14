import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Audio from 'react-audioplayer';
import { EditorState, AtomicBlockUtils, convertToRaw } from 'draft-js';
import createImagePlugin from 'draft-js-image-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import { composeDecorators } from 'draft-js-plugins-editor';
import TextField from 'material-ui/TextField';
import Button from "material-ui/Button";


const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();

const imagePlugin = createImagePlugin({ 
  decorator: composeDecorators(
    focusPlugin.decorator,
    resizeablePlugin.decorator
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
    height: "auto", 
    zIndex: "1"
  }
}


export const confirmMedia = function(editorState, urlValue, urlType, e){
  if (e) e.preventDefault();
  const contentState = editorState.getCurrentContent();
  console.log('7', urlType); //5. all good here
  console.log('8', urlValue);
  const contentStateWithEntity = contentState.createEntity(
    urlType, 
    'MUTABLE', 
    { urlValue }
  );
  console.log('url value in confirm media', urlValue)
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
  if (type === 'image') console.log('config', config)
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




