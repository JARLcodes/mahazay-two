import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { EditorState, RichUtils, convertFromRaw, convertToRaw, ContentState } from "draft-js";
import {VictoryChart, VictoryArea, VictoryTheme, VictoryPolarAxis} from 'victory'

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
                    this.setState({...this.state,insight:helperArr[0]})
                }
                else{
                    console.log("got nothing here")
                    this.getInsight()
                }
            })}


    }


    getInsight(){
        if(this.state.entry.blocks){
            const entryId = this.props.entryId
            const userId = this.state.userId
            const text = convertFromRaw(this.state.entry).getPlainText()
            getTokenTone()
            .then((token) => {
                return analyzeTone.call(this, token, text, entryId, userId)})
        }
    }

    render(){
        console.log("state: ", this.state)
        let insight;
        this.state.insight.entryId ? insight = this.state.insight : insight = null
        let arr = [];
        if(insight){
            insight.parsedToneInsight.forEach(
                category => {
                    category.tones.forEach(tone => {
                        arr.push({x: tone["tone_name"], y: tone.score})
                    })
                }
            )
        }
        return(
            <div>
                <p>:)</p>
                {insight ?
                <div>
                    <p>These were the tones that were reflected in your entry and their relative</p>
                    <VictoryChart polar theme={VictoryTheme.material}>
                        <VictoryPolarAxis dependentAxis
                            style={{ axis: { stroke: "none" } }}
                            tickFormat={() => null}
                        />
                        <VictoryPolarAxis/>
                        <VictoryArea
                            data={arr}
                            style={{
                            data: { fill: "#c43a31" },
                            }}
                        />
                    </VictoryChart>
                </div>
                : <div>Fetching your insights!</div>}
            </div>
        )
    }
}

export default withAuth(ToneInsights);

