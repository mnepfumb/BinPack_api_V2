import { Card, Grid, styled } from '@mui/material';
import { Fragment } from 'react';
import axios from 'app/api/axios';
import { useState, useEffect } from "react";
import SimpleCard from 'app/components/SimpleCard';

import WasteTypesChart from './components/WasteTypes/WasteTypesChart';
import WasteTypesDoughnut from './components/WasteTypes/WasteTypesDoughnut';
import WasteTypesTable  from './components/WasteTypes/WasteTypesTable';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

// const H4 = styled('h4')(({ theme }) => ({
//   fontSize: '1rem',
//   fontWeight: '500',
//   marginBottom: '16px',
//   textTransform: 'capitalize',
//   color: theme.palette.text.secondary,
// }));

// const Container = styled('div')(({ theme }) => ({
//   margin: '30px',
//   [theme.breakpoints.down('sm')]: {
//     margin: '16px',
//   },
//   '& .breadcrumb': {
//     marginBottom: '30px',
//     [theme.breakpoints.down('sm')]: {
//       marginBottom: '16px',
//     },
//   },
// }));

const WasteTypesAnalytics = () => {

	const [,setCovidBarDataset] = useState([]);
	const [,setGeneralBarDataset] = useState([]);
	const [,setHazardousBarDataset] = useState([]);
	const [, setMetalBarDataset] = useState([]);
	const [, setPaperBarDataset] = useState([]);
	const [, setPlasticBarDataset] = useState([]);
	const [, setRefuseBarDataset] = useState([]);
	const [, setHealthcareBarDataset] = useState([]);
	const [, setOtherBarDataset] = useState([]);
	const [, setDateBarDataset] = useState([]);
	const [, setPieDataset] = useState([]);
	const [, setTableDataset] = useState([]);
	

	useEffect(() => {
		const accessToken = window.localStorage.getItem('accessToken');

		// const fetchRequisitionData = async () => {
		// 	try {
		// 		const response = await axios.get('/requisition', {
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 				Authorization: `Bearer ${accessToken}`,
		// 			},
		// 		// withCredentials: true
		// 		});
		// 		const { status, requisitions } = response.data;
		// 		console.log('requisitions: ' + requisitions);
		// 		if (status === "success") {
		// 			// setRequisitions(requisitions);
		// 		}
		// 	} catch (error) {
		// 		console.log('error: ' + error);
		// 	}
		// };
		
		const fetchBarData = async () => {
			try {
				const response = await axios.get('/dashboards/waste-category-bar', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const { status, covid_waste, general_waste, hazardous_waste, metal_waste, paper_waste, plastic_waste, refuse_waste, healthcare_waste, other, date_data } = response.data;

				if (status === "success") {
					setCovidBarDataset(covid_waste)
					setGeneralBarDataset(general_waste)
					setHazardousBarDataset(hazardous_waste)
					setMetalBarDataset(metal_waste)
					setPaperBarDataset(paper_waste)
					setPlasticBarDataset(plastic_waste)
					setRefuseBarDataset(refuse_waste)
					setHealthcareBarDataset(healthcare_waste)
					setOtherBarDataset(other)
					setDateBarDataset(date_data)
				}
				
			} catch (error) {
				console.log('error: ' + error);
			}
		};
		
		const fetchPieData = async () => {
			try {
				const response = await axios.get('/dashboards/waste-category-pie', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const { status, pie_data } = response.data;
				if (status === "success") {
					setPieDataset(pie_data)
				}
				
			} catch (error) {
				console.log('error: ' + error);
			}
		};
		
		const fetchTableData = async () => {
			try {
				const response = await axios.get('/dashboards/waste-category-table', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const { status, total_waste } = response.data;
				if (status === "success") {
					setTableDataset(total_waste)
				}
				
			} catch (error) {
				console.log('error: ' + error);
			}
		};
		// fetchRequisitionData();
		fetchBarData();
		fetchPieData();
		fetchTableData()
	}, []);

	const Purple = '#800080';
	const Fuchsia = '#FF00FF';
	const Navy = '#000080';
	const Blue = '#0000FF';
	const Teal = '#008080';
	const Aqua = '#00FFFF';
	const Green = '#008000';
	const Olive = '#808000';
	const Silver = '#C0C0C0';

	const rosybrown = '#8B6969';
	const cadmiumorange = '#FF6103';
	const peachpuff = '#CDAF95';
	const wheat3 = '#CDBA96';
	const khaki4 = '#8B864E';
	const cyan3 = '#00CDCD';
	const paleturquoise4 = '#668B8B';
	const dodgerblue = '#1E90FF';
	const lightslateblue = '#8470FF';
	const blueviolet = '#8A2BE2';
	const lightpink4 = '#8B5F65';

	return (
		<Fragment>
			<ContentBox className="admin-analytics">
				<SimpleCard title="Waste Types" sx={{ mb: '24px' }}>
					<SimpleCard  sx={{ mb: '24px' }}>
						<WasteTypesChart
							height="550px"
							colors={[
								Silver, Olive, Green, Aqua, Teal, Navy, Fuchsia, rosybrown, Blue, Purple, cadmiumorange,
								wheat3, khaki4, peachpuff, paleturquoise4, cyan3, dodgerblue, lightslateblue, blueviolet,
								lightpink4 //, rosybrown4, antiquewhite4
							]}
						/>
					</SimpleCard>
					<Grid container spacing={3}>
						<Grid item lg={6} md={8} sm={12} xs={12}>
							<SimpleCard  sx={{ mb: '24px' }}>
							<WasteTypesTable />
							</SimpleCard>
						</Grid>
						<Grid item lg={6} md={8} sm={12} xs={12}>
							<SimpleCard  sx={{ mb: '24px' }}>
							<Card sx={{ px: 3, py: 2, mb: 3 }}>
								<Title>Waste Types</Title>
								<SubTitle>Last 30 days</SubTitle>

								<WasteTypesDoughnut
									height="490px"
									color={[
										Silver, Olive, Green, Aqua, Teal, Navy, Fuchsia, rosybrown, Blue, Purple, cadmiumorange,
										wheat3, khaki4, peachpuff, paleturquoise4, cyan3, dodgerblue, lightslateblue, blueviolet,
										lightpink4 //, rosybrown4, antiquewhite4
									]}
								/>
							</Card>
							</SimpleCard>
						</Grid>
					</Grid>
				</SimpleCard>
			</ContentBox>
		</Fragment>
	);
};

export default WasteTypesAnalytics;
