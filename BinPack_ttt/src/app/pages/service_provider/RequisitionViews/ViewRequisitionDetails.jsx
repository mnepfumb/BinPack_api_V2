import {
  Grid,
  styled,
  Box,
  Button,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { Fragment } from 'react';
import SimpleCard from 'app/components/SimpleCard';
import DriverAssignCard from './components/DriverAssignCard';
import DetailsCard from './components/DetailsCard';
import ViewManifest from './components/ViewManifest';
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

const ViewRequisitionDetails = () => {
	const  location  = useLocation();
    const navigate = useNavigate();
	//console.log('location.requision_id: ' +location.state.requisition.requision_id);

	const ShowDriverAssignCard = (requisition) => {
		//console.log('requisition.createManifest: ' + requisition.createManifest);
		//console.log('requisition.acceptRequisitions: ' + requisition.acceptRequisitions);
		if (requisition.acceptRequisitions) {
			return <DriverAssignCard requisition={requisition}/>
		}
	}

	const ShowViewManifest = (requisition) => {
		//console.log('requisition.createManifest: ' + requisition.createManifest);
		if (requisition.createManifest) {
			return <ViewManifest requisition={requisition}/>;
		}
	}

	const onClick = () => navigate(-1);

	return (
		<Fragment>
			<ContentBox className="admin-analytics">
				<SimpleCard>
					<CardHeader>
						<Title>Requisition Information</Title>
						<Box ml="-5px" style={{textAlign: 'right'}}>
							<Button color="primary" variant="contained" onClick={onClick}>
								<Span sx={{ pl: 1, textTransform: "capitalize" }}>Back</Span>
							</Button>
						</Box>
					</CardHeader>
				
					<Grid container spacing={3}>
						<Grid item lg={6} md={6} sm={12} xs={12}>
							<DetailsCard requisition={location.state.requisition}/>
						</Grid>
						<Grid item lg={6} md={6} sm={12} xs={12}>
							{ShowDriverAssignCard(location.state.requisition)}
						</Grid>
					</Grid>
					{ShowViewManifest(location.state.requisition)}
				</SimpleCard>
			</ContentBox>
		</Fragment>
	);
};

export default ViewRequisitionDetails;
