import {
	Button,
	// TextField,
	CircularProgress,
	Icon,
	Autocomplete,
	Box,
	styled,
	Card,
	Divider,
} from '@mui/material';
import { Span } from 'app/components/Typography';
import { useEffect, useState, Fragment } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'app/api/axios';

const AutoComplete = styled(Autocomplete)(() => ({}));

// function sleep(delay = 0) {
// return new Promise((resolve) => setTimeout(resolve, delay));
// }
const TextField = styled(TextValidator)(() => ({
width: '100%',
marginBottom: '16px',
}));

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

const Title = styled('span')(() => ({
fontSize: '1rem',
fontWeight: '500',
textTransform: 'capitalize',
}));
const accessToken = window.localStorage.getItem('accessToken');

const DriverAssignCard = ({ requisition }) => {
		const [open, setOpen] = useState(false);
		// eslint-disable-next-line no-unused-vars
		const [options, setOptions] = useState([]);
		const loading = open && options.length === 0;
		const [hospitalOptions, setHospitalOptions] = useState([]);
		const [manifest, setManifests] = useState(null);
		const [hospitalDropdownValue, setHospitalDropdownValue] = useState(null);
		const [manifeststatus, setManifeststatus] = useState(null);


	useEffect(() => {
		// var active = true;
		let userlist = [];

		if (!loading) {
		return undefined;
		}

		(async () => {
			try {
				//console.log('requisition.serviceProviderId: ' + requisition.serviceProviderId);
				var url = '/users/userfield?company_id=' + requisition.serviceProviderId
				const response = await axios.get(url, {
					headers: { 
						'Content-Type': 'application/json',
						// Authorization: `Bearer ${accessToken}` 
					},
				});
				const { status, users } = response.data;
				if ( status === 'success' ) {
					users.forEach((user) => {
						//console.log('user.role: ' + user.role);
						if (user.role === 'driver') {
							//console.log('user: ' + user.name);
							userlist.push({
								id: user._id,
								name: user.name +' '+ user.surname
							})
						}
					});
				}
				setHospitalOptions(userlist);
				//console.log('hospitalOptions: ' + hospitalOptions);
			} catch (error) {
				//console.log('error: ' + error);
			}
		})();

		return () => {
			// active = false;
		};
	}, [loading, hospitalOptions, requisition.serviceProviderId]);

	useEffect(() => {	
		const fetchManifestlData = async () => {
			try {
				var manifest_url = '/manifest/requisionId?requisition_id=' + requisition.requision_id;
				const get_response = await axios.get( manifest_url , {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const { status, manifests} = get_response.data;
	
				if (status === 'success') {
					setManifests(manifests[0])
				}
				//console.log('setManifests: ' + manifest._id);
			} catch (error) {
			//console.log('error: ' + error);
			}
		};
		fetchManifestlData() 
		if (!open) {
		setHospitalOptions([]);
		}
	}, [manifest._id, open, requisition.requision_id]);

	const handleHospitalDropdownChange = (_, newValue) => {
		//console.log('newValue');
		//console.log(newValue);
		setHospitalDropdownValue(newValue);
	};

	const handleManifeststatus = (_, newValue) => {
		//console.log('ManifeststatusnewValue: ' + newValue.label);
		if (newValue && newValue.inputValue) {
		setManifeststatus({ label: newValue.inputValue });
		return;
		}
		setManifeststatus(newValue);
	};

	const handleSubmit = async () => {

		try {
			//console.log('manifest: ' + manifest._id);
			//console.log('hospitalDropdownValue.id: ' + hospitalDropdownValue.id);
			const response = await axios.patch( '/manifest/'+ manifest._id, {
				driver_id: hospitalDropdownValue.id,
				status: manifeststatus.label,
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
			//console.log('patch_error1: ' + error);
		}

		try {
			var requisition_url = '/requisition/' + requisition._id;
			const response = await axios.patch( requisition_url, {
				driver_id: hospitalDropdownValue.id,
				status: manifeststatus.label,
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
	};

	const DriverCheck = (requisition) => {
		//console.log('manifest.driver_id: ' + requisition.driver_id);
		if (requisition.driver_id !== null || requisition.driver_id !== '') {
			return <small>A driver has already been assigned to this task.</small>
		}
	};

	return (
		<CardRoot>
		  {/* <StyledCard elevation={0}></StyledCard> */}
		  <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
			<CardHeader>
			  <Title>Assign Driver</Title>
			  {DriverCheck(requisition)}
			</CardHeader>
	
			<Divider sx={{ my: 3 }} />
	
			{/* <Grid container > */}
			<Box ml="-5px">
			  <AutoComplete
				value={manifeststatus}
				options={manifest_status}
				onChange={handleManifeststatus}
				getOptionLabel={(option) => option.label}
				renderInput={(params) => (
				  <TextField {...params} label="Manifest Status" variant="outlined" />
				)}
			  />
			</Box>
			<Box ml="-5px">
			  <AutoComplete
				open={open}
				options={hospitalOptions}
				loading={loading}
				onChange={handleHospitalDropdownChange}
				id="driver"
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
				getOptionLabel={(option) => option.name }
				isOptionEqualToValue={(option, value) => option.name === value.name}
				renderInput={(params) => (
				  <TextField
					{...params}
					fullWidth
					variant="outlined"
					label="Driver"
					InputProps={{
					  ...params.InputProps,
					  endAdornment: (
						<Fragment>
						  {loading ? <CircularProgress color="inherit" size={20} /> : null}
						  {params.InputProps.endAdornment}
						</Fragment>
					  ),
					}}
				  />
				)}
			  />
			</Box>
			{/* </Grid> */}
	
			<Button color="primary" variant="contained" type="submit">
			  <Icon>send</Icon>
			  <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
			</Button>
		  </ValidatorForm>
		</CardRoot>
	  );
	};
	const manifest_status = [
	  { label: 'Awaiting Acceptance' },
	  { label: 'Assigned to Driver' },
	  { label: 'Waste Collected' },
	  { label: 'En Route to Sorting' },
	  { label: 'En Route to Landfill' },
	  { label: 'En Route to Scrapyard/Recycling Deport' },
	  { label: 'Sorting Facility' },
	  { label: 'Handed Over' },
	  { label: 'Waste Disposed' },
	];

export default DriverAssignCard;
