import React, { Component } from 'react';
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

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

const renderSuggestion = ({ userEntry, index, itemProps, highlightedIndex, selectedItem }) => {
  console.log('rendering userEntry suggestion', userEntry);
  console.log('render suggestion index', index);
  console.log('render suggestion highlightedIndex', highlightedIndex);
  const isHighlighted = highlightedIndex === index;
  // console.log('rendering suggestion isHighlighted', isHighlighted);
  // const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  // return (
  //   <MenuItem
  //     {...itemProps}
  //     key={suggestion.label}
  //     selected={isHighlighted}
  //     component="div"
  //     style={{
  //       fontWeight: isSelected ? 500 : 400,
  //     }}
  //   >
  //   {suggestion.label}
  //   </MenuItem>
  // )
  return <div key={userEntry.id}></div>
}





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



class IntegrationDownshift extends Component {
  constructor(props){
    super(props);
    this.state = {
      userEntries: [],  
      userJournals: []
    };
    this.getSuggestions = this.getSuggestions.bind(this);
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
    // console.log('entryArray in get suggestions', entryArray); //[{suggestion}, {suggestion},...{suggestion}]
    return entryArray;
  
  };

  render(){
    return (
      <div style={styles.root}>
      <Downshift>
        {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
          <div style={styles.container}>
            {renderInput({
              fullWidth: true,
              InputProps: getInputProps({
                placeholder: 'Search a country (start with a)',
                id: 'integration-downshift-simple',
              }),
            })}
            {isOpen ? (
              <Paper style={styles.paper} square>
                {this.getSuggestions(inputValue).map((userEntry, index) =>
                  renderSuggestion({
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


export default IntegrationDownshift;