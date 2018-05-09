import { db } from './firebase.config.js';

export const getRootRef = (collectionName, id) => {
  if (!id) return db.collection(collectionName)
  else return db.collection(collectionName).doc(id)
}

export const getIds = collectionName => {
  const ids = [];
  getRootRef(collectionName).get()
    .then(querySnap => querySnap.forEach(doc => ids.push(doc.id)));
  return ids;
}