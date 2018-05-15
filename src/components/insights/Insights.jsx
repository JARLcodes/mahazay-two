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
import List, { ListItem, ListItemIcon, ListItemText}from 'material-ui/List';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';


export class Insights extends Component {
    constructor () {
        super();
        this.state = {
            entryIds: [],
            toneRootRef: getRootRef('toneInsights'),
            tones: [],
            personalityLikes: [],
            personalityUnlikes: [],
            personality: [],
            needs: [],
            values: []
        }
    }

    componentWillReceiveProps(nextProps){

        if(this.props._user !== nextProps._user){
            const { toneRootRef } = this.state;

            getRootRef('personalityInsights', this.props.entry.id).get()
            .then(snap => {
                const consumptionPreferences = Array.from(snap.data().consumption_preferences)
                const flattenedConsumptionArray = []

                consumptionPreferences.forEach(preference => {
                    Array.from(preference.consumption_preferences)
                    .forEach(realPreference => {
                        flattenedConsumptionArray.push({name: realPreference.name, score: realPreference.score})
                    })
                })

                const filter = (obj, num) => obj.score === num;
                const likely = flattenedConsumptionArray.filter(preference => filter(preference, 1))
                const unlikely = flattenedConsumptionArray.filter(preference => filter(preference, 0))
                this.setState({personalityLikes: likely, personalityUnlikes: unlikely})
                    
        })
        console.log("I rerendered")
        }
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
                        <Paper style={styles.paper}>
                            <Typography variant="title" gutterBottom align="center">You are likely to...</Typography>
                            <List style={styles.list}>
                                {
                                    this.state.personalityLikes.map((like, ind) => (
                                        <ListItem key={ind}>
                                        <ListItemIcon><ThumbUp/></ListItemIcon>
                                        {like.name.slice(9)}
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper style={styles.paper}>
                            <Typography variant="title" gutterBottom align="center">You are unlikely to...</Typography>
                            <List style={styles.list}>
                                {
                                    this.state.personalityUnlikes.map((unlike, ind) => (
                                        <ListItem key={ind}>
                                        <ListItemIcon><ThumbDown/></ListItemIcon>
                                        {unlike.name.slice(9)}
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper style={styles.paper}>Habits</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper style={styles.paper}>Moods: ToneInsightsComponent</Paper>
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
    title: {
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
        alignItems: 'flex-start',
        alignContent: 'center'
    },
    list: {
        alignItems: 'right'
    }
  };
  
  export default withAuth(Insights);

