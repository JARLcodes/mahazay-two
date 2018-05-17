import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {db} from '../utils/firebase.config'
import Button from "material-ui/Button";
import Icon from 'material-ui/Icon';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid';
import { withAuth } from 'fireview';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { withTheme } from 'material-ui/styles';

import { getRootRef } from '../utils/componentUtils';

BigCalendar.momentLocalizer(moment);

const styles = theme =>({
  delete: {
    alignSelf: 'center',
    width: '5%',
    marginLeft: '2%',
    backgroundColor: "#EF9A9A",
    color: "#fff"
  }
})

export class SingleJournal extends Component {
  constructor(props){
    super(props);
    this.state = {
      entries: [],
      events:[],
      insights: [],
      journal: getRootRef('journals', this.props.match.params.journalId) //db.collection('journals')
    }
    this.addEntry = this.addEntry.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.checkColor = this.checkColor.bind(this);

  }

  addEntry(){
    const todaysEntry = this.state.entries.filter(entry => (new Date(entry.dateCreated) - new Date(new Date().setHours(0,0,0,0)) === 0 ))[0]
    todaysEntry ? this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${todaysEntry.entryId}`)
    :
    getRootRef('entries').add({ dateCreated: (new Date()).setHours(0,0,0,0),
                                journalId: this.props.match.params.journalId,
                                userId: this.props._user.uid
                              })
      .then(docRef =>
        this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${docRef.id}`));
  }

  componentWillReceiveProps(nextProps){
    console.log("props: ", this.props)
    if(this.props._user !== nextProps._user){
      db.collection('entries')
      .where('journalId', '==', this.props.match.params.journalId).get()
      .then(querySnapshot => {
        console.log('setting entries on state snap', querySnapshot);
        querySnapshot.forEach(entry => {
          this.setState({...this.state, entries: [...this.state.entries, {entryId: entry.id, dateCreated: entry.data().dateCreated, content: entry.data().content, journalId: entry.data().journalId }], events: [...this.state.events, {title: "View Journal Entry", entryId: entry.id, start: new Date(entry.data().dateCreated), end: new Date(entry.data().dateCreated) + 1}]})
        })
      })
      db.collection('toneInsights')
      .where('journalId', '==', this.props.match.params.journalId).get()
      .then(querySnapshot => {
        console.log('setting insights on state snap', querySnapshot);
        querySnapshot.forEach(insight => {
          this.setState({...this.state, insights: [...this.state.insights,{entryId: insight.data().entryId, parsedInsight: insight.data().parsedToneInsight, }]})
        })
      })
      console.log("HIT THIS AT THE END IN RECEIVE PROPS")
    }
  }

  handleSelect(calendarEvent, event){
    this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${calendarEvent.entryId}`)
  }

  checkColor(event, start, end, isSelected){
    let background;
    let arrInsights = this.state.insights;
    console.log("arrof insights:", arrInsights, "event.entryId:", event.entryId)
    let correctInsight = arrInsights.filter(insight => {
      return insight.entryId == event.entryId})[0]
    let arr = [];
    let highest = {};
    console.log("correctInsight: ", correctInsight)
    if(correctInsight){
      correctInsight.parsedInsight.forEach(
          category => {
              category.tones.forEach(tone => {
                  arr.push({emotion: tone["tone_name"], score: tone.score})
              })
          }
      )
    }
    console.log("arr:", arr)
    arr.forEach(tone => {
      if((!highest.score || tone.score > highest.score) && tone.emotion !== "Emotional Range" ){
        highest = tone
      }
    })
    console.log("HIGHEST:", highest)
    switch(highest.emotion) {
      case "Anger" :
        background = "#C62828"
        break;
      case "Disgust" :
        background = "#827717"
        break;
      case "Fear" :
        background = "#757575"
        break;
      case "Joy" :
        background = "#F3E5F5"
        break;
      case "Sadness" :
        background = "#546E7A"
        break;
      case "Analytical" :
        background = "#FFB74D"
        break;
      case "Confident" :
        background = "#FFFF00"
        break;
      case "Tenative" :
        background = "#BCAAA4"
        break;
      case "Openness" :
        background = "#B2FF59"
        break;
      case "Conscientiousness" :
        background = "#69F0AE"
        break;
      case "Agreeableness" :
        background = "#80D8FF"
        break;
      case "Extraversion" :
        background = "#9C27B0"
        break;
      default:
        background = "#FFF3E0"
        break;
      }


    // Math.floor((Math.random() * 10)) % 2 === 0 ? background = '#F48FB1' : background ="#81C784"

    return {style : {background, color: "black"}}
  }

  deleteJournal(journal){
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete this journal?',
      buttons: [
        {
          label: 'Yes, delete journal',
          message: 'This will also delete all entries in this journal',
          onClick: () => {
            journal.delete()
              .then(() => {
                return getRootRef('entries').where('userId', '==', this.props._user.uid).get()
              })
              .then(querySnapshot => {
                querySnapshot.forEach(doc => doc.ref.delete())
              })
              .then(() => this.props.history.push('/journals'))
          }
        },
        {
          label: 'No, keep journal',
          onClick: () => this.props.history.push(`/journals/${this.props.match.params.journalId}`)
        }
      ]
    })

  }

  render() {
    const entries = this.state.entries
    const events = this.state.events
    console.log("state in render", this.state)
    return (
      <div>
        <div style={{"paddingLeft": 24 + "px", "paddingRight": 24 + "px", "marginBottom": 24 +"px" }}>
          <BigCalendar eventPropGetter={this.checkColor} defaultDate={new Date()} events={events} views={['month']} style={{height: 350 + "px"}} onSelectEvent={this.handleSelect} />

        </div>

        <Grid container style={{justifyContent: "flex-end", "paddingLeft": 24 + "px", "paddingRight": 24 + "px", "marginBottom": 10 +"px"}}>
          <Tooltip title = "Add Today's Entry" placement="top">
            <Button variant ="fab" color="primary" onClick={this.addEntry}><Icon>edit_icon</Icon></Button>
          </Tooltip>
          <Button variant="raised" style={styles.delete} onClick={this.deleteJournal.bind(this, this.state.journal)}>Delete Journal</Button>
        </Grid>
      </div>
    )
  }
}

export default withTheme()(withAuth(SingleJournal));
