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
const accessToken = window.localStorage.getItem('accessToken');

const AddUserForm = () => {
  const [formState, setFormState] = useState({ date: new Date() });
  const [open, setOpen] = useState(false);
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [companiesOptions, setCompaniesOptions] = useState([]);
  const [hospitalDropdownValue, setHospitalDropdownValue] = useState(null);
  const [companiesDropdownValue, setCompaniesDropdownValue] = useState(null);
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
      },
      });
      const response2 = await axios.get('/company', {
        headers: { 
          'Content-Type': 'application/json', 
      },
      });

      const { hospitals } = response.data;
      const { companies } = response2.data;

      //console.log(hospitals);

      if (active) {
        //console.log(hospitals);
        setHospitalOptions(hospitals);
        setCompaniesOptions(companies);
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
    
    var companyname = ''
    var company_Id = ''

    if (hospitalDropdownValue !== null) {
      companyname = hospitalDropdownValue.name
      company_Id = hospitalDropdownValue.hospital_id
    } else if (companiesDropdownValue !== null) {
      companyname = companiesDropdownValue.name
      company_Id = companiesDropdownValue.company_id
    }
    
    //console.log('companyname: ' + companyname);
    //console.log('company_Id: ' + company_Id);
    //console.log(event.target.userstatus.value);
    try {
      //console.log('accessToken: ' + accessToken);
      const response = await axios.post('/users', {
        name: event.target.username.value,
        surname: event.target.surname.value,
        role: event.target.role.value,
        password: event.target.password.value,
        company: companyname,
        company_id: company_Id,
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
        navigate('/netcare/admin/user');
      }
    } catch (error) {
      //console.log('error: ' + error);
    }
  };

  const ChooseCompany = (role) => {
    if (role === 'hospital' ) {
      return <AutoComplete
        open={open}
        options={hospitalOptions}
        loading={loading}
        onChange={handleHospitalDropdownChange}
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
      />;
    } else if (role === 'service provider' || role === 'driver') {
      return <AutoComplete
        open={open}
        options={companiesOptions}
        loading={loading}
        onChange={handleCompaniesDropdownChange}
        id="company"
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="outlined"
            label="Choose Service Provider"
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
      />;
    } 

  };

  const handleHospitalDropdownChange = (_, newValue) => {
    //console.log('newValue');
    //console.log(newValue);
    setHospitalDropdownValue(newValue);
  };

  const handleCompaniesDropdownChange = (_, newValue) => {
    //console.log('newValue');
    //console.log(newValue);
    setCompaniesDropdownValue(newValue);
  };

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
                    value="admin"
                    control={<Radio />}
                    label="Admin User"
                  />
                  <FormControlLabel
                    value="hospital"
                    control={<Radio />}
                    label="Hospital User"
                  />
                  <FormControlLabel
                    value="service provider"
                    control={<Radio />}
                    label="Service Provider User"
                  />
                  <FormControlLabel
                    value="driver"
                    control={<Radio />}
                    label="Driver"
                  />
                </RadioGroup>

              </FormControl>
              <Grid>
              { ChooseCompany(role) }
              </Grid>
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
