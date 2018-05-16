import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/List/ListSubheader';
import Button from "material-ui/Button";
import { getRootRef } from '../utils/componentUtils';
import Add from '@material-ui/icons/Add';
import { withTheme } from 'material-ui/styles';


export class NewJournalForm extends Component {
  constructor(){
    super();
    this.state = {
      rootRef: getRootRef('journals'),
      journals: [],
      allJournalIds: [],
      title: '',
      description: ''
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    getRootRef('journals').get()
      .then(querySnap => querySnap.forEach(journalSnap => {
        const journal = {data: journalSnap.data(), journalId: journalSnap.id};
        this.setState({journals: [...this.state.journals, journal]})
      })
    )
  }
  onChange(event){
    this.setState({ [event.target.name] : event.target.value })
  }

  addJournal(e){
    // if user has either pressed enter (e.charCode = 13) from description field or clicked on add journal ( for which e on input is undefined ), will be directed to new or existing journal
    if (e.which === 13 || !e.charCode){
      const data = { title: this.state.title, description: this.state.description, userId: this.props.match.params.userId };
      const titleObjects = this.state.journals.map(journal => { return { title: journal.data.title, id: journal.journalId } })
      const titleExists = titleObjects ? titleObjects.filter(titleObject => titleObject.title === data.title) : [];

      titleExists.length > 0 
      ? this.props.history.push(`/journals/${titleExists[0].id}`) 
      : getRootRef('journals').add(data)
          .then(journal => this.props.history.push(`/journals/${journal.id}`))
    }
    
    
  }

  render() {

    return (
      <div>
        <Subheader component="div" variant="display1" style={{ fontSize: "2.5em", fontVariant: 'small-caps', color: 'grey' }}>New Journal</Subheader>
        <form style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5%"}}>
          <TextField
            id="search"
            type="search"
            style={{ color: '#FAFAFA', width: "20%",}}
            label="Title"
            onChange={this.onChange}
            name="title"
          />
            <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            style={{ color: '#FAFAFA', width: "20%" }}
            onChange={this.onChange}
            name="description"
            onKeyPress={this.addJournal.bind(this)}
          />
          <Button style={{ color: "#A1887F", width: "20%", marginTop: "1em", borderRadius: "0.5em", textDecoration: "none"}} onClick={this.addJournal.bind(this)}><Add style={{ color: "grey", width: 15, height: "auto"}}/></Button>
        </form>
      </div>
    )
  }
}

export default withTheme()(NewJournalForm);