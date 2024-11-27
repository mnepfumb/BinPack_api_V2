import { Box, Card, styled, Grid, Divider, useTheme } from '@mui/material';
import { convertHexToRGB } from 'app/utils/utils';
import { H3, H4 } from 'app/components/Typography';
import LineChart from './LineChart';
// import SimpleCard from 'app/components/SimpleCard';

const CardRoot = styled(Card)(({ theme }) => ({
  marginBottom: '24px',
  padding: '24px !important',
  [theme.breakpoints.down('sm')]: { paddingLeft: '16px !important' },
}));

// const StyledCard = styled(Card)(({ theme }) => ({
//   boxShadow: 'none',
//   textAlign: 'center',
//   position: 'relative',
//   padding: '24px !important',
//   background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
//   [theme.breakpoints.down('sm')]: { padding: '16px !important' },
// }));

const StyledCard2 = styled(Card)(({ theme }) => ({
	boxShadow: 'none',
	textAlign: 'left',
	position: 'relative',
	padding: '24px !important',
	background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
	[theme.breakpoints.down('sm')]: { padding: '16px !important' },
}))

// const accessToken = window.localStorage.getItem('accessToken');

const SmartBinDetailsCard = ({ bin_data }) => {
	const theme = useTheme();

	return (
		<CardRoot>
			{/* <StyledCard elevation={0}> */}
				<H3>{bin_data.tag}</H3>
				<Divider sx={{ my: 3 }} />
				<Grid item container spacing={3} >

					<Grid item lg={8} md={6} sm={12} xs={12}>
						<LineChart
							height="350px"
							color={[theme.palette.primary.main, theme.palette.primary.light]}
						/>
					{/* <StyledCard2>
						<Box ml="-5px">
							<H4>To: <small>{bin_data.tag}</small></H4>
							<H4>WasteType: <small>{bin_data.tag}</small></H4>
							<H4>Requestor: <small>{bin_data.tag}</small></H4>
							<H4>Creation Date: <small>{bin_data.tag}</small></H4>
						</Box>	
					</StyledCard2> */}
					</Grid>
					<Grid item lg={4} md={6} sm={12} xs={12}>
					<StyledCard2>
						<Box ml="-5px">
							<H4>Hospital Name: <small>{bin_data.hospital_name}</small></H4>
							<H4>Department: <small>{bin_data.department}</small></H4>
							<H4>Unit: <small>{bin_data.unit}</small></H4>
							<H4>Location: <small>{bin_data.location}</small></H4>
						</Box>
					</StyledCard2>

					<Divider sx={{ my: 3 }} />

					<StyledCard2>
						<Box ml="-5px">
							<H4>Weight: <small>{bin_data.weight}kg</small></H4>
							<H4>Bin Level: <small>{bin_data.fill_level}%</small></H4>
						</Box>
					</StyledCard2>

					<Divider sx={{ my: 3 }} />

					<StyledCard2>
						<Box ml="-5px">
							<H4>Supplier: <small>{bin_data.supplier}</small></H4>
						</Box>
					</StyledCard2>
						
					</Grid>
					<Divider sx={{ my: 3 }} />
					{/* {ActionButton(requisition)} */}
					
				</Grid>
				
			{/* </StyledCard> */}
		</CardRoot>
	);
};

export default SmartBinDetailsCard;
