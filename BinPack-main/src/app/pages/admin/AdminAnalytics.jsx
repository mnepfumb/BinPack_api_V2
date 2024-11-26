import { Card, Grid, styled } from '@mui/material';
import { Fragment } from 'react';
import axios from 'app/api/axios';
import { useState, useEffect } from "react";
import SimpleCard from 'app/components/SimpleCard';

import CategoryChart from './components/WasteCategories/CategoryChart';
import CategoryDoughnut from './components/WasteCategories/CategoryDoughnut';
import CategoriesTable  from './components/WasteCategories/CategoriesTable';

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
const table_init = [
	[{color: '#C0C0C0', category: 'Covid Waste', wastePerWeek: '0', wastePerMonth: '0'}],
	[{color: '#808000', category: 'General Waste', wastePerWeek: '0', wastePerMonth: '0'}],
	[{color: '#008000',  category: 'Hazardous Waste', wastePerWeek: '0', wastePerMonth: '0'}],
	[{color: '#00FFFF', category: 'Metal Waste', wastePerWeek: '0', wastePerMonth: '0'}],
	[{color: '#008080', category: 'Paper Waste', wastePerWeek: '0', wastePerMonth: '0'}],
	[{color: '#0000FF', category: 'Plastic Waste', wastePerWeek: '0', wastePerMonth: '0'}],
	[{color: '#000080', category: 'Refuse Waste', wastePerWeek: '0', wastePerMonth: '0'}],
	[{color: '#FF00FF', category: 'Healthcare Risk Waste', wastePerWeek: '0', wastePerMonth: '0'}],
	[{color: '#800080', category: 'Other', wastePerWeek: '0', wastePerMonth: '0'}]
]

const doughnut_init = [
	{ value: 10, name: 'Covid Waste' },
	{ value: 14, name: 'General Waste' },
	{ value: 10, name: 'Hazardous Waste' },
	{ value: 30, name: 'Metal Waste' },
	{ value: 5, name: 'Paper Waste' },
	{ value: 90, name: 'Plastic Waste' },
	{ value: 8, name: 'Refuse Waste' },
	{ value: 20, name: 'Healthcare Risk Waste' },
	{ value: 21, name: 'Other' },
]
const AdminAnalytics = () => {
	const [dateBarDataset, ] = useState([]);

	const [pieReqDataset, ] = useState(doughnut_init);
	const [pieMassDataset, ] = useState(doughnut_init);

	const [tableReqDataset, setTableReqDataset] = useState([table_init]);
	const [tableMassDataset, setTableMassDataset] = useState([table_init]);
	
	const [ RequisitionsDataset,  ] = useState([
		{
			covid_waste: [ 10 ],
			general_waste: [ 50 ],
			hazardous_waste: [ 0 ],
			metal_waste: [ 9 ],
			paper_waste: [ 50 ],
			plastic_waste: [ 10 ],
			refuse_waste: [ 60 ],
			healthcare_waste: [ 110 ],
			other: [ 230 ]
		}
	]);
	const [ MassDataset,  ] = useState([
		{
			covid_waste: [ 10.0 ],
			general_waste: [ 50.0 ],
			hazardous_waste: [ 0.0 ],
			metal_waste: [ 9.0 ],
			paper_waste: [ 50.0 ],
			plastic_waste: [ 10.0 ],
			refuse_waste: [ 60.0 ],
			healthcare_waste: [ 110.0 ],
			other: [ 230.0 ]
		}
	]);

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
				const response = await axios.get('/dashboards/req-waste-category-bar', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const { status, Requisitions } = response.data;
				console.log(Requisitions[0])
				if (status === "success") {
					// setDateBarDataset(date_data);
					// setRequisitionsDataset(Requisitions);
					// setMasssDataset(Mass)
				}
				
			} catch (error) {
				console.log('error: ' + error);
			}
		};
		
		const fetchPieData = async () => {
			try {
				const response = await axios.get('/dashboards/req-waste-category-pie', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const { status } = response.data;
				if (status === "success") {
					// setPieReqDataset(pie_req_data)
					// setPieMassDataset(pie_mass_data)
				}
				
			} catch (error) {
				console.log('error: ' + error);
			}
		};
		
		const fetchTableData = async () => {
			try {
				const response = await axios.get('/dashboards/req-waste-category-table', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const { status, total_req_waste, total_mass_waste } = response.data;
				if (status === "success") {
					setTableReqDataset(total_req_waste)
					setTableMassDataset(total_mass_waste)
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

	return (
		<Fragment>
			<ContentBox className="admin-analytics">
				<SimpleCard title="Waste Categories: Requisitions" sx={{ mb: '24px' }}>
					<SimpleCard  sx={{ mb: '24px' }}>
						<CategoryChart
							height="450px"
							colors={[
								Silver, Olive, Green, Aqua, Teal, Navy, Fuchsia, Blue, Purple
							]}
							Series={RequisitionsDataset}
							dateBarDataset={dateBarDataset}
						/>
					</SimpleCard>
					<Grid container spacing={3}>
						<Grid item lg={6} md={8} sm={12} xs={12}>
							<SimpleCard  sx={{ mb: '24px' }}>
							<CategoriesTable tableDataset={tableReqDataset} />
							</SimpleCard>
						</Grid>
						<Grid item lg={6} md={8} sm={12} xs={12}>
							<SimpleCard  sx={{ mb: '24px' }}>
							<Card sx={{ px: 3, py: 2, mb: 3 }}>
								<Title>Waste Category</Title>
								<SubTitle>Last 30 days</SubTitle>

								<CategoryDoughnut
									height="490px"
									color={[ Silver, Olive, Green, Aqua, Teal, Navy, Fuchsia, Blue, Purple ]}
									pieDataset={pieReqDataset}
									tooltip={'{a} <br/>{b}: {c} ({d}%)'}
									formatter={'{b}: {c} ({d}%)'}
								/>
							</Card>
							</SimpleCard>
						</Grid>
					</Grid>
				</SimpleCard>



				<SimpleCard title="Waste Categories: Mass" sx={{ mb: '24px' }}>
					<SimpleCard  sx={{ mb: '24px' }}>
						<CategoryChart
							height="450px"
							colors={[
								Silver, Olive, Green, Aqua, Teal, Navy, Fuchsia, Blue, Purple
							]}
							Series={MassDataset}
							dateBarDataset={dateBarDataset}
						/>
					</SimpleCard>
					<Grid container spacing={3}>
						<Grid item lg={6} md={8} sm={12} xs={12}>
							<SimpleCard  sx={{ mb: '24px' }}>
							<CategoriesTable 
							tableDataset={tableMassDataset} 
							// tableName={''}
							/>
							</SimpleCard>
						</Grid>
						<Grid item lg={6} md={8} sm={12} xs={12}>
							<SimpleCard  sx={{ mb: '24px' }}>
							<Card sx={{ px: 3, py: 2, mb: 3 }}>
								<Title>Waste Category</Title>
								<SubTitle>Last 30 days</SubTitle>

								<CategoryDoughnut
									height="490px"
									color={[ Silver, Olive, Green, Aqua, Teal, Navy, Fuchsia, Blue, Purple ]}
									pieDataset={pieMassDataset}
									tooltip={'{a} <br/>{b}: {c}kg ({d}%)'}
									formatter={'{b}: {c}kg ({d}%)'}
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

export default AdminAnalytics;
