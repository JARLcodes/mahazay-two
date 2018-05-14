import React, { Component } from 'react';
import Button from "material-ui/Button";
import Chip from 'material-ui/Chip/Chip.js';
import Paper from 'material-ui/Paper/Paper.js';
import MenuItem from 'material-ui/Menu/MenuItem.js';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import keycode from 'keycode';
import PropTypes from 'prop-types';
import { convertFromRaw } from 'draft-js';

import { getRootRef } from '../utils/componentUtils';

const styles = {
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
  },
  
  inputRoot: {
    flexWrap: 'wrap',
  },
};


const renderInput = inputProps => {
  const { InputProps, ref, ...other } = inputProps;
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps, 
      }}
      {...other}
    />
  )
};



class Searchbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      userEntries: [],  
      userJournals: []
    };
    this.getSuggestions = this.getSuggestions.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
  };

  componentDidMount(){
    getRootRef('entries').where('userId', '==', this.props.userId).get()
      .then(querySnaps => {
        querySnaps.forEach(entry => {
          this.setState({ userEntries: [...this.state.userEntries, entry]})
        })
      });
    getRootRef('journals').where('userId', '==', this.props.userId).get()
      .then(querySnaps => {
        querySnaps.forEach(journal => {
          this.setState({ userJournals: [...this.state.userJournals, journal]})
        })
      })
  };

  goToEntry(entryId, journalId){
    console.log('this.props', this.props);
    // this.props.history.push(`/journals/${journalId}/entries/${entryId}`)
  }

  getSuggestions(inputValue){
    const { userEntries, userJournals } = this.state;
    let count = 0;
    const entryArray = userEntries.filter(entry => {
      const entryPlainText = convertFromRaw(entry.data().content).getPlainText();
      const keep = 
        (!inputValue || entryPlainText.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) && count < 5;
     
      count = keep ? count += 1 : count;
      return keep;
    })
    
    return entryArray;
  
  };

  renderSuggestion ({ userEntry, index, itemProps, highlightedIndex, selectedItem }){
    const isHighlighted = highlightedIndex === index;
    const entryPlainText = convertFromRaw(userEntry.data().content).getPlainText();
    console.log('selectedItem', selectedItem);
    const isSelected = (selectedItem || '').indexOf(entryPlainText) > -1;
    
    return (
      <Button onClick={this.goToEntry.bind(this, userEntry.id, userEntry.data().journalId)}>
        <MenuItem
          {...itemProps}
          key={userEntry.id}
          selected={isHighlighted}
          component="div"
          style={{
            fontWeight: isSelected ? 500 : 400,
          }}
        >
        {entryPlainText}
        </MenuItem>
      </Button>
    )
    
  }

  render(){
    return (
      <div style={styles.root}>
      <Downshift>
        {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
          <div style={styles.container}>
            {renderInput({
              fullWidth: true,
              InputProps: getInputProps({
                placeholder: 'Search by entry',
                id: 'integration-downshift-simple',
              }),
            })}
            {isOpen ? (
              <Paper style={styles.paper} square>
                {this.getSuggestions(inputValue).map((userEntry, index) =>
                  this.renderSuggestion({
                    userEntry,
                    index,
                    itemProps: getItemProps({ item: userEntry }),
                    highlightedIndex,
                    selectedItem,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    </div>
    )
  }
}


export default Searchbar;