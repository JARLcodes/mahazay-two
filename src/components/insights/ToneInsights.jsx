import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { getRootRef, getIds } from '../../utils/componentUtils';
import { db } from '../../utils/firebase.config'

export class ToneInsights extends Component {
    constructor(props){
        super(props);
        this.state = {
            usertones: []
        }
        this.getUserTones = this.getUserTones.bind(this);
    }
    //get tone insights by user takes a userId and returns an array of 
    getUserTones(userId){
        getRootRef('toneInsights').where('userId', '==', userId)
    }
    //get tone insights by entry
    getEntryTone(entryId){
        getRootRef('toneInsights', entryId)
    }
    //get tone insights by journal
    // getJournalTones = (journalId) => {
    //     getRootRef('toneInsights', journalId)

    // }
    componentWillReceiveProps(newProps){
        getRootRef('toneInsights').where('userId', '==', newProps._user.uid).get()
            .then(snap => console.log(snap))
    }

    render(){
        console.log("state: ", this.state, "props: ", this.props)
        return(
            <div></div>
        )
    }
}

export default withAuth(ToneInsights);