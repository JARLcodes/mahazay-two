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
import Face from '@material-ui/icons/Face';
import Star from '@material-ui/icons/Star';
import ChatBubble from '@material-ui/icons/ChatBubble';





export class Insights extends Component {
    constructor () {
        super();
        this.state = {
            personalityLikes: [],
            personalityUnlikes: [],
            personality: [],
            needs: [],
            values: []
        }
    }

    componentWillReceiveProps(nextProps){

        if(this.props._user !== nextProps._user){

            getRootRef('personalityInsights', this.props.entry.id).get()
            .then(snap => {
                //helper functions
                const filter = (obj, num) => obj.score === num;
                const percent = num => Math.floor(num * 100) + "%"
                
                //consumption preferences data
                const consumptionPreferences = Array.from(snap.data().consumption_preferences)
                const flattenedConsumptionArray = []

                consumptionPreferences.forEach(preference => {
                    Array.from(preference.consumption_preferences)
                    .forEach(realPreference => {
                        flattenedConsumptionArray.push({name: realPreference.name, score: realPreference.score})
                    })
                })

                const likely = flattenedConsumptionArray.filter(preference => filter(preference, 1))
                const unlikely = flattenedConsumptionArray.filter(preference => filter(preference, 0))

                // personality data
                const personalityArr = Array.from(snap.data().personality)
                const finalPersonalityArr = []

                personalityArr.forEach(personality => {
                    finalPersonalityArr.push({name: personality.name, percentile: percent(personality.percentile)})
                })

                // needs data
                const needsArr = Array.from(snap.data().needs)
                const finalNeedsArr = []

                needsArr.forEach(need => {
                    finalNeedsArr.push({name: need.name, percentile: percent(need.percentile)})
                })

                // values data
                const valuesArr = Array.from(snap.data().values)
                const finalValuesArr = []

                valuesArr.forEach(value => {
                    finalValuesArr.push({name: value.name, percentile: percent(value.percentile)})
                })
                console.log("finalValuesArr", finalValuesArr)

                this.setState({personalityLikes: likely, personalityUnlikes: unlikely, personality: finalPersonalityArr, needs: finalNeedsArr, values: finalValuesArr})
                    
        })
        console.log("I rerendered")
        }
    }
    
    
    render () {
        console.log("state", this.state.personality)
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
                        <Paper style={styles.paper}>
                            <Typography variant="title" gutterBottom align="center">I have...</Typography>
                            <List style={styles.list}>
                                {
                                    this.state.personality.map((personality, ind) => (
                                        <ListItem key={ind}>
                                        <ListItemIcon><Face/></ListItemIcon>
                                        {personality.name}: {personality.percentile}
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Paper style={styles.paper}>
                            <Typography variant="title" gutterBottom align="center">I need...</Typography>
                            <List style={styles.list}>
                                {
                                    this.state.needs.map((need, ind) => (
                                        <ListItem key={ind}>
                                        <ListItemIcon><Star/></ListItemIcon>
                                        {need.name}: {need.percentile}
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={8} sm={4}>
                        <Paper style={styles.paper}>
                        <Typography variant="title" gutterBottom align="center">I value...</Typography>
                            <List style={styles.list}>
                                {
                                    this.state.values.map((value, ind) => (
                                        <ListItem key={ind}>
                                        <ListItemIcon><ChatBubble/></ListItemIcon>
                                        {value.name}: {value.percentile}
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </Paper>
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

