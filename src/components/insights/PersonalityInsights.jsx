import React, { Component } from 'react';
import { withAuth } from 'fireview';
import { getRootRef, getIds } from '../../utils/componentUtils';
import { getUserPersonality, getEntryPersonality, getJournalPersonality } from  '../../utils/personalityUtils.js'
import { db } from '../../utils/firebase.config'

class PersonalityInsights extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return 
        
    }
}

export default withAuth(PersonalityInsights);