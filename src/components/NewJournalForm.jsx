import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
// import { InputAdornment } from 'material-ui/Input';
import Button from "material-ui/Button";
import { getRootRef } from '../utils/componentUtils';


const styles = {
  addJournalForm: {
    display: "flex",
    flexDirection: "column", 
    alignItems: "center"
  },
  textField: {
    color: '#FAFAFA',
    width: "20%", 
    
  },
  addJournalButton: {
    color: "#A1887F",
    width: "20%",
    marginTop: "1em",
    borderRadius: "0.5em", 
    textDecoration: "none"

  }
};

export default class NewJournalForm extends Component {
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
        this.setState({journals: [...this.state.journals, journal]});
      })
    );
  }
  onChange(event){
    this.setState({ [event.target.name] : event.target.value });
  }

  addJournal(e){
    // if user has either pressed enter (e.charCode = 13) from description field or clicked on add journal ( for which e on input is undefined ), will be directed to new or existing journal
    if (e.which === 13 || !e.charCode){
      const data = { title: this.state.title, description: this.state.description, userId: this.props.match.params.userId };
      const titleObjects = this.state.journals.map(journal => { return { title: journal.data.title, id: journal.journalId }; });
      const titleExists = titleObjects ? titleObjects.filter(titleObject => titleObject.title === data.title) : [];

      titleExists.length > 0 
      ? this.props.history.push(`/journals/${titleExists[0].id}`) 
      : getRootRef('journals').add(data)
          .then(journal => this.props.history.push(`/journals/${journal.id}`));
    }
    
    
  }

  render() {

    return (
      <div >
        <form style={styles.addJournalForm}>
          <TextField
            id="search"
            type="search"
            style={styles.textField}
            label="Title"
            onChange={this.onChange}
            name="title"
          />
            <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            style={styles.textField}
            onChange={this.onChange}
            name="description"
            onKeyPress={this.addJournal.bind(this)}
          />
          <Button style={styles.addJournalButton} onClick={this.addJournal.bind(this)}>New Journal</Button>
        </form>
      </div>
    );
  }
}
