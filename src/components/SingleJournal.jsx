import React, { Component } from 'react';
import {db} from '../utils/firebase.config'
import Button from "material-ui/Button";
import AddIcon from '@material-ui/icons/Add'
import Icon from 'material-ui/Icon';
import Card, { CardContent } from 'material-ui/Card';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid';
import { withAuth } from 'fireview';
import { Link } from 'react-router-dom';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import { getRootRef } from '../utils/componentUtils';

BigCalendar.momentLocalizer(moment);

export class SingleJournal extends Component {
  constructor(props){
    super(props);
    this.state = {
      entries: [],
      events:[]
    }
    this.addEntry = this.addEntry.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

  }

  addEntry(){
    const todaysEntry = this.state.entries.filter(entry => (new Date(entry.dateCreated) - new Date(new Date().setHours(0,0,0,0)) === 0 ))[0]
    console.log("ENTRY:", todaysEntry)
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
    if(this.props._user !== nextProps._user){
      let entries = []
      db.collection('entries')
      .where('journalId', '==', this.props.match.params.journalId).get()
      .then(querySnapshot => {
        querySnapshot.forEach(entry => {
          this.setState({entries: [...this.state.entries, {entryId: entry.id, dateCreated: entry.data().dateCreated, content: entry.data().content, journalId: entry.data().journalId }], events: [...this.state.events, {title: "View Journal Entry", entryId: entry.id, start: new Date(entry.data().dateCreated), end: new Date(entry.data().dateCreated) + 1}]})
        })
      })
    }
  }

  handleSelect(calendarEvent, event){
    this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${calendarEvent.entryId}`)
  }

  render() {
    const entries = this.state.entries
    const events = this.state.events
    return (
      <div>
        <div style={{"paddingLeft": 24 + "px", "paddingRight": 24 + "px", "marginBottom": 24 +"px" }}>
          <BigCalendar defaultDate={new Date()} events={events} views={['month']} style={{height: 350 + "px"}} onSelectEvent={this.handleSelect} />

        </ div>
        {/* <Grid container spacing={24} style={{"padding-left": 24 + "px", "padding-right": 24 + "px", "margin-bottom": 24 +"px" }}>
        { entries.map( entry => {
          return (
            <Grid key={entry.entryId} item xs={3} >
              <Card>
                <CardContent>
                  <Link style={{ textDecoration: 'none' }} to={`/journals/${entry.journalId}/entries/${entry.entryId}`}>"{entry.content && entry.content.blocks[0].text ? entry.content.blocks[0].text.substr(0, 20) + "..." : "A Blank Page"}"</Link>
                </CardContent>
              </Card>
            </Grid>
          )}
        )}
        </Grid> */}
        <Grid container style={{justifyContent: "flex-end", "paddingLeft": 24 + "px", "paddingRight": 24 + "px", "marginBottom": 10 +"px"}}>
          <Tooltip title = "Add Today's Entry" placement="top">
            <Button variant ="fab" color="primary" onClick={this.addEntry}><Icon>edit_icon</Icon></Button>
          </Tooltip>
        </Grid>
      </div>
    )
  }
}

export default withAuth(SingleJournal);
