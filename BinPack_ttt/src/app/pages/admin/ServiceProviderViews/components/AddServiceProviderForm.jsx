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
import { useNavigate } from 'react-router-dom';

const TextField = styled(TextValidator)(() => ({
	width: "100%",
	marginBottom: "16px",
}));

const AddServiceProviderForm = () => {
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
			const response = await axios.post('/company', { 
				name: event.target.companyName.value,
				phone: event.target.mobile.value,
				email: event.target.email.value,
				address: event.target.address.value,
				registration_no: event.target.registration.value,
				tax_no: event.target.tax.value,
				client_id: '',
				created_date: new Date(),
				updated_at: new Date(),
				headers: { 
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}` 
				},
				// withCredentials: true
			})
			const { status } = response.data;
			//console.log("companies: " + companies);
			if (status === 'success') {
				setOpen(true);
				navigate('/netcare/admin/service-provider');
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
		companyName,
		mobile,
		registration,
		tax,
		address,
		email,
	} = state;

	return (
		<div>
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }} variant="filled">
			Service Provider has been added success!
			</Alert>
		</Snackbar>
		<ValidatorForm onSubmit={handleSubmit} onError={() => null}>
			<Grid container spacing={6}>
				<Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

					<TextField
						type="text"
						name="companyName"
						label="Company Name"
						onChange={handleChange}
						value={companyName || ""}
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
		</div>
	);
};

export default AddServiceProviderForm;
