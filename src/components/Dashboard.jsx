import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTheme } from 'material-ui/styles';
import { FormHelperText } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import ImportContacts from '@material-ui/icons/ImportContacts';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { withAuth } from 'fireview';

import { storage, db } from '../utils/firebase.config';


class Dashboard extends Component {
	constructor(props){
		super(props);
		this.state = {
      fileDownloadUrlValue: '', 
      fileToUpload: {}
    }
	};
	onURLChange(e){
    const file = e.target.files[0];
    return this.setState({fileToUpload: file});

	}

	onURLInputKeyDown(e) {
    e.preventDefault();
    if (e.which === 13) {
    //save the file to storage and set downloadurl on local state
    const file = this.state.fileToUpload;
    storage.ref(file.name).put(file)
			.then(res => {
				this.setState({ fileDownloadUrlValue: res.downloadURL });
				return res.downloadURL;
			})
			.then(downloadURL => {
				if (this.props._user) {
					return db.collection('users').get()
				}
			})
			.then(querySnap => {
				querySnap.forEach(user => user.ref.set({ avatar: this.state.fileDownloadUrlValue }, { merge: true }))
			})
      .catch(console.error);
    }
	}
	

	
	render(){
		const user = this.props && this.props._user ? this.props._user : 'tina you fat lard';
		return (
			<div>
				<Grid container spacing={24} justify="center" style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
					<Grid item>
						<Link to="/profile" style={{ textDecoration:"none" }}>
						<Card style={{ maxWidth: 200, background: "white", padding: "4vh 8vh", borderRadius: ".5em .5em" }}>
							<CardHeader
								avatar={
									<Avatar	style={{ width: 80, height: 80 }}>
										S
									</Avatar>
								}
								title={`Welcome, ${user.email}`}
								subheader={user.email}
								style={{marginRight: "4vh"}}
								/>
								
						</Card>
						</Link>
					</Grid>
				</Grid>
				{ user && 
					<Grid style={{display: 'flex', flexDirection: 'column', marginLeft: '30%'}}>
						<FormHelperText id="name-helper-text" style={{marginLeft: '15%'}}>Add Profile Photo (optional)</FormHelperText>
						<input style={{fontFamily:'Karla, sansSerif', marginLeft: '15%' }} type="file" id="file"  onChange={this.onURLChange.bind(this)} onKeyDown={this.onURLInputKeyDown.bind(this)}/>
					</Grid>
				}
				<Grid container spacing={24} justify="center" style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
						<Grid>
							<Link to='/journals' style={{ textDecoration:"none" }}>
							<Card style={{ maxWidth: 200, background: "white", padding: "4vh 4vh", margin: "2vh 2vh", borderRadius: ".5em .5em" }}>
								<ImportContacts style={{ color: "#616161", width: 60, height: 60 }}/>
								<CardContent>
								<Typography>Journals</Typography>
								</CardContent>
							</Card>
							</Link>
						</Grid>
		
						<Grid>
							<Link to="/entries" style={{ textDecoration:"none" }}>
							<Card style={{ maxWidth: 200, background: "white", padding: "4vh 4vh", margin: "2vh 2vh", borderRadius: ".5em .5em" }}>
								<LibraryBooks style={{ color: "#616161", width: 60, height: 60 }}/>
								<CardContent>
								<Typography>Entries</Typography>
								</CardContent>
							</Card>
							</Link>
						</Grid>
		
					</Grid>
				</div>
			);

	}
	
	
};

export default withTheme()(withAuth(Dashboard));