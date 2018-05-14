import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { getRootRef, getIds } from '../../utils/componentUtils';
// import { ToneInsights } from './ToneInsights';
import { getEntryTone, getJournalTones, getUserTones } from '../../utils/toneUtils.js';
import { getUserPersonality, getEntryPersonality, getJournalPersonality } from  '../../utils/personalityUtils.js'
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
            userId: "",
            entryIds: [],
<<<<<<< HEAD
            toneRootRef: getRootRef('toneInsights'),
            tones: []
        }
        this.getPersonalityInsight = this.getPersonalityInsight.bind(this);
    }

    getPersonalityInsight (id){
       return getRootRef('personalityInsights', id);
    }

    componentWillReceiveProps(nextProps){
        let entryId;
        const entryIds = [];

       

        if(this.props._user !== nextProps._user){
            const { personalityRootRef, toneRootRef } = this.state;
            // console.log(toneRootRef)
            
            // .then(snap => {
            //     getRootRef('personalityInsights').get()
            //     // snap.forEach(personalityDoc => {
            //     //     console.log("personality doc: ", personalityDoc)
            //     // })
            //     // console.log(snap.id, snap.data())
            // })


=======
            personalityRootRef: getRootRef('personalityInsights'),
            toneRootRef: getRootRef('toneInsights'),
            tones: []
        }
        // this.getPersonalityInsight = this.getPersonalityInsight.bind(this);
    }

    // getPersonalityInsight (id){
    //    return getRootRef('personalityInsights', id);
    // }

    componentWillReceiveProps(nextProps){
        let entryId;
        const entryIds = [];

        if(this.props._user !== nextProps._user){
            const { personalityRootRef, toneRootRef } = this.state;
            // console.log(toneRootRef)
            // getUserPersonality(userId).get()
            //     .then(snap => {
            //         console.log("personality: ", snap)
            //         snap.forEach(personalityDoc => {
            //             // console.log(personalityDoc)
            //             // console.log(personalityDoc.id, personalityDoc.data())
            //         })
            //     })

>>>>>>> master
            toneRootRef.where("userId", "==", nextProps._user.uid).get()
                .then(snap => {
                    // console.log("tone: ", snap)
                    snap.forEach(toneDoc => {
                        // console.log("toneDoc data: ", toneDoc.data())
                        entryId = toneDoc.data().entryId
                        if(entryIds.includes(entryId) === false) entryIds.push(entryId)
                        
                        toneDoc.data().parsedToneInsight.forEach(toneInsight => {
<<<<<<< HEAD
                            // console.log("tones: ", toneInsight)
=======
                            console.log("tones: ", toneInsight)
>>>>>>> master
                            toneInsight.tones.forEach(toneCategory => {
                                // console.log("tone: ", toneCategory)

                            // this.setState({tones: [...this.state.tones, {[toneCategory.tone_name]: toneCategory.score}]})
                        })
                    })
                })
            })
            this.setState({userId: nextProps._user.uid, entryIds: entryIds})
            console.log("I rerendered")
        }
    }
    
    render () {
        // const ref = this.state.toneRootRef
        // ref.get().then(snapshot => snapshot.forEach(tone => tone.data().parsedToneInsight.forEach(toneInsight => toneInsight.tones.forEach(toneCategory => console.log(toneCategory.tone_name, ": ", toneCategory.score)))))
        // console.log("tones: ", this.state.tones)
        // console.log(this.state.tones.map(tone => tone.tone_name === "Anger"))
        // .reduce((acc, current) => {
        //     const length = acc.length
        //     if(length === 0 || acc[length-1] !== current){
        //         acc.push(current);
        //     }
        //     return acc;
        // }, [])
        console.log("userId: ", this.state.userId, "entryIds: ", this.state.entryIds)
<<<<<<< HEAD
        if(this.state.entryIds.length){
        for(let i = 0; i < this.state.entryIds.length; i++){
                console.log("ids:", this.state.entryIds[i])
        }}
=======
        
>>>>>>> master
        return (
            <div style={styles.root}>
                <div style={styles.title}>My Insights</div>
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
        fontFamily: 'Merienda One',
        flexGrow: 1,
        backgroundImage: "url('https://i.pinimg.com/564x/d6/3b/f1/d63bf1221116ebb6102c77e7e9a74808.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: "0.5"
    },
    title: {
        fontFamily: 'Merienda One',
        fontSize: 40,
        padding: '3vh',
        color: '#795548'
    },
    paper: {
        padding: '5vh',
        textAlign: 'center',
    },
    grid: {
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center'
    }
  };
  
  export default withAuth(Insights);