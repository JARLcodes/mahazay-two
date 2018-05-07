import * as firebase from 'firebase';

export const newUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error.code);
      console.log(error.message);
  });
};

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error.code);
      console.log(error.message);
  });
};

export const logout = () => {
  return firebase.auth().signOut()
    .then(() => {
      console.log('Signed Out')
    .catch(error => {
      console.log(error.code);
      console.log(error.message);
    });
  });
};

