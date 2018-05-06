import { db } from './firebase.config';

export const getRootRef = (collectionName, id) => {
  return db.collection(collectionName).doc(id)
}