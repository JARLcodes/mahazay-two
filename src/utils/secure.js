import * as firebase from 'firebase';
import * as config from '../../firebase.config.js';
import { setNext } from '../actions/auth';

firebase.initializeApp(config);


/* used to require authorized users for certain views
    BUT only works with redux -- figure out a way to do this without redux
*/
// export function requireAuth(store) {
// 	return function (nextState, replace) {
// 		if (firebase.auth().currentUser === null) {
// 			store.dispatch(setNext(nextState.location.pathname));
// 			replace({
// 				pathname: '/login',
// 			})
// 		}
// 	}
// }