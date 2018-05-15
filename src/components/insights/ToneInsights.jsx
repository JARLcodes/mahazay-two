import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { EditorState, RichUtils, convertFromRaw, convertToRaw, ContentState } from "draft-js";

import { getRootRef, getIds } from '../../utils/componentUtils';
import {db} from '../../utils/firebase.config'
import { getTokenTone, analyzeTone } from '../../utils/watsonFuncs.js'

export class ToneInsights extends Component {
    constructor (){
        super();
        this.state = {
            insight:{},
            entry: {},
            userId: null,
            needsNewInsight: true
        }
        this.getInsight = this.getInsight.bind(this);
    }

    componentDidMount(){
            if(! this.state.entry.blocks){
                getRootRef('entries', this.props.entryId)
                .get()
                .then(entry => this.setState({...this.state, entry: entry.data().content, userId: entry.data().userId}))
            }
            if (!this.state.insight.entryId){
                db.collection('toneInsights').where("entryId", "==", this.props.entryId).get()
            .then(querySnap => {
                const helperArr = []
                querySnap.forEach(snap => {
                    helperArr.push(snap.data())
                })
                if(helperArr[0]){
                    console.log("hit the db query for the insight and set the state insight obj")
                    this.setState({...this.state,insight:helperArr[0], needsNewInsight: false})}
                else{
                    console.log("got nothing here")
                    this.getInsight()
                }
            })}
            console.log("userrr:", this.props._user)

    }



    getInsight(){
        if(this.state.entry.blocks){
            const entryId = this.props.entryId
            const userId = this.state.userId
            const text = convertFromRaw(this.state.entry).getPlainText()
            getTokenTone()
            .then((token) => {
                return analyzeTone.call(this, token, text, entryId, userId)})
            .then( insightObject => {
                // return db.collection('toneInsights').where("entryId", "==", this.props.entryId).get()
                // .then(querySnap => {
                //     const helperArr = []
                //     querySnap.forEach(snap => {
                //         helperArr.push(snap.data())
                //     })
                //     if(helperArr[0]){
                //         console.log("got the newly created insight")
                //         this.setState({...this.state,insight:helperArr[0], needsNewInsight: false})}
                //     else{
                //         console.log("did not get the newly created tone")}})}

            console.log("Set the object to state:", JSON.stringify(insightObject.response))
            this.setState({...this.state, needsNewInsight: false})

            }
            )

        }
    }

    render(){
        console.log("state: ", this.state)
        return(
            <div>Insights :)</div>
        )
    }
}

export default withAuth(ToneInsights);
