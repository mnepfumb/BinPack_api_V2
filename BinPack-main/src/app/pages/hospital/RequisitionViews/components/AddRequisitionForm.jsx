import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Grid,
  Icon,
  styled,
  Autocomplete,
  CircularProgress,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState, Fragment } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from 'app/api/axios';
import { useNavigate } from 'react-router-dom';
import SimpleCard from 'app/components/SimpleCard';
import FormLabel from '@mui/material/FormLabel';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const AutoComplete = styled(Autocomplete)(() => ({}));

const accessToken = window.localStorage.getItem('accessToken');

const AddRequisitionForm = () => {
  const [state, setState] = useState({ date: new Date() });
  // const [formState, setFormState] = useState({ date: new Date() });
  const [openHospital, setOpenHospital] = useState(false);
  const [openCompanies, setOpenCompanies] = useState(false);
  const [hospitalOptions, setHospitalOptions] = useState([]);
  const [companiesOptions, setCompaniesOptions] = useState([]);
  const [hospitalDropdownValue, setHospitalDropdownValue] = useState(null);
  const [companiesDropdownValue, setCompaniesDropdownValue] = useState(null);
  const [wasteType, setWasteType] = useState(null);
  const [getDate, setDate] = useState();
  const hospital_loading = openHospital && hospitalOptions.length === 0;
  const companies_loading = openCompanies && companiesOptions.length === 0;
  const navigate = useNavigate();

  
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

  const handleWasteType = (_, newValue) => {
    if (newValue && newValue.inputValue) {
      setWasteType({ label: newValue.inputValue });
      return;
  }
    setWasteType(newValue);
  };

  useEffect(() => {
    let active = true;
    if (!companies_loading) {
      return undefined;
    }

    (async () => {
      const response2 = await axios.get('/company', {
        headers: { 
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${accessToken}` 
				},
      }); 
      const { companies } = response2.data;
      if (active) {
        setCompaniesOptions(companies);
      }

    })();
  return () => {
    active = false;
  };
}, [companies_loading, hospitalOptions]);

  useEffect(() => {
    let active = true;
    if (!hospital_loading) {
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
      if (active) {
        setHospitalOptions(hospitals);
      }
    })();
    return () => {
      active = false;
    };
  }, [hospital_loading, hospitalOptions]);

  const handleSubmit = async (event) => {
    //console.log('companiesDropdownValue.name: ' + companiesDropdownValue.name);
    //console.log('companiesDropdownValue.company_id: ' + companiesDropdownValue.company_id);
    //console.log('event.target.collection_address.value: ' + event.target.collection_address.value);
    //console.log('hospitalDropdownValue.name: ' + hospitalDropdownValue.name);
    //console.log('hospitalDropdownValue.hospital_id: ' + hospitalDropdownValue.hospital_id);
    //console.log('event.target.details.value: ' + event.target.details.value);
    //console.log('wasteType: ' + wasteType.label);
    //console.log('event.target.waste_category.value: ' + event.target.waste_category.value);
    //console.log('event.target.date.value: ' + getDate);
    //console.log('event.target.expected_qty.value: ' + event.target.expected_qty.value);
    //console.log('event.target.bin_location.value: ' + event.target.bin_location.value);
    try {
      //console.log('accessToken: ' + accessToken);
      const response = await axios.post('/requisition', {
        serviceProviderName: companiesDropdownValue.name,
        serviceProviderId: companiesDropdownValue.company_id,
        collection_address: event.target.collection_address.value,
        hospitalName: hospitalDropdownValue.name,
        hospitalId: hospitalDropdownValue.hospital_id,
        details: event.target.details.value,
        wasteType: wasteType.label,
        wasteCategory: event.target.waste_category.value,
        collection_Date: getDate,
        driver_id: '',
        user_id: '',
        expected_qty: event.target.expected_qty.value,
        bin_location: event.target.bin_location.value,
        assignRequisitions: true,
        rejectRequisitions: false,
        acceptRequisitions: false,
        createManifest: false,
        percentage: 0,
        status: 'Awaiting Acceptance',
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
        navigate(-1);
      }
    } catch (error) {
      //console.log('error: ' + error);
    }
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const hanndleWasteType = (wasteCategory) => {
    var waste_options;
    //console.log('waste_options: ' + waste_options);
    //console.log('wasteCategory: ' + wasteCategory);
    if (wasteCategory === 'Covid Waste') {
      waste_options = covid_waste
    } else if (wasteCategory === 'General Waste') {
      waste_options = general_waste
    } else if (wasteCategory === 'Hazardous Waste') {
      waste_options = hazardous_waste
    } else if (wasteCategory === 'Metal Waste') {
      waste_options = metal_waste
    } else if (wasteCategory === 'Paper Waste') {
      waste_options = paper_waste
    } else if (wasteCategory === 'Plastic Waste') {
      waste_options = plastic_waste
    } else if (wasteCategory === 'Refuse Waste') {
      waste_options = refuse_waste
    } else if (wasteCategory === 'Healthcare Risk Waste') {
      waste_options = healthcare_risk_waste
    } else if (wasteCategory === 'Other') {
      waste_options = other_waste
    }
    //console.log('waste_options: ' + waste_options);
    if (wasteCategory !== undefined) {
      return (
        <AutoComplete
            value={wasteType}
            options={waste_options}
            onChange={handleWasteType}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
            <TextField {...params} label="Waste Type" variant="outlined"  />
            )}
        />
      );
    }
    
  }

  const handleDateChange = (date) => {
    setState({ ...state, date })
    setDate(date);
  };

  const {
    collection_address,
    expected_qty,
    date,
    bin_location,
    details,
    waste_category
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <AutoComplete
              open={openHospital}
              options={hospitalOptions}
              loading={hospital_loading}
              onChange={handleHospitalDropdownChange}
              id="Hospital"
              onOpen={() => setOpenHospital(true)}
              onClose={() => setOpenHospital(false)}
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
                        {hospital_loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                /> 
              )}
            />

            <AutoComplete
                open={openCompanies}
                options={companiesOptions}
                loading={companies_loading}
                onChange={handleCompaniesDropdownChange}
                id="company"
                onOpen={() => setOpenCompanies(true)}
                onClose={() => setOpenCompanies(false)}
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
                          {companies_loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      ),
                    }}
                />
                )}
              />


            {/* {hanndleWasteType(wasteCategory)} */}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date}
                onChange={handleDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Collection Date"
                    id="collection_date"
                    sx={{ mb: 2, width: "100%" }}
                  />
                )}
              />
            </LocalizationProvider>

            <TextField
              type="text"
              name="collection_address"
              value={collection_address || ""}
              label="Collection Address"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              name="bin_location"
              type="text"
              label="Bin Location"
              value={bin_location || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              name="expected_qty"
              type="number"
              label="Expected Qty (in kg's)"
              value={expected_qty || ""}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextField
              name="details"
              type="text"
              label="Details"
              value={details || ""}
              onChange={handleChange}
              // validators={["required"]}
              // errorMessages={["this field is required"]}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

          <SimpleCard>
              <FormControl component="fieldset" className="formControl">
                <FormLabel component="legend">Waste Category</FormLabel>
                <RadioGroup
                  value={waste_category}
                  name="waste_category"
                  className="Waste Category"
                  aria-label="Waste Category"
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Covid Waste"
                    control={<Radio />}
                    label="Covid Waste"
                  />
                  <FormControlLabel
                    value="General Waste"
                    control={<Radio />}
                    label="General Waste"
                  />
                  <FormControlLabel
                    value="Hazardous Waste"
                    control={<Radio />}
                    label="Hazardous Waste"
                  />
                  <FormControlLabel
                    value="Metal Waste"
                    control={<Radio />}
                    label="Metal Waste"
                  />
                  <FormControlLabel
                    value="Paper Waste"
                    control={<Radio />}
                    label="Paper Waste"
                  />
                  <FormControlLabel
                    value="Plastic Waste"
                    control={<Radio />}
                    label="Plastic Waste"
                  />
                  <FormControlLabel
                    value="Refuse Waste"
                    control={<Radio />}
                    label="Refuse Waste"
                  />
                  <FormControlLabel
                    value="Healthcare Risk Waste"
                    control={<Radio />}
                    label="Healthcare Risk Waste"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>

              </FormControl>
              <Grid>
              { hanndleWasteType(waste_category) }
              </Grid>
            </SimpleCard>
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

// const waste_category = [
//     { label: 'Covid Waste' },
//     { label: 'General Waste' },
//     { label: 'Hazardous Waste' },
//     { label: 'Metal Waste' },
//     { label: 'Paper Waste' },
//     { label: 'Plastic Waste' },
//     { label: 'Refuse Waste' },
//     { label: 'Healthcare Risk Waste' },
//     { label: 'Other' },
// ];

const covid_waste = [
  { label: 'Infectious Waste – Autoclave' },
];
const general_waste = [
  { label: 'General Landfill SA' },
];
const hazardous_waste = [
  { label: 'Fluorescent Tubes' },
];
const metal_waste = [
  { label: 'Aluminium cans and foil' },
  { label: 'Mixed Cans' },
  { label: 'Steel Cans' },
];
const paper_waste = [
  { label: 'Board' },
  { label: 'Mixed' },
  { label: 'Paper' },
];
const plastic_waste = [
  { label: 'HDPE' },
  { label: 'LDPE and LLDPE' },
  { label: 'PET' },
  { label: 'PP' },
  { label: 'PVC' },
];
const refuse_waste = [
  { label: 'Domestic Waste – Recycle' },
];
const healthcare_risk_waste = [
  { label: 'Anatomical Waste – Incineration' },
  { label: 'Cytotoxic Waste – Incineration' },
  { label: 'Pharmaceutical Waste – Incineration' },
  { label: 'Sharps - Autoclave' },
];
const other_waste = [
  { label: 'Glass' },
];

export default AddRequisitionForm;
