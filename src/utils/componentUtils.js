import { db } from './firebase.config.js';
import React from 'react';

export const getRootRef = (collectionName, id) => {
  if (!id) return db.collection(collectionName);
  else return db.collection(collectionName).doc(id);
};

export const getIds = collectionName => {
  const ids = [];
  getRootRef(collectionName).get()
    .then(querySnap => querySnap.forEach(doc => ids.push(doc.id)));
  return ids;
};

// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update');
//   whyDidYouUpdate(React);
// }