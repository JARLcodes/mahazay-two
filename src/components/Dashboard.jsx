import React from 'react';
import { Link } from 'react-router-dom';
import { withTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import ImportContacts from '@material-ui/icons/ImportContacts';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { withAuth } from 'fireview';

const Dashboard = props =>  {
	
	const user = props && props._user ? props._user : 'tina you fat lard';
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

};
	
	
export default withTheme()(withAuth(Dashboard));