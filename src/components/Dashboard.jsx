import React from 'react';
import { Link } from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import Person from '@material-ui/icons/Person';
import ImportContacts from '@material-ui/icons/ImportContacts';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { withAuth } from 'fireview';

const styles = {
	profileCard: {
		maxWidth: 200,
		background: "#d1e2ff",
		padding: "7vh 10vh",
		marginBottom: "3.5vh",
	},
  card: {
		maxWidth: 200,
		background: "#FFFDE7",
		padding: "4vh 4vh",
		margin: "2vh 2vh"
	},
  gridList: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
	},
	profileIcon: {
		color: "#616161",
		width: 80,
		height: 80
	},
	mediumIcon: {
		color: "#616161",
		width: 80,
		height: 80
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
					<Person style={styles.profileIcon}/>
					<div>{user.email}</div>
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