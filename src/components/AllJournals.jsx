import React, { Component } from 'react';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import SubdirectoryArrowLeft from '@material-ui/icons/SubdirectoryArrowLeft';
import { Link } from 'react-router-dom';
import { withAuth } from 'fireview';
import Add from '@material-ui/icons/Add';

import { getRootRef } from '../utils/componentUtils';
import  NewJournalForm  from './NewJournalForm.jsx';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    borderStyle: 'inset',
    borderWidth: 'thick',
    borderColor: '#A1887F'
  },
  subheader: {
    fontSize: 40,
    fontVariant: 'small-caps',
    color: 'grey'
  },
  tile: {
    backgroundColor: '#BCAAA4',
    borderWidth: '.1vh',
    borderColor: '#A1887F'
  },
  addJournal: {
    backgroundColor: "#A1887F",
    border: "1px dotted #454545"
  }
};

export class AllJournals extends Component {
  constructor () {
    super();
    this.state = {
      rootRef: getRootRef('journals'),
      journals: [],
      allJournalIds: []
    }

  }

  componentWillReceiveProps(nextProps){
    if(this.props._user !== nextProps._user){
      const { rootRef } = this.state;
      rootRef.where("userId", "==", nextProps._user.uid).get()
        .then(querySnapshot => {
          querySnapshot.forEach(journal => {
            this.setState({ journals: [...this.state.journals, journal.data()], allJournalIds: [...this.state.allJournalIds, journal.id] })
          })
        })
      }
  }

  newJournal(){
    this.props.history.push(`${this.props._user.uid}/new-journal`)
  }

  render() {
  
    const journals = this.state.journals;
    const journalIds = this.state.allJournalIds;
    return (
      <div style={styles.root}>
        <GridList>
          <GridListTile key='Subheader' cols={2} style={{height: 'auto'}}>
            <Subheader style={styles.subheader}>My Journals</Subheader>
            {this.props && this.props._user ? <Button  onClick={this.newJournal.bind(this)}><Add styles={styles.addJournal}/></Button> : null}
          </GridListTile>
         
          {
            journals.map((journal, ind) => (
              <GridListTile key={journalIds[ind]}>
                <Link to={`/journals/${journalIds[ind]}`}>
                  <img src='https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/H/KB/HKB12/HKB12?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1480984401449'/>
                  <GridListTileBar
                    title={journal.title}
                    subtitle={<span>{journal.description}</span>}
                    actionIcon={
                      <IconButton style={styles.icon}>
                        <SubdirectoryArrowLeft />
                      </IconButton>
                    }
                  />
                </Link>
              </GridListTile>
            ))
          }
         
        </GridList>
      </div>
    )
  }
}


export default withAuth(AllJournals)
