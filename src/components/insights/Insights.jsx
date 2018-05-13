import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { getRootRef, getIds } from '../../utils/componentUtils';
import {db} from '../../utils/firebase.config'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

export class Insights extends Component {
    constructor () {
        super();
        this.state = {
            entryIds: [],
            entryRootRef: getRootRef('entries'),
            personalityRootRef: getRootRef('personalityInsights'),
            toneRootRef: getRootRef('toneInsights'),
            tones: []
        }
        this.filterByTone = this.filterByTone.bind(this);
        this.getPersonalityInsight = this.getPersonalityInsight.bind(this);
    }

    getPersonalityInsight (id){
       return getRootRef('personalityInsights', id);
    }

    filterByTone(toneName){
        const tones = this.state.tones
        return tones.filter(tone => tone.tone_name === toneName)
    }

    componentWillReceiveProps(nextProps){
        console.log("props", this.props, "nextProps", nextProps)
        if(this.props._user !== nextProps._user){
            const { personalityRootRef, toneRootRef } = this.state;
            // console.log(toneRootRef)
            // personalityRootRef.get()
            //     .then(snap => {
            //         snap.forEach(personalityDoc => {
            //             // console.log(personalityDoc)
            //             // console.log(personalityDoc.id, personalityDoc.data())
            //         })
            //     })

            toneRootRef.where("userId", "==", nextProps._user.uid).get()
                .then(querySnapshot => {
                    // console.log(querySnapshot)
                    querySnapshot.forEach(toneDoc => {
                        // console.log("toneDoc data: ", toneDoc.data())
                        toneDoc.data().parsedToneInsight.forEach(toneInsight => {
                            // console.log("tones: ", toneInsight.tones)
                            toneInsight.tones.forEach(toneCategory => {
                                // console.log("tone: ", toneCategory)

                            this.setState({tones: [...this.state.tones, {[toneCategory.tone_name]: toneCategory.score}]})
                        })
                    })
                })
            })
            console.log("I rerendered")
        }
    }
    
    render () {
        // const ref = this.state.toneRootRef
        // ref.get().then(snapshot => snapshot.forEach(tone => tone.data().parsedToneInsight.forEach(toneInsight => toneInsight.tones.forEach(toneCategory => console.log(toneCategory.tone_name, ": ", toneCategory.score)))))
        // console.log("tones: ", this.state.tones)
        // console.log(this.state.tones.map(tone => tone.tone_name === "Anger"))
        console.log(this.getPersonalityInsight("F6NdwZ3uE0Awr0MDN8Zj"))
        
        return (
            <div>
                <div style={styles.appBar}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">
                                My Insights
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <Grid container spacing={8} style={styles.grid}>
                    <Grid item xs={12} sm={6}>
                        <Paper style={styles.paper}>Summary</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper style={styles.paper}>You are likely to...</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper style={styles.paper}>You are unlikely to...</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper style={styles.paper}>Habits</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper style={styles.paper}>Moods</Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper style={styles.paper}>Sunburst Data Visual</Paper>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Paper style={styles.paper}>Personality</Paper>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Paper style={styles.paper}>Needs</Paper>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Paper style={styles.paper}>Values</Paper>
                    </Grid>
                    </Grid>
            </div>
        )
    }
}

const styles = {
    root: {
      flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
    },
    grid: {
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center'
    }
  };
  
  export default withAuth(Insights);