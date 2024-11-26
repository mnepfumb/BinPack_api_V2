import {
  Box,
  Card,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import DeactivateUserDialog from './DeactivateUserDialog';
import ActivateUserDialog from './ActivateUserDialog';
import SimpleCard from 'app/components/SimpleCard';
import { useEffect, useState } from 'react';
import axios from 'app/api/axios';
import SimpleDateTime from 'react-simple-timestamp-to-date';
import useAuth from 'app/hooks/useAuth';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const UserTable = () => {
	const [users, setUsers] = useState([]);
	let { user } = useAuth();

	const navigate = useNavigate();

	useEffect(() => {

		const fetchHospitalData = async () => {
			try {
				const accessToken = window.localStorage.getItem('accessToken');
				//console.log('accessToken: ' + accessToken);
				//console.log('user.id: ' + user.id);
				var url = `/users/${user.id}`
				const response = await axios.get( url , {
					headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
					},
				});
				const { status, users } = response.data;
				//console.log('users: ' + users);
				if (status === 'success') {
					var company_id = users.company_id;
					//console.log('company_id: ' + company_id);
					try {
						var users_url =  '/users/userfield?company_id='+company_id
						const response = await axios.get( users_url , {
							headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${accessToken}`,
							},
							// withCredentials: true
						});
						const { status, users } = response.data;
						//console.log('users: ' + users);
						if (status === 'success') {
							//console.log(`user.is_active: ${users[0].is_active}`);
							setUsers(users);
						}
					} catch (error) {
					//console.log('error: ' + error);
					}
				}
			} catch (error) {
			//console.log('error: ' + error);
			}
		};
		fetchHospitalData();
	}, [user.id]);

	const onClick = () => navigate('/netcare/hospital/user-add-form');
	const renderTest = (check, user) => {
		if (check) {
			return <DeactivateUserDialog user={user} />;
		} else {
			return <ActivateUserDialog user={user} />;
		}
	};

	const renderAuthIcon = (check, user) => {
		if (check) {
			return (
				<Icon className="icon" style={{ color: '#08ad6c', size: 42 }}>
				check
				</Icon>
			);
		} else {
			return (
				<Icon className="icon" style={{ color: '#FF3D57', size: 42 }}>
				clear
				</Icon>
			);
		}
	};

	return (
		<Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
			<SimpleCard>
				<CardHeader>
					<Title>Hospitals' User List</Title>
					<Fab color="primary" aria-label="Add" className="button" onClick={onClick}>
						<Icon>add</Icon>
					</Fab>
				</CardHeader>

				<Box overflow="auto">
					<ProductTable>
						<TableHead>
							<TableRow>
								<TableCell sx={{ px: 4 }} colSpan={4}>
									Name
								</TableCell>
								<TableCell sx={{ px: 4 }} colSpan={4}>
									Surname
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Phone Number
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Email
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Role
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Company
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Active Status
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Created Date
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Action
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{users.map((user, index) => (
								<TableRow key={index} hover>
									<TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
										{user.name}
									</TableCell>

									<TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
										{user.surname}
									</TableCell>

									<TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
										{user.phone}
									</TableCell>

									<TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
										{user.email}
									</TableCell>

									<TableCell sx={{ px: 0 }} align="left" colSpan={4}>
										{user.role}
									</TableCell>

									<TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
										{user.company}
									</TableCell>

									<TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
										{renderAuthIcon(user.is_active, user)}
										{/* {user.is_active.toString()} */}
									</TableCell>

									<TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
										<SimpleDateTime dateFormat="YMD" dateSeparator="/" timeSeparator=":">
											{user.updated_at}
										</SimpleDateTime>
										{/* {user.updated_at} */}
									</TableCell>

									<TableCell sx={{ px: 0 }} colSpan={4}>
										<IconButton>
											<Icon
												color="primary"
												state={{ user }}
												component={Link}
												to={{ pathname: '/netcare/hospital/user-edit-form', state: user }}
											>
												edit
											</Icon>
										</IconButton>
										<IconButton>
											{renderTest(user.is_active, user)}
											{/* <DeactivateUserDialog user={ user }/> */}
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</ProductTable>
				</Box>
			</SimpleCard>
		</Card>
	);
};

export default UserTable;
