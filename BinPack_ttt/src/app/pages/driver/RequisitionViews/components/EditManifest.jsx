import { TimePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Icon,
  Autocomplete,
  Box,
  styled,
  Card,
  Divider,
} from "@mui/material";
import { Span, H1, H2, H3, H5, Small } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SimpleCard from 'app/components/SimpleCard';
import axios from 'app/api/axios';

const AutoComplete = styled(Autocomplete)(() => ({  }));
const TextField = styled(TextValidator)(() => ({
	width: "100%",
	marginBottom: "16px",
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

const EditManifest = () => {
	const [state, setState] = useState({ date: new Date() });
    const navigate = useNavigate();
    const manifest = useLocation();
    const [selectedTimeIn, setSelectedTimeIn] = React.useState(
        // new Date('2014-08-18T21:11:54')
        manifest.state.manifest.time_in
    )
    const [selectedTimeOut, setSelectedTimeOut] = React.useState(
        // new Date('2014-08-18T21:11:54')
        manifest.state.manifest.time_out
    )
    const [manifeststatus, setManifeststatus] = React.useState(null);
    const [, setTreatmentstatus] = React.useState(null);
    const [wasteType, ] = React.useState(null);
    const [wastestatus, setWastestatus] = React.useState(null);

    const handleManifeststatus = (_, newValue) => {
        if (newValue && newValue.inputValue) {
            setManifeststatus({ label: newValue.inputValue });
            return;
        }
        setManifeststatus(newValue);
    };

    const handleTreatmentstatus = (_, newValue) => {
        if (newValue && newValue.inputValue) {
            setTreatmentstatus({ label: newValue.inputValue });
            return;
        }
        setTreatmentstatus(newValue);
    };

    // const handleWasteType = (_, newValue) => {
    //     if (newValue && newValue.inputValue) {
    //         setWasteType({ label: newValue.inputValue });
    //         return;
    //     }
    //     setWasteType(newValue);
    // };

    const handleWastestatus = (_, newValue) => {
        if (newValue && newValue.inputValue) {
            setWastestatus({ label: newValue.inputValue });
            return;
        }
        setWastestatus(newValue);
    };

    const onClick = () => navigate(-1);

    //console.log("EditManifest manifest: " + manifest.state.manifest.requisition_id);
	useEffect(() => {
		ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
		if (value !== state.password) return false;

		return true;
		});
		return () => ValidatorForm.removeValidationRule("isPasswordMatch");
	}, [state.password]);

	const handleSubmit = async (event) => {
        var Waste_Disposed = false
        var Waste_Diverted = false
        var Waste_Collected = false
        var Incident = false
        try {
            if (wastestatus === 'Waste Disposed') {
                Waste_Disposed = true
            }
            else if (wastestatus === 'Waste Diverted') {
                Waste_Diverted = true
            }
            if (manifeststatus === 'Waste Collected') {
                Waste_Collected = true
            }
            if (event.target.incident_type.value !== '' && event.target.incident_notes.value !== '') {
                Incident = true
            }

			const accessToken = window.localStorage.getItem('accessToken')
			//console.log("accessToken: " + accessToken);
            var url = '/manifest/' + manifest.state.manifest._id;
			//console.log("url: " + url);
			const response = await axios.patch(url, { 
				status: manifeststatus,
				operator_in: event.target.operator_in.value,
				operator_out: event.target.operator_out.value,
				landfill: event.target.landfill.value,
				notes: event.target.notes.value,
				wasteType: wasteType,
				treatment: event.target.treatment.value,
				bin_location: event.target.bin_location.value,
				bin_qty: event.target.bin_qty.value,
				bin_size: event.target.bin_size.value,
				waste_mass: event.target.waste_mass.value,
				incident: Incident,
				incident_type: event.target.incident_type.value,
				incident_notes: event.target.incident_notes.value,
				time_in: selectedTimeIn,
				time_out: selectedTimeOut,
				updated_at: new Date(),
                wasteDiverted: Waste_Diverted,
                wasteDisposed: Waste_Disposed,
                wasteCollected: Waste_Collected,
				headers: { 
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}` 
				},
				// withCredentials: true
			})
			const { status } = response.data;
			//console.log("manifests: " + manifests);
			if (status === 'success') {
				navigate(-1);
			}
		} catch (error) {
			//console.log("error: " + error);
		}
	};

	const handleChange = (event) => {
		event.persist();
		setState({ ...state, [event.target.name]: event.target.value });
	};

    function handleTimeIn(date) {
        setSelectedTimeIn(date)
    }
    function handleTimeOut(date) {
        setSelectedTimeOut(date)
    }
	const {
		// status = manifest.state.manifest.status,
		operator_in = manifest.state.manifest.operator_in,
		operator_out = manifest.state.manifest.operator_out,
		landfill = manifest.state.manifest.landfill,
		notes = manifest.state.manifest.notes,
		// wasteType = manifest.state.manifest.wasteType,
		treatment = manifest.state.manifest.treatment,
        bin_location = manifest.state.manifest.bin_location,
        bin_qty = manifest.state.manifest.bin_qty,
        bin_size = manifest.state.manifest.bin_size,
        waste_mass = manifest.state.manifest.waste_mass,
	} = state;


	return (
        <CardRoot>
            <SimpleCard elevation={0}>
                <CardRoot>
                    <ValidatorForm onSubmit={handleSubmit} onError={() => null}>

                        <Box ml="-5px" style={{textAlign: 'right'}}>
                            <Button color="primary" variant="contained" onClick={onClick}>
                                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Back</Span>
                            </Button>
                        </Box>

                        <Divider sx={{ my: 5 }} />

                        <CardHeader>
                            <H1>Manifest    <Title>Edit</Title></H1>
                        </CardHeader>
                    
                        <Divider sx={{ my: 5 }} />

                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <H2>{manifest.state.manifest.company_name}</H2>
                                <H5>{manifest.state.manifest.requisition_id}</H5>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} style={{alignSelf: 'flex-end'}} >
                                <Box ml="-5px" style={{textAlign: 'right'}}>

                                    <AutoComplete
                                        value={manifeststatus}
                                        options={manifest_status}
                                        onChange={handleManifeststatus}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                        <TextField {...params} label="Manifest Status" variant="outlined"  />
                                        )}
                                    />
                                    <H5>Manifest Date:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.state.manifest.created_date}</Small></H5>
                                </Box>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 5 }} />

                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <H3>Collection </H3>
                                <TextField
                                    type="text"
                                    name="operator_in"
                                    label={"Operator In"}
                                    onChange={handleChange}
                                    value={operator_in || ""}
                                    // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                    // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid
                                        container
                                        sx={{ width: '60%' }}
                                        justify="space-around"
                                    >
                                        <TimePicker
                                            value={selectedTimeIn}
                                            onChange={handleTimeIn}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    variant="standard"
                                                    id="time_in"
                                                    label="Time In"
                                                />
                                            )}
                                        />
                                    </Grid>
                                </LocalizationProvider>
                                <TextField
                                    type="text"
                                    name="operator_out"
                                    label={"Operator Out"}
                                    onChange={handleChange}
                                    value={operator_out || ""}
                                    // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                    // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Grid
                                        container
                                        sx={{ width: '60%' }}
                                        justify="space-around"
                                    >
                                        <TimePicker
                                            value={selectedTimeOut}
                                            onChange={handleTimeOut}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    variant="standard"
                                                    id="time_out"
                                                    label="Time Out"
                                                />
                                            )}
                                        />
                                    </Grid>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} style={{alignSelf: 'flex-end'}} >
                                <Box ml="-5px" style={{textAlign: 'right'}}>
                                    <H3>Disposal</H3>
                                    
                                    <TextField
                                        type="text"
                                        name="landfill"
                                        label={"Landfill"}
                                        onChange={handleChange}
                                        value={landfill || ""}
                                        // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                        // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                    />
                                    <TextField
                                        type="text"
                                        name="notes"
                                        label={"Notes"}
                                        onChange={handleChange}
                                        value={notes || ""}
                                        // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                        // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        
                        <Divider sx={{ my: 5 }} />

                        <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
                            <Box overflow="auto">
                                <ProductTable>
                                <TableHead>
                                    <TableRow>
                                    <TableCell sx={{ px: 0 }} colSpan={2}>
                                        Waste Type
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }} colSpan={2}>
                                        Treatment
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }} colSpan={2}>
                                        Bin Location
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }} colSpan={2}>
                                        Bin Qty
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }} colSpan={2}>
                                        Bin Sizes
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }} colSpan={2}>
                                        Mass (Kg)
                                    </TableCell>
                                    <TableCell sx={{ px: 0 }} colSpan={2}>
                                        Waste Status
                                    </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody border-spacing="0 15px">
                                    {/* {productList.map((product, index) => ( */}
                                    <TableRow  hover>
                                        <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                                            <Box  alignItems="left">
                                            {/* <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.wasteType}</Paragraph> */}
                                            {/* <TextField
                                                type="text"
                                                name="wasteType"
                                                label={"WasteType"}
                                                onChange={handleChange}
                                                value={wasteType || ""}
                                                // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                                // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                            /> */}

                                            <AutoComplete
                                                value={wasteType}
                                                options={waste_Type}
                                                onChange={handleTreatmentstatus}
                                                getOptionLabel={(option) => option.label}
                                                renderInput={(params) => (
                                                <TextField {...params} label="WasteType" variant="outlined"  />
                                                )}
                                            />
                                        </Box>
                                        </TableCell>

                                        <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                                        <Box display="flex" alignItems="center">
                                            {/* <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.treatment}</Paragraph> */}
                                            <TextField
                                                type="text"
                                                name="treatment"
                                                label={"Treatment"}
                                                onChange={handleChange}
                                                value={treatment || ""}
                                                // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                                // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                            />
                                        </Box>
                                        </TableCell>

                                        <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                                        <Box display="flex" alignItems="center">
                                            {/* <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.bin_location}</Paragraph> */}
                                            <TextField
                                                type="text"
                                                name="bin_location"
                                                label={"Bin Location"}
                                                onChange={handleChange}
                                                value={bin_location || ""}
                                                // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                                // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                            />
                                        </Box>
                                        </TableCell>

                                        <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                                        <Box display="flex" alignItems="center">
                                            {/* <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.bin_qty}</Paragraph> */}
                                            <TextField
                                                type="text"
                                                name="bin_qty"
                                                label={"Bin Qty"}
                                                onChange={handleChange}
                                                value={bin_qty || ""}
                                                // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                                // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                            />
                                        </Box>
                                        </TableCell>

                                        <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                                        <Box display="flex" alignItems="center">
                                            {/* <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.bin_size}</Paragraph> */}
                                            <TextField
                                                type="text"
                                                name="bin_size"
                                                label={"Bin Size"}
                                                onChange={handleChange}
                                                value={bin_size || ""}
                                                // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                                // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                            />
                                        </Box>
                                        </TableCell>

                                        <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                                        <Box display="flex" alignItems="center">
                                            {/* <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.waste_mass}</Paragraph> */}

                                            <TextField
                                                type="text"
                                                name="waste_mass"
                                                label={"Waste Mass"}
                                                onChange={handleChange}
                                                value={waste_mass || ""}
                                                // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                                // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                            />
                                        </Box>
                                        </TableCell>

                                        <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                                            <Box  alignItems="left">
                                                <AutoComplete
                                                    value={wastestatus}
                                                    onChange={handleWastestatus}
                                                    options={waste_status}
                                                    getOptionLabel={(option) => option.label}
                                                    renderInput={(params) => (
                                                    <TextField {...params} label="Waste Status" variant="outlined"  />
                                                    )}
                                                />
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                </ProductTable>
                            </Box>
                        </Card>

                        <Divider sx={{ my: 5 }} />
                        
                        <input accept="image/*" className="input" id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                        <IconButton
                            color="primary"
                            component="span"
                            className="button"
                            aria-label="Upload picture"
                        >
                            <Icon>cloud_upload</Icon>
                            Upload Documents
                        </IconButton>
                        </label>

                        <Divider sx={{ my: 5 }} />
                        
                        <Box ml="-5px" style={{textAlign: 'right'}}>
                            <H5>Total Mass (Kg):  <Small style={{ marginLeft: '2.5rem' }}>{manifest.waste_mass}</Small></H5>
                            <H5>Tonnage Charged:  <Small style={{ marginLeft: '2.5rem' }}>{manifest.waste_mass}</Small></H5>
                        </Box>

                        <Divider sx={{ my: 5 }} />

                        <H2>Incident</H2>
                        <Grid container spacing={3}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <H3>Incident Type</H3>
                                <TextField
                                    type="text"
                                    name="incident_type"
                                    label={"Incident Type"}
                                    onChange={handleChange}
                                    value={operator_out || ""}
                                    // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                    // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} style={{alignSelf: 'flex-end'}} >
                                <Box ml="-5px" style={{textAlign: 'right'}}>
                                    <H3>Incident Notes</H3>
                                    
                                    <TextField
                                        type="text"
                                        name="incident_notes"
                                        label={"Incident Notes"}
                                        onChange={handleChange}
                                        value={landfill || ""}
                                        // validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
                                        // errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
                                    />
                                </Box>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 5 }} />

                        <Box ml="-5px" style={{textAlign: 'right'}}>
                            <Button color="primary" variant="contained" type="submit">
                                <Icon>send</Icon>
                                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                            </Button>
                        </Box>
                    </ValidatorForm>
                </CardRoot>
            </SimpleCard>
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
const waste_status = [
      { label: 'Waste Disposed' },
      { label: 'Waste Diverted' },
    //   { label: 'Waste Collected' },
];
// const treatment_status = [
//     { label: 'Awaiting Acceptance' },
//     { label: 'Assigned to Driver' },
//     { label: 'Waste Collected' },
//     { label: 'En Route to Sorting' },
//     { label: 'En Route to Landfill' },
//     { label: 'En Route to Scrapyard/Recycling Deport' },
//     { label: 'Sorting Facility' },
//     { label: 'Handed Over' },
//     { label: 'Waste Disposed' },
// ];
const waste_Type = [
    { label: 'Covid Waste' },
    { label: 'General Waste' },
    { label: 'Hazardous Waste' },
    { label: 'Metal Waste' },
    { label: 'Paper Waste' },
    { label: 'Plastic Waste' },
    { label: 'Refuse Waste' },
    { label: 'Healthcare Risk Waste' },
    { label: 'Other' },
];
export default EditManifest;
