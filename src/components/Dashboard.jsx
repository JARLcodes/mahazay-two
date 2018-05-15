import React from 'react';
import { Link } from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import ImportContacts from '@material-ui/icons/ImportContacts';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { withAuth } from 'fireview';

const styles = {
	profileCard: {
		maxWidth: 200,
		background: "white",
		padding: "7vh 10vh",
		marginBottom: "3.5vh",
	},
  card: {
		maxWidth: 200,
		background: "white",
		padding: "4vh 4vh",
		margin: "2vh 2vh"
	},
  gridList: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
	},
	bigAvatar : {
		width: 80,
		height: 80
	},
	mediumIcon: {
		color: "#616161",
		width: 60,
		height: 60
	}
};

const Dashboard = (props) => {
	const user = props && props._user ? props._user : 'tina you fat lard';
	return (
	<div>
		<Grid container spacing={24} justify="center" style={styles.gridList}>
			<Grid>
				<Link to="/profile" style={{textDecoration:"none"}}>
				<Card style={styles.profileCard}>
					<CardHeader
						avatar={
							<Avatar	style={styles.bigAvatar}>
								S
							</Avatar>
						}
						title={`Welcome, ${user.email}`}
						subheader={user.email}
						/>
				</Card>
				</Link>
			</Grid>
		</Grid>

		<Grid container spacing={24} justify="center" style={styles.gridList}>
				<Grid>
					<Link to='/journals' style={{textDecoration:"none"}}>
					<Card style={styles.card}>
						<ImportContacts style={styles.mediumIcon}/>
						<CardContent>
						<Typography>Journals</Typography>
						</CardContent>
					</Card>
					</Link>
				</Grid>

				<Grid>
					<Link to="/entries" style={{textDecoration:"none"}}>
					<Card style={styles.card}>
						<LibraryBooks style={styles.mediumIcon}/>
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

export default withAuth(Dashboard);