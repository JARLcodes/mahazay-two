import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { getRootRef, getIds } from '../../utils/componentUtils';
import {db} from '../../utils/firebase.config'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText}from 'material-ui/List';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';

import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import Face from '@material-ui/icons/Face';
import Star from '@material-ui/icons/Star';
import ChatBubble from '@material-ui/icons/ChatBubble';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const PersonalityTextSummaries = require('personality-text-summary');

// locale is one of {'en', 'es', 'ja', 'ko'}.  version refers to which version of Watson Personality Insights to use, v2 or v3.
const v3EnglishTextSummaries = new PersonalityTextSummaries({ locale: 'en', version: 'v3' });

export class Insights extends Component {
    constructor () {
        super();
        this.state = {
            personalityLikes: [],
            personalityUnlikes: [],
            personality: [],
            needs: [],
            values: [],
            summary: "",
            expanded: null
        }
    }

    handleChange = panel => (event, expanded) => {
        this.setState({expanded: expanded ? panel : false})
    }

    componentWillReceiveProps(nextProps){

        if(this.props._user !== nextProps._user){

            getRootRef('personalityInsights', this.props.entry.id).get()
            .then(snap => {

                // retrieve the summary for a specified personality profile (json)
                const textSummary  = v3EnglishTextSummaries.getSummary(snap.data());

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
                // console.log("finalValuesArr", finalValuesArr)

                this.setState({personalityLikes: likely, personalityUnlikes: unlikely, personality: finalPersonalityArr, needs: finalNeedsArr, values: finalValuesArr, summary: textSummary})
                    
        })
        console.log("I rerendered")
        }
    }
    
    
    render () {
        const { 
            personalityLikes, 
            personalityUnlikes,
            personality,
            needs,
            values,
            summary,
            expanded
        } = this.state;

        // console.log("state", this.state.personality)

        return (
            <div style={styles.root}>
                <div style={styles.title}>My Insights</div>
                <div>
                    <Grid container spacing={8} style={styles.grid}>
                        <Grid item xs={8} sm={4}>
                            <Paper style={styles.paper}>
                                <Typography variant="title" gutterBottom align="center">Summary</Typography>
                                <Typography variant="subheading" align="justify">{summary}</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Paper style={styles.paper}>Sunburst Data Visual</Paper>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Paper style={styles.paper}>Habits</Paper>
                        </Grid>
                        <Grid item xs={8} sm={4}>
                            <Paper style={styles.paper}>Moods: ToneInsightsComponent</Paper>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="title" gutterBottom align="center">You are likely to...</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List style={styles.list}>
                            {
                                personalityLikes.map((like, ind) => (
                                    <ListItem key={ind}>
                                    <ListItemIcon><ThumbUp/></ListItemIcon>
                                    {like.name.slice(9)}
                                    </ListItem>
                                ))
                            }
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="title" gutterBottom align="center">You are unlikely to...</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List style={styles.list}>
                            {
                                personalityUnlikes.map((unlike, ind) => (
                                    <ListItem key={ind}>
                                    <ListItemIcon><ThumbDown/></ListItemIcon>
                                    {unlike.name.slice(9)}
                                    </ListItem>
                                ))
                            }
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="title" gutterBottom align="center">My Personality</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List style={styles.list}>
                            {
                                personality.map((personality, ind) => (
                                    <ListItem key={ind}>
                                    <ListItemIcon><Face/></ListItemIcon>
                                    {personality.name}: {personality.percentile}
                                    </ListItem>
                                ))
                            }
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="title" gutterBottom align="center">My Needs</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List style={styles.list}>
                            {
                                needs.map((need, ind) => (
                                    <ListItem key={ind}>
                                    <ListItemIcon><Star/></ListItemIcon>
                                    {need.name}: {need.percentile}
                                    </ListItem>
                                ))
                            }
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="title" gutterBottom align="center">My Values</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List style={styles.list}>
                            {
                                values.map((value, ind) => (
                                    <ListItem key={ind}>
                                    <ListItemIcon><ChatBubble/></ListItemIcon>
                                    {value.name}: {value.percentile}
                                    </ListItem>
                                ))
                            }
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
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

/*
  <Grid item xs={6} sm={3}>
  <Paper style={styles.paper}>

  </Paper>
</Grid>
<Grid item xs={8} sm={4}>
  <Paper style={styles.paper}>

  </Paper>
</Grid>
<Grid item xs={8} sm={4}>
  <Paper style={styles.paper}>

  </Paper>
</Grid>
<Grid item xs={8} sm={4}>
  <Paper style={styles.paper}>

  </Paper>
</Grid>
*/