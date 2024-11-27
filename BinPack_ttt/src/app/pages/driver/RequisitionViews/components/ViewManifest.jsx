import {
  Button,
  Grid,
  Icon,
  Box,
  styled,
  Card,
  Divider,
} from "@mui/material";
import { Span, H1, H2, H3, H5, Small } from "app/components/Typography";
import { useEffect, useState } from "react";
import React from 'react';
import ViewManifestTable from './ViewManifestTable';
import { Link } from 'react-router-dom';
import axios from 'app/api/axios';
import { convertHexToRGB } from 'app/utils/utils';

const CardRoot = styled(Card)(({ theme }) => ({
	marginBottom: '24px',
	padding: '24px !important',
	[theme.breakpoints.down('sm')]: { paddingLeft: '16px !important' },
}));

const CardHeader = styled(Box)(() => ({
	display: 'flex',
	paddingLeft: '24px',
	paddingRight: '24px',
	marginBottom: '12px',
	alignItems: 'center',
	justifyContent: 'space-between',
}));

const StyledCard = styled(Card)(({ theme }) => ({
	boxShadow: 'none',
	textAlign: 'left',
	position: 'relative',
	padding: '24px !important',
	background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
	[theme.breakpoints.down('sm')]: { padding: '16px !important' },
  }));

const Title = styled('span')(() => ({
	fontSize: '1rem',
	fontWeight: '500',
	textTransform: 'capitalize',
}));

const ViewManifest = ({ requisition }) => {
	const [manifest, setManifest] = useState([]);


	//console.log("ViewManifest" + requisition.requision_id);

	useEffect(() => {


		const fetchHospitalData = async () => {
			try {
			  const accessToken = window.localStorage.getItem('accessToken');
			  //console.log('accessToken: ' + accessToken);
			  const url = '/manifest/requisionId?requisition_id='+ requisition.requision_id;
			  //console.log('url: ' + url);
	
			  const response = await axios.get(url, {
				headers: {
				  'Content-Type': 'application/json',
				  Authorization: `Bearer ${accessToken}`,
				},
			  });
			  const { status, manifests } = response.data;
			  if (status === 'success') {
				setManifest(manifests[0]);
				//console.log('manifests[0]: ' + manifests[0]);
			  }
			} catch (error) {
			  //console.log('error: ' + error);
			}
		};
		fetchHospitalData();
	}, [requisition.requision_id]);

	const IcidentCard = (manifest) => {
		return (
			<>
			<StyledCard elevation={0}>
				<H1>Incident    <Title>Details</Title></H1>
				<Grid container spacing={3}>
					<Grid item lg={6} md={6} sm={12} xs={12}>
					<H5>Incident Type:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.incident_type}</Small></H5>
					</Grid>
					<Grid item lg={6} md={6} sm={12} xs={12} style={{alignSelf: 'flex-end'}} >
						<Box ml="-5px" style={{textAlign: 'right'}}>
							<H5>Incident Notes:  </H5>
							<Small style={{ marginLeft: '2.5rem' }}>{manifest.incident_notes}</Small>
						</Box>
					</Grid>
				</Grid>
			</StyledCard>
				<Divider sx={{ my: 5 }} />
			</>
		);
	}
	
	return (
		<CardRoot>
			<CardHeader>
				<H1>Manifest    <Title>Details</Title></H1>
			</CardHeader>

			<Divider sx={{ my: 5 }} />

			<Grid container spacing={3}>
				<Grid item lg={6} md={6} sm={12} xs={12}>
					<H2>{manifest.company_name}</H2>
					<H5>{manifest.requisition_id}</H5>
				</Grid>
				<Grid item lg={6} md={6} sm={12} xs={12} style={{alignSelf: 'flex-end'}} >
					<Box ml="-5px" style={{textAlign: 'right'}}>
						<H5>Manifest Status:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.status}</Small></H5>
						<H5>Manifest Date:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.created_date}</Small></H5>
					</Box>
				</Grid>
			</Grid>

			<Divider sx={{ my: 5 }} />

			<Grid container spacing={3}>
				<Grid item lg={6} md={6} sm={12} xs={12}>
					<H3>Collection </H3>
					<H5>Operator In:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.operator_in}</Small></H5>
					<H5>Time In:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.time_in}</Small></H5>
					<H5>Operator Out:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.operator_out}</Small></H5>
					<H5>Time Out:   <Small style={{ marginLeft: '2.5rem' }}>{manifest.time_out}</Small></H5>
				</Grid>
				<Grid item lg={6} md={6} sm={12} xs={12} style={{alignSelf: 'flex-end'}} >
					<Box ml="-5px" style={{textAlign: 'right'}}>
						<H3>Disposal</H3>
						<H5>Landfill:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.landfill}</Small></H5>
						<H5>Notes:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.notes}</Small></H5>
					</Box>
				</Grid>
			</Grid>
			
			<Divider sx={{ my: 5 }} />

			<ViewManifestTable manifest={manifest}/>

			<Divider sx={{ my: 5 }} />
			
			<Box ml="-5px" style={{textAlign: 'right'}}>
				<H5>Total Mass (Kg):  <Small style={{ marginLeft: '2.5rem' }}>{manifest.waste_mass}</Small></H5>
				<H5>Tonnage Charged:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.waste_mass}</Small></H5>
			</Box>

			<Divider sx={{ my: 5 }} />

			{IcidentCard(manifest)}

			<Link state={{ manifest: manifest }} to={{ pathname: '/netcare/driver/edit-manifest-details', state: manifest }}>
				<Button color="primary" variant="contained" >
					<Icon>edit</Icon>
					<Span sx={{ pl: 1, textTransform: "capitalize" }}>Edit Manifest</Span>
				</Button>
			</Link>
		</CardRoot>
	);
};

export default ViewManifest;
