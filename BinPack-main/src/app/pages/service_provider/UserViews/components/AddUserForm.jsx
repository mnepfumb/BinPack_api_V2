import {
  Button,
  Grid,
  Icon,
  styled,
  FormControl,
  Autocomplete,
  CircularProgress,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import { Span } from 'app/components/Typography';
import { useState, useEffect, Fragment } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'app/api/axios';
import { useNavigate } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import SimpleCard from 'app/components/SimpleCard';

const AutoComplete = styled(Autocomplete)(() => ({}));

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

// type DropdownType = {
// 	id: number,
// 	label: string,
// 	hospital_id: string
// }
const accessToken = window.localStorage.getItem('accessToken');

const AddUserForm = () => {
  const [formState, setFormState] = useState({ date: new Date() });
  const [open, setOpen] = useState(false);
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [dropdownValue, setDropdownValue] = useState(null);
  const loading = open && hospitalOptions.length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await axios.get('/hospital', {
        headers: { 
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${accessToken}` 
				},
      });
      const { hospitals } = response.data;

      //console.log(hospitals);

      if (active) {
        //console.log(hospitals);
        setHospitalOptions(hospitals);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, hospitalOptions]);

  useEffect(() => {
    if (!open) {
      setHospitalOptions([]);
    }
  }, [open]);

  const handleSubmit = async (event) => {
    //console.log(event.target.role.value);
    //console.log(dropdownValue.name);
    //console.log(dropdownValue.hospital_id);
    //console.log(event.target.userstatus.value);
    try {
      //console.log('accessToken: ' + accessToken);
      const response = await axios.post('/users', {
        name: event.target.username.value,
        surname: event.target.surname.value,
        role: event.target.role.value,
        password: event.target.password.value,
        company: dropdownValue.name,
        company_id: dropdownValue.hospital_id,
        is_active: event.target.userstatus.value,
        phone: event.target.mobile.value,
        email: event.target.email.value,
        created_date: new Date(),
        updated_at: new Date(),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        // withCredentials: true
      });
      const { status } = response.data;

      if (status === 'success') {
        // setOpen(true);
        navigate('/service_provider/user');
      }
    } catch (error) {
      //console.log('error: ' + error);
    }
  };
  const handleDropdownChange = (_, newValue) => {
    //console.log('newValue');
    //console.log(newValue);
    // if (newValue && newValue.inputValue) {
    // 	setDropdownValue({ label: newValue.inputValue });
    //   return;
    // }
    setDropdownValue(newValue);
  };

  // function handleRoleChange(event) {
  // 	setRole(event.target.value);
  // }

  // function handleIsActiveChange(event) {
  // 	setIsActive(event.target.value);
  // }

  const handleChange = (event) => {
    event.persist();
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const { username, mobile, surname, password, confirmPassword, email, role, isActive } = formState;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="username"
              label="Name"
              onChange={handleChange}
              value={username || ''}
              validators={['required', 'minStringLength:1', 'maxStringLength: 100']}
              errorMessages={[
                'this field is required',
                'this field requires 100 characters',
                'this field requires 100 characters',
              ]}
            />

            <TextField
              type="email"
              name="email"
              label="Email"
              value={email || ''}
              onChange={handleChange}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              value={password || ''}
              onChange={handleChange}
              // validators={["required"]}
              // errorMessages={["this field is required"]}
            />
            <AutoComplete
              open={open}
              options={hospitalOptions}
              loading={loading}
              onChange={handleDropdownChange}
              id="Hospital"
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  label="Choose Hospital"
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
            <SimpleCard>
              <FormControl component="fieldset" className="formControl">
                <FormLabel component="legend">Would you like this user to be active</FormLabel>
                <RadioGroup
                  value={isActive}
                  name="userstatus"
                  className="userstatus"
                  aria-label="User Status"
                  onChange={handleChange}
                >
                  <FormControlLabel value={true} control={<Radio />} label="Active" />
                  <FormControlLabel value={false} control={<Radio />} label="None Active" />
                </RadioGroup>
              </FormControl>
            </SimpleCard>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="surname"
              label="Surname"
              onChange={handleChange}
              value={surname || ''}
              validators={['required', 'minStringLength:1', 'maxStringLength: 100']}
              errorMessages={[
                'this field is required',
                'this field requires 100 characters',
                'this field requires 100 characters',
              ]}
            />
            <TextField
              type="text"
              name="mobile"
              value={mobile || ''}
              label="Mobile Number"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              label="Confirm Password"
              value={confirmPassword || ''}
              // validators={["required", "isPasswordMatch"]}
              // errorMessages={["this field is required", "password didn't match"]}
            />
            <SimpleCard>
              <FormControl component="fieldset" className="formControl">
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup
                  value={role}
                  name="role"
                  className="Role"
                  aria-label="Role"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="hospitals admin"
                    control={<Radio />}
                    label="Hospital Admin"
                  />
                  <FormControlLabel
                    value="hospitals staff"
                    control={<Radio />}
                    label="Hospital Staff"
                  />
                </RadioGroup>
              </FormControl>
            </SimpleCard>
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>

      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }} variant="filled">
				User has been added success!
			</Alert>
		</Snackbar> */}
    </div>
  );
};

export default AddUserForm;
