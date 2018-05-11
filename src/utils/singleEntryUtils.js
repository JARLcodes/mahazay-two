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
    cursor: "text",
    padding: "20px",
    marginBottom: "2em",
  }, 
  entry: {
    display: "flex"
  }
}

