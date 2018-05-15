import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { getRootRef, getIds } from '../../utils/componentUtils';
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
            personalityRootRef: getRootRef('personalityInsights'),
            toneRootRef: getRootRef('toneInsights'),
            tones: []
        }
        // this.getPersonalityInsight = this.getPersonalityInsight.bind(this);
    }

    componentDidMount(){
      }
    
    render () {

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
    // root: {
    //     fontFamily: 'Merienda One',
    //     flexGrow: 1,
    //     backgroundImage: "url('https://i.pinimg.com/564x/d6/3b/f1/d63bf1221116ebb6102c77e7e9a74808.jpg')",
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
    //     opacity: "0.5"
    // },
    // title: {
    //     fontFamily: 'Merienda One',
    //     fontSize: 40,
    //     padding: '3vh',
    //     color: '#795548'
    // },
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