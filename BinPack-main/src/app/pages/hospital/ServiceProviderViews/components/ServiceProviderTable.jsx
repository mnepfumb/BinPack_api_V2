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
// import DeactivateServiceProviderDialog from './DeactivateServiceProviderDialog';
import SimpleCard from 'app/components/SimpleCard';
import { useEffect, useState } from 'react';
import axios from 'app/api/axios';

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

const ServiceProviderTable = () => {
	const [companies, setCompanies] = useState([]);

	const navigate = useNavigate();

	const fetchServiceProviderData = async () => {
		try {
		const accessToken = window.localStorage.getItem('accessToken');
		//console.log('accessToken: ' + accessToken);
		const response = await axios.get('/company', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			// withCredentials: true
		});
		const { status, companies } = response.data;
		//console.log('companies: ' + companies);
		if (status === "success") {
			setCompanies(companies);
		}
		} catch (error) {
			//console.log('error: ' + error);
		}
	};

	useEffect(() => {
		fetchServiceProviderData();
	}, []);

	const onClick = () => navigate('/netcare/hospital/service-provider-add-form');

	return (
		<Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
			<SimpleCard>
				<CardHeader>
					<Title>Service Provider List</Title>
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
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Phone Number
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Email
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Address
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Registration #
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Tax #
								</TableCell>
								<TableCell sx={{ px: 0 }} colSpan={4}>
									Action
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{companies.map((company, index) => (
							<TableRow key={index} hover>
								<TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
									{company.name}
								</TableCell>

								<TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
									{company.phone}
								</TableCell>

								<TableCell sx={{ px: 0 }} align="left" colSpan={4}>
									{company.email}
								</TableCell>

								<TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
									{company.address}
								</TableCell>

								<TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
									{company.registration_no}
								</TableCell>

								<TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
									{company.tax_no}
								</TableCell>

								<TableCell sx={{ px: 0 }} colSpan={4}>
									<IconButton >
									<Icon
										color="primary"
										state={{
										company,
										}}
										component={Link}
										to={{
										pathname: '/hospital/service-provider-edit-form',
										state: company,
										}}
									>
										edit
									</Icon>
									</IconButton>
									{/* <IconButton>
									<DeactivateServiceProviderDialog />
									</IconButton> */}
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

export default ServiceProviderTable;
