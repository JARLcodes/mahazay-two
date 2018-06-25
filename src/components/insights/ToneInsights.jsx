import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { convertFromRaw } from "draft-js";
import {VictoryChart, VictoryArea, VictoryTheme, VictoryAxis } from 'victory'
import { withTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import { getRootRef } from '../../utils/componentUtils';
import {db} from '../../utils/firebase.config'
import { getTokenTone, analyzeTone } from '../../utils/watsonFuncs.js'

export class ToneInsights extends Component {
    constructor (){
        super();
        this.state = {
            insight:{},
            entry: {},
            userId: null,
            journalId: null
        }
        this.getInsight = this.getInsight.bind(this);
    }

    componentDidMount(){
            if(! this.state.entry.blocks){
                getRootRef('entries', this.props.entryId)
                .get()
                .then(entry => this.setState({...this.state, journalId:entry.data().journalId , entry: entry.data().content, userId: entry.data().userId}))
            }
            if (!this.state.insight.entryId){
                db.collection('toneInsights').where("entryId", "==", this.props.entryId).get()
            .then(querySnap => {
                const helperArr = []
                const text = convertFromRaw(this.state.entry).getPlainText()
                querySnap.forEach(snap => {
                    helperArr.push(snap.data())
                })
                //&& (Math.abs(helperArr[0].text.length - text.length) <= 10) )
                if(helperArr[0] && (Math.abs(helperArr[0].text.length - text.length) <= 10)) {
                    console.log("helper[0]:", helperArr[0], "Text:", text)
                    this.setState({...this.state,insight:helperArr[0]})
                }
                else{
                    console.log("text:", text)
                    this.getInsight(text)
                }
            })}


    }


    getInsight(text){
        if(this.state.entry.blocks){
            const entryId = this.props.entryId
            const userId = this.state.userId
            const journalId = this.state.journalId
            getTokenTone()
            .then((token) => {
                return analyzeTone.call(this, token, text, entryId, journalId, userId)})
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

                {insight ?
                <Grid container>
                    <p>These were the tones that were reflected in your entry and their relative strength:</p>
                    <VictoryChart theme={VictoryTheme.material} margin = {100 +"px"} >
                        <VictoryAxis independent orientation ="bottom"
                            style={{
                                axis: {stroke: "#756f6a"},
                                ticks: {stroke: "grey", size: 5},
                                tickLabels: {fontSize: 5, padding: 25, margin: 10, verticalAnchor: "middle", angle: 450 }
                            }} />
                        <VictoryAxis  dependent orientation = "left" />

                        <VictoryArea
                            data={arr}
                            style={{
                            data: { fill: "#FFA726" }
                            }}
                        />
                    </VictoryChart>
                </Grid>
                : <div>Fetching your insights!</div>}
            </div>
        )
    }
}

export default withTheme()(withAuth(ToneInsights));

