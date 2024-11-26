import { Box, Card, Grid, Icon, styled, Divider } from '@mui/material';
import { H6 } from 'app/components/Typography';
import { Link } from 'react-router-dom';
import ProgressBar from 'app/pages/ProgressBar';
import axios from 'app/api/axios';
import { useEffect, useState } from 'react';
import useAuth from 'app/hooks/useAuth';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const CompletedRequisitionsCards = () => {
	const [requisitions, setRequisitions] = useState([]);
	let { user } = useAuth();

	useEffect(() => {
		let requisitionlist = [];
	
		const fetchRequisitionData = async () => {
			try {
				const accessToken = window.localStorage.getItem('accessToken');
				//console.log('user.email: ' + user.id);
				var url =  '/requisition/hospital?driver_id='+user.id
				const response = await axios.get( url , {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const { status, requisitions } = response.data;
				//console.log('requisitions: ' + requisitions);
				if (status === "success") {
					requisitions.forEach((requisition) => {
						//console.log('user.role: ' + requisition.status);
						if (requisition.status === 'Waste Disposed') {
							//console.log('user: ' + requisition.name);
							requisitionlist.push({
								requisition
							})
						}
						
					});
					setRequisitions(requisitionlist);
				}
			} catch (error) {
				//console.log('error: ' + error);
			}
		};
		fetchRequisitionData();
	}, [user.id]);

	const renderAuthIcon = (created_date) => {
		var check = true;

		const days = Math.round((Date.parse(new Date()) - Date.parse(created_date)) / (1000 * 60 * 60 * 24));

		if (days > 7) {
			check = true;
		} else {
			check = false;
		}

		if (check) {
			return <Icon className="icon" style={{ color: '#FF3D57' }}>new_releases</Icon>;
		} else {
			return <Icon className="icon" style={{ color: '#08ad6c' }}>offline_pin</Icon>;
		}
	}

  	return (
		<Grid container  sx={{ mb: '24px', mt: 2 }} sm={12}  style={{ gap: 15 }}>
			{requisitions.map((requisition, index) => (
				<Grid requisition xs={12} md={3} key={index}>
					<Link state={{ requisition: requisition }} to={{ pathname: '/netcare/driver/view-completed-requisitions-details', state: requisition }}>
						<StyledCard elevation={6}>
							<ContentBox>
								<Grid item lg={9} md={8} sm={12} xs={12} sx={{ mt: 2 }}>
									<Title>{requisition.requision_id}</Title>
								</Grid>
								<Grid item  md={2} sm={12} xs={12} sx={{ mt: 2 }}>
									{renderAuthIcon( requisition.created_date )}
								</Grid>
								
								<Divider sx={{ my: 3 }} />
								<Box ml="-5px">
									<H6>To: <small>{requisition.serviceProviderName}</small></H6>
									<H6>WasteType: <small>{requisition.wasteType}</small></H6>
									<H6>Requestor: <small>{requisition.hospitalName}</small></H6>
									<H6>Colletion Date: <small>{requisition.collection_Date}</small></H6>
									<Heading>Status: {requisition.status}</Heading>
								</Box>
							</ContentBox>
							<Box
								sx={{
								display: "flex",
								alignItems: "center",
								width: '100%',
								flexDirection: "column",
								marginTop: -3,
								marginBottom: -7,
								}}
							>
								<ProgressBar bgcolor="orange" progress={requisition.percentage.toString()}  height={20} />
							</Box>
						</StyledCard>
					</Link>
				</Grid>
			))}
		</Grid>
		
	);
};

export default CompletedRequisitionsCards;
