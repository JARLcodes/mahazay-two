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

/* eslint-disable */
export const initialState = {
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

export const styles = {
  styleMap: {
    'STRIKETHROUGH': {
      textDecoration: 'line-through',
    },
    'UNDERLINE': {
      textDecoration: 'underline'
    }
  }
}