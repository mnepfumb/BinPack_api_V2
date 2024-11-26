import {
//   Grid,
  Button,
  styled,
  Box,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { Fragment } from 'react';
import SimpleCard from 'app/components/SimpleCard';
import SmartBinDetailsCard from './components/SmartBinDetailsCard';
import { useNavigate, useLocation } from 'react-router-dom';


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

  const ContentBox = styled('div')(({ theme }) => ({
	margin: '30px',
	[theme.breakpoints.down('sm')]: { margin: '16px' },
  }));

const ViewSmartBinsDetails = () => {
	const  location  = useLocation();
    const navigate = useNavigate();
	
	const onClick = () => navigate(-1);

	return (
		<Fragment>
			<ContentBox className="admin-analytics">
				<SimpleCard>
					<CardHeader>
						<Title>Smart-Bin Information</Title>

						<Box ml="-5px" style={{textAlign: 'right'}}>
							<Button color="primary" variant="contained" onClick={onClick}>
								<Span sx={{ pl: 1, textTransform: "capitalize" }}>Back</Span>
							</Button>
						</Box>
					</CardHeader>
					<SmartBinDetailsCard bin_data={location.state.bin_data}/>
				</SimpleCard>
			</ContentBox>
		</Fragment>
	);
};

export default ViewSmartBinsDetails;
