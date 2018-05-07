import { db } from './firebase.config';

export const getRootRef = (collectionName, id) => {
  if (!id) return db.collection(collectionName)
  else return db.collection(collectionName).doc(id)
}