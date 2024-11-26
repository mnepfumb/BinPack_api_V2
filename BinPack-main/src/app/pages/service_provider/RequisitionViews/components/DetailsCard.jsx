import { Box, Card, styled, Grid, Divider } from '@mui/material';
import { convertHexToRGB } from 'app/utils/utils';
import { H3, H4 } from 'app/components/Typography';
import axios from 'app/api/axios';

const CardRoot = styled(Card)(({ theme }) => ({
  marginBottom: '24px',
  padding: '24px !important',
  [theme.breakpoints.down('sm')]: { paddingLeft: '16px !important' },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  position: 'relative',
  padding: '24px !important',
  background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const StyledCard2 = styled(Card)(({ theme }) => ({
	boxShadow: 'none',
	textAlign: 'left',
	position: 'relative',
	padding: '24px !important',
	background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
	[theme.breakpoints.down('sm')]: { padding: '16px !important' },
}))

const accessToken = window.localStorage.getItem('accessToken');


const DetailsCard = ({ requisition }) => {

	const onClickAccept = async () => {
		try {
			var requisition_url = '/requisition/' + requisition._id;
			const response = await axios.patch( requisition_url, {
				acceptRequisitions: true,
				assignRequisitions: false,
				rejectRequisitions: false,
				updated_at: new Date(),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const { status } = response.data;
			if (status === 'success') {
			// setOpen(true);
			//   navigate('/netcare/admin/user');
			}
		} catch (error) {
			//console.log('patch_error2: ' + error);
		}
	}
	const onClickReject = async () => {
		try {
			var requisition_url = '/requisition/' + requisition._id;
			const response = await axios.patch( requisition_url, {
				acceptRequisitions: false,
				assignRequisitions: false,
				rejectRequisitions: true,
				updated_at: new Date(),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const { status } = response.data;
			if (status === 'success') {
			// setOpen(true);
			//   navigate('/netcare/admin/user');
			}
		} catch (error) {
			//console.log('patch_error2: ' + error);
		}
	}

	const Button = (requisition) => {
		if (!requisition.acceptRequisitions) {
			return (
				<>
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<Button
							size="large"
							color="primary"
							variant="contained"
							sx={{ textTransform: 'uppercase' }}
							onClick={onClickAccept}
						>
							Accept
						</Button>
					</Grid>
					<Grid item lg={6} md={6} sm={12} xs={12}>
						<Button
							size="large"
							color="primary"
							variant="contained"
							sx={{ textTransform: 'uppercase' }}
							onClick={onClickReject}
						>
							Reject
						</Button>
					</Grid>
				</>
			);
		}
	}

	return (
		<CardRoot>
			<StyledCard elevation={0}>
				{/* <img src="/BinPack/assets/images/illustrations/upgrade.svg" alt="upgrade" /> */}
				<H3>ID: {requisition.requision_id}</H3>
				<Divider sx={{ my: 3 }} />
				<Grid container spacing={3} >
					
					<Grid item lg={6} md={3} sm={12} xs={12}>
					<StyledCard2>
						<Box ml="-5px">
							<H4>To: <small>{requisition.serviceProviderName}</small></H4>
							<H4>WasteType: <small>{requisition.wasteType}</small></H4>
							<H4>Requestor: <small>{requisition.hospitalName}</small></H4>
							<H4>Creation Date: <small>{requisition.created_date}</small></H4>
							{/* <Heading>Status: item.amount</Heading> */}
						</Box>	
					</StyledCard2>
					</Grid>
					<Grid item lg={6} md={6} sm={12} xs={12}>
					<StyledCard2>
						<Box ml="-5px">
							<H4>Collection Address: <small>{requisition.collection_address}</small></H4>
							<H4>Bin Location: <small>{requisition.bin_location}</small></H4>
							<H4>Expected qty: <small>{requisition.expected_qty}</small></H4>
							<H4>Colletion Date: <small>{requisition.collection_Date}</small></H4>
							{/* <Heading>Status: item.amount</Heading> */}
						</Box>
					</StyledCard2>
						
					</Grid>
					<Divider sx={{ my: 3 }} />
					{Button(requisition)}
					
				</Grid>
			</StyledCard>
		</CardRoot>
	);
};

export default DetailsCard;
