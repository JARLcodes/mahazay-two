import React, { Component } from 'react';
import { getRootRef } from '../utils/componentUtils';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper/Paper.js';
import MenuItem from 'material-ui/Menu/MenuItem.js';
import Downshift from 'downshift';
import TextField from 'material-ui/TextField';
import InputAdornment from 'material-ui/Input/InputAdornment';
import Search from '@material-ui/icons/Search';
import { convertFromRaw } from 'draft-js';
import { withTheme } from 'material-ui/styles';

class Searchbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEntries: [],
            userJournals: [],
            matchingEntries: []
        };
        this.getSuggestions = this.getSuggestions.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }

    componentDidMount() {
        getRootRef('entries').where('userId', '==', this.props.userId).get()
            .then(querySnaps => {
                querySnaps.forEach(entry => {
                    this.setState({ userEntries: [...this.state.userEntries, entry] });
                });
            });
        getRootRef('journals').where('userId', '==', this.props.userId).get()
            .then(querySnaps => {
                querySnaps.forEach(journal => {
                    this.setState({ userJournals: [...this.state.userJournals, journal] });
                });
            });
    }

    renderInput(inputProps) {
        const { InputProps, ref, ...other } = inputProps;
        return ( <
            TextField InputProps = {
                {
                    inputRef: ref,
                    ...InputProps,
                    endAdornment: <InputAdornment position = "start" > <Search/> </InputAdornment>, 
                }
            } {...other }
            onKeyDown = { this.goToEntry.bind(this, InputProps.value) }
            style = {
                { width: "50%", position: 'flexEnd' }
            }
            />
        );
    }

    goToEntry(value, event) {
        const { userEntries } = this.state;
        userEntries.forEach(entry => {
            const entryPlainText = convertFromRaw(entry.data().content).getPlainText();
            const journalId = entry.data().journalId;
            const entryId = entry.id;
            if (entryPlainText.includes(value) && event.which === 13) this.props.history.push(`/journals/${journalId}/entries/${entryId}`);
        });
    }

    getSuggestions(inputValue) {
        const { userEntries } = this.state;

        let count = 0;
        const entryArray = userEntries.filter(entry => {
            const entryPlainText = convertFromRaw(entry.data().content).getPlainText();
            const keep = (!inputValue || entryPlainText.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) && count < 5;
            count = keep ? count += 1 : count;
            return keep;
        });
        return entryArray;
    }

    renderSuggestion({ userEntry, index, itemProps, highlightedIndex, selectedItem }) {
        const isHighlighted = highlightedIndex === index;
        const entryPlainText = convertFromRaw(userEntry.data().content).getPlainText();
        const isSelected = !selectedItem ? (selectedItem || '').indexOf(entryPlainText) > -1 : false;

        return ( 
            <MenuItem {...itemProps }
            selected = { isHighlighted }
            component = "div"
            style = {
                { fontWeight: isSelected ? 500 : 400 }
            }
            onClick = { this.goToEntry.bind(this, userEntry.id, userEntry.data().journalId) }
            key = { userEntry.id } > { entryPlainText } 
            </MenuItem>
        );
    }

    render() {

        return ( 
            <div style = {{ flexGrow: 1 }} >
            <Downshift itemToString = { item => item === null ? '' : convertFromRaw(item.data().content).getPlainText() }> 
            {
                ({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex, clearSelection }) => ( 
                    <div style = {{ flexGrow: 1, position: 'relative' }}> 
                    {
                        this.renderInput({
                            fullWidth: true,
                            InputProps: getInputProps({
                                placeholder: 'Search by entry',
                                id: 'integration-downshift-simple',
                                onChange: event => {
                                    if (event.target.value === '') clearSelection();
                                }
                            }),
                        })
                    } {
                        isOpen
                            ? ( <Paper style = {{ position: 'absolute', zIndex: 1, left: 0, right: 0 }} square> 
                            {
                                    this.getSuggestions(inputValue).map((userEntry, index) =>
                                        this.renderSuggestion({
                                            userEntry,
                                            index,
                                            itemProps: getItemProps({ item: userEntry }),
                                            highlightedIndex,
                                            selectedItem,
                                        }),
                                    )
                                } 
                                </Paper>
                            ) 
                            :null
                    } 
                    </div>
                )
            } 
            </Downshift>  
        </div>
        );
    }
}

export default withTheme()(withRouter(Searchbar));