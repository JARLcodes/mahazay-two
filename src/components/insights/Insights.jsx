import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { getRootRef } from '../../utils/componentUtils';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

export default class Insights extends Component {
    constructor () {
        super();
        this.state = {
            personalityRootRef: getRootRef('personalityInsights'),
            toneRootRef: getRootRef('toneInsights'),
            tones: [],
        }
    }

    componentDidMount(){
        // if(this.props._user !== nextProps._user){
          const { toneRootRef } = this.state;
          toneRootRef.get()
            .then(querySnapshot => {
              querySnapshot.forEach(tone => {
                  tone.data().parsedToneInsight.forEach(toneInsight => {
                      toneInsight.tones.forEach(toneCategory => {
                        // const toneCategoryScoreArr = []

                        //   if(toneCategory.tone_name){
                        //       toneCategoryScoreArr.push(toneCategory.score)
                        //   }
                        //   const toneAvg = toneCategoryScoreArr.reduce((acc, score) => (acc + score) / toneCategoryScoreArr.length)

                          this.setState({tones: [...this.state.tones, {[toneCategory.tone_name]: toneCategory.score}]})
                      })
                  })
              })
            })
            console.log("I rerendered")
        //   }
      }
    
    render () {
        // const ref = this.state.toneRootRef
        // ref.get().then(snapshot => snapshot.forEach(tone => tone.data().parsedToneInsight.forEach(toneInsight => toneInsight.tones.forEach(toneCategory => console.log(toneCategory.tone_name, ": ", toneCategory.score)))))
        console.log("tones: ", this.state.tones)
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
  