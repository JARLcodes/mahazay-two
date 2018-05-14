import React, { Component } from 'react';
import Chip from 'material-ui/Chip/Chip.js';
import Paper from 'material-ui/Paper/Paper.js';
import MenuItem from 'material-ui/Menu/MenuItem.js';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import keycode from 'keycode';
import PropTypes from 'prop-types';


const styles = {
  root: {
    flexGrow: 1,
    height: 250,
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

const renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
    {suggestion.label}
    </MenuItem>
  )
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
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

const getSuggestions = inputValue => {
  let count = 0;
  return suggestions.filter(suggestion => {
    const keep = 
      (!inputValue || suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) && count < 5;

    count = keep ? count += 1 : count;
    return keep;
  });

};

class DownshiftMultiple extends Component {
  state = {
    inputValue: '', 
    selectedItem: []
  };

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange(item){
    let { selectedItem } = this.state;
    if(selectedItem.indexOf(item) === -1){
      selectedItem = [...selectedItem, item]
    };
    
    this.setState({
      inputValue: '', 
      selectedItem
    })

  };

  handleDelete = item => () => {
    const selectedItem = [...this.state.selectedItem];
    selectedItem.splice(selectedItem.indexOf(item), 1);

    this.setState({ selectedItem });
  };

  render() {
    const { inputValue, selectedItem } = this.state;
    console.log('selectedItem', selectedItem);
    return (
      <div>
        <Downshift
          inputValue={inputValue}
          onChange={this.handleChange.bind(this)}
          selectedItem={selectedItem}
        >
          {({
            getInputProps, 
            getItemProps, 
            isOpen, 
            inputValue: inputValue2, 
            selectedItem: selectedItem2, 
            highlightedIndex,
          }) => (
            <div style={styles.container}>
              {renderInput({
                fullWidth: true, 
                InputProps: getInputProps({
                  startAdornment: selectedItem.map(item => (
                    <Chip 
                      key={item}
                      tabIndex={-1}
                      label={item}
                      onDelete={this.handleDelete(item)}
                    />
                  )), 
                  onChange: this.handleInputChange, 
                  onKeyDown: this.handleKeyDown, 
                  placeholder: 'Select multiple countries', 
                  id: 'integration-downshift-multiple'
                })
              })}
              { isOpen 
              ? (
                <Paper style={styles.paper} square>
                  {getSuggestions(inputValue2).map((suggestion, index) => 
                    renderSuggestion({
                      suggestion, index, itemProps: getItemProps({ item: suggestion.label }), 
                      highlightedIndex, 
                      selectedItem: selectedItem2,
                    })
                  )}
                </Paper>
              )
              : null}
            </div>
          )}
        </Downshift>
      </div>
    )
  }
}





// IntegrationDownshift.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


export default IntegrationDownshift;