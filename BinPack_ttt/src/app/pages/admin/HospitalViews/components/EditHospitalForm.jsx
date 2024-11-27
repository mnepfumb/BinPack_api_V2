import {
	Button,
	Grid,
	Icon,
	styled, 
	Snackbar,
	Alert
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from 'app/api/axios';
import { useNavigate, useLocation } from 'react-router-dom';

const TextField = styled(TextValidator)(() => ({
	width: "100%",
	marginBottom: "16px",
}));

const EditHospitalForm = () => {
  const  location  = useLocation();
  // const hospital = location.state.hospital;

  //console.log(location.state.hospital);

	const [state, setState] = useState({ date: new Date() });
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();


	function handleClose(_, reason) {
		if (reason === "clickaway") {
		  return;
		}
		setOpen(false);
	}

	const handleSubmit = async (event) => {
		try {
			const accessToken = window.localStorage.getItem('accessToken')
			//console.log("accessToken: " + accessToken);
      var url = '/hospital/' + location.state.hospital._id;
			const response = await axios.patch(url, { 
				name: event.target.hospitalName.value,
				phone: event.target.mobile.value,
				email: event.target.email.value,
				address: event.target.address.value,
				registration_no: event.target.registration.value,
				tax_no: event.target.tax.value,
				client_id: '',
				created_date: location.state.hospital.created_date,
				updated_at: new Date(),
				headers: { 
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}` 
				},
				// withCredentials: true
			})
			const { status } = response.data;
			//console.log("hospitals: " + hospitals);
			if (status === 'success') {
				navigate('/netcare/admin/hospital');
			}
		} catch (error) {
			//console.log("error: " + error);
		}
	};

	const handleChange = (event) => {
		event.persist();
		setState({ ...state, [event.target.name]: event.target.value });
	};

	const {
    
		hospitalName = location.state.hospital.name,
		mobile = location.state.hospital.phone,
		registration = location.state.hospital.registration_no,
		tax = location.state.hospital.tax_no,
		address = location.state.hospital.address,
		email = location.state.hospital.email,
	} = state;

	return (
		<div>
		<ValidatorForm onSubmit={handleSubmit} onError={() => null}>
			<Grid container spacing={6}>
				<Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

					<TextField
						type="text"
						name="hospitalName"
						label={"Hospital Name"}
						onChange={handleChange}
						value={hospitalName || ""}
						validators={["required",  "minStringLength:1", "maxStringLength: 100"]}
						errorMessages={["this field is required", "this field requires 100 characters", "this field requires 100 characters"]}
					/>

					<TextField
						type="email"
						name="email"
						label="Email"
						value={email || ""}
						onChange={handleChange}
						validators={["required", "isEmail"]}
						errorMessages={["this field is required", "email is not valid"]}
					/>

					<TextField
						type="text"
						name="address"
						label="Address"
						onChange={handleChange}
						value={address || ""}
						errorMessages={["this field is required", "this field requires 40 characters", "this field requires 40 characters"]}
						validators={["required", "minStringLength:1", "maxStringLength: 40"]}
					/>
				</Grid>

				<Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
					<TextField
						type="text"
						name="mobile"
						value={mobile || ""}
						label="Mobile Number"
						onChange={handleChange}
						validators={["required"]}
						errorMessages={["this field is required"]}
					/>
					<TextField
						type="text"
						name="registration"
						value={registration || ""}
						label="Registration Number"
						onChange={handleChange}
						validators={["required", "minStringLength:1", "maxStringLength: 20"]}
						errorMessages={["this field is required", "this field requires 20 characters", "this field requires 20 characters"]}
					/>
					<TextField
						type="text"
						name="tax"
						value={tax || ""}
						label="Tax Number"
						onChange={handleChange}
						validators={["required", "minStringLength:1", "maxStringLength: 10"]}
						errorMessages={["this field is required", "this field requires 10 characters", "this field requires 10 characters"]}
					/>
					
				</Grid>
			</Grid>

			<Button color="primary" variant="contained" type="submit">
				<Icon>send</Icon>
				<Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
			</Button>
		</ValidatorForm>

		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }} variant="filled">
				Hospital details have been updated success!
			</Alert>
		</Snackbar>
		</div>
	);
};

export default EditHospitalForm;