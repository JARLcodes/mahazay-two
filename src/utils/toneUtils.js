import { db } from './firebase.config.js';
import { getRootRef, getIds } from './componentUtils.js';

//get tone insights by user takes a userId and returns an array of 
export const getUserTones = (userId) => {
    getRootRef('toneInsights').where('userId', '==', userId)
}
//get tone insights by entry
export const getEntryTone = (entryId) => {
    getRootRef('toneInsights', entryId)

}
//get tone insights by journal
// export const getJournalTones = (journalId) => {
//     getRootRef('toneInsights', journalId)

// }