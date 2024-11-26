import { Box, Card, Grid,
	//  Icon, 
	 styled, Divider } from '@mui/material';
import { H6 } from 'app/components/Typography';
import { Link } from 'react-router-dom';
// import ProgressBar from 'app/pages/ProgressBar';
import ProgressBar2 from 'app/pages/ProgressBar2';
import axios from 'app/api/axios';
import { useEffect, useState } from 'react';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

// const ContentBox = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexWrap: 'wrap',
//   alignItems: 'center',
//   '& small': { color: theme.palette.text.secondary },
//   '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
// }));

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

const AddSmartBinsCard = () => {
	const [requisitions, setRequisitions] = useState([]);


	useEffect(() => {
		const fetchRequisitionData = async () => {
			try {
				const accessToken = window.localStorage.getItem('accessToken');
					//console.log('accessToken: ' + accessToken);
				const response = await axios.get('/requisition', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				// withCredentials: true
				});
				const { status, requisitions } = response.data;
				//console.log('requisitions: ' + requisitions);
				if (status === "success") {
					setRequisitions(requisitions);
				}
			} catch (error) {
				//console.log('error: ' + error);
			}
		};
		fetchRequisitionData();
	}, [requisitions]);

	// const renderAuthIcon = (created_date) => {
	// 	var check = true;

	// 	const days = Math.round((Date.parse(new Date()) - Date.parse(created_date)) / (1000 * 60 * 60 * 24));

	// 	if (days > 7) {
	// 		check = true;
	// 	} else {
	// 		check = false;
	// 	}

	// 	if (check) {
	// 		return <Icon className="icon" style={{ color: '#FF3D57' }}>new_releases</Icon>;
	// 	} else {
	// 		return <Icon className="icon" style={{ color: '#08ad6c' }}>offline_pin</Icon>;
	// 	}
	// }

	const renderColor = (fill) => {

		if (parseInt(fill) > 0 && parseInt(fill) < 26) {
			return 'green'
		} else if (parseInt(fill) > 25 && parseInt(fill) < 50) {
			return 'yellow'
		} else if (parseInt(fill) > 49 && parseInt(fill) < 76) {
			return 'orange'
		}
		return 'red'
	}

  	return (
		<Grid item container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
			{smartbin_data.map((bin_data, index) => (
				<Grid item xs={3}  key={index}>
					<Link state={{ bin_data: bin_data }} to={{ pathname: '/netcare/admin/view-smart-bins-details', state: bin_data }}>
						<StyledCard elevation={6}>
							<Box sx={{ width: '100%' }}>
								<Title>{bin_data.tag}</Title>
								<Divider sx={{ my: 3 }} />
								<H6>Hospital Name: <small>{bin_data.hospital_name}</small></H6>
								<H6>Department: <small>{bin_data.department}</small></H6>
								<H6>Location: <small>{bin_data.location}</small></H6>
								<Heading>Current Weight: {bin_data.weight}kg</Heading>
							</Box>
							<Divider />
							<Box sx={{ width: '100%' }}>
								<ProgressBar2 bgcolor={renderColor(bin_data.fill_level)} progress={bin_data.fill_level}  height={25} />
							</Box>
						</StyledCard>
					</Link>
				</Grid>
			))}
		</Grid>
		
	);
};

const smartbin_data = [
	{ 
		tag: 'Net-BIN00001',
		weight: 1.8,
		fill_level: '9',
		department: 'Casualty department',
		hospital_name: 'Purple Falls',
		unit: 'emergency department',
		location: 'emergency room',
		supplier: 'BinPack'
	},
	{ 
		tag: 'Net-BIN00002',
		weight: 36.8,
		fill_level: '74',
		department: 'Casualty department',
		hospital_name: 'Purple Falls',
		unit: 'emergency department',
		location: 'emergency room',
		supplier: 'BinPack'
	},
	{ 
		tag: 'Net-BIN00003',
		weight: 6,
		fill_level: '26',
		department: 'Casualty department',
		hospital_name: 'Purple Falls',
		unit: 'emergency department',
		location: 'emergency room',
		supplier: 'BinPack'
	},
	{ 
		tag: 'Net-BIN00004',
		weight: 50,
		fill_level: '100',
		department: 'Casualty department',
		hospital_name: 'Purple Falls',
		unit: 'emergency department',
		location: 'emergency room',
		supplier: 'BinPack'
	},
	// { 
	// 	tag: 'Net-BIN00005',
	// 	weight: 1.8,
	// 	fill_level: '9',
	// 	department: 'Casualty department',
	// 	hospital_name: 'Purple Falls',
	// 	unit: 'emergency department',
	// 	location: 'emergency room',
	// 	supplier: 'BinPack'
	// },
	// { 
	// 	tag: 'Net-BIN00006',
	// 	weight: 36.8,
	// 	fill_level: '74',
	// 	department: 'Casualty department',
	// 	hospital_name: 'Purple Falls',
	// 	unit: 'emergency department',
	// 	location: 'emergency room',
	// 	supplier: 'BinPack'
	// },
	// { 
	// 	tag: 'Net-BIN00007',
	// 	weight: 6,
	// 	fill_level: '26',
	// 	department: 'Casualty department',
	// 	hospital_name: 'Purple Falls',
	// 	unit: 'emergency department',
	// 	location: 'emergency room',
	// 	supplier: 'BinPack'
	// },
	// { 
	// 	tag: 'Net-BIN00008',
	// 	weight: 50,
	// 	fill_level: '100',
	// 	department: 'Casualty department',
	// 	hospital_name: 'Purple Falls',
	// 	unit: 'emergency department',
	// 	location: 'emergency room',
	// 	supplier: 'BinPack'
	// },
];
export default AddSmartBinsCard;
