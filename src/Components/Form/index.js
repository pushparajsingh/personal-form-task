import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getLocation } from '../../Service/location.service';
import Textarea from '@mui/joy/Textarea';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { isValidDateValue } from '../../Utils/formIntialData';
import {
  InitialFormData,
  InitialFormError,
  notify,
} from '../../Utils/formIntialData';
import dayjs from 'dayjs';

const Index = () => {
  const [error, setError] = useState(InitialFormError);
  const [formData, setFormData] = useState(InitialFormData);
  const [addressToggle, setAddressToggle] = useState(
    'complete address'
  );

  const handleInputChange = (name, value) => {
    setFormData((x) => {
      return { ...x, [name]: value };
    });
  };

  useEffect(() => {
    if (formData.pinCode != '' && formData.pinCode != undefined) {
      let clearTime = setTimeout(() => {
        getLocationInfo();
      }, 2000);
      return () => {
        clearTimeout(clearTime);
      };
    }
  }, [formData.pinCode]);

  const getLocationInfo = () => {
    getLocation(formData.pinCode).then((result) => {
      let data = { ...formData, state: '', city: '', country: '' };
      if (typeof result == 'object') {
        Object.entries(result).forEach((item) => {
          data = { ...data, [item[0]]: item[1] };
        });
        setFormData(data);
        setError({ ...error, pinCode: '' });
      } else {
        setFormData(data);
        setError({ ...error, pinCode: result });
      }
    });
  };

  const handleResetForm = () => {
    setFormData(InitialFormData);
    setError(InitialFormError);
    setAddressToggle('complete address');
  };

  const submitForm = () => {
    if (isValidDateValue(formData, setError)) {
      const storeCollection =
        JSON.parse(localStorage.getItem('pformData')) || [];
      const formCollect = [...storeCollection, formData];
      localStorage.setItem('pformData', JSON.stringify(formCollect));
      notify('Form Saved Successfully...');
      handleResetForm();
    }
  };

  const handleAddress = (e) => {
    let toggle = e.target.value;
    setAddressToggle(toggle);
  };

  useEffect(() => {
    if (addressToggle != undefined) {
      if (addressToggle == 'complete address') {
        setFormData((x) => {
          return { ...x, address: '' };
        });
      } else {
        setFormData((x) => {
          return { ...x, address: 'Indore, (M.P)' };
        });
      }
    }
  }, [addressToggle]);

  console.log('error', error);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Box sx={{ width: '100%' }}>
          <h1 className="form-header">Personal Details</h1>
          <hr />
          <Grid
            container
            maxWidth="md"
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">Relationship*</FormLabel>
              <Select
                placeholder="Select a Relationship…"
                className="form-selector"
                value={formData.relationShip}
                onChange={(e) => {
                  handleInputChange(
                    'relationShip',
                    e?.target.innerText
                  );
                }}
                indicator={<KeyboardArrowDown />}
                sx={{
                  width: 240,
                  [`& .${selectClasses.indicator}`]: {
                    transition: '0.2s',
                    [`&.${selectClasses.expanded}`]: {
                      transform: 'rotate(-180deg)',
                    },
                  },
                }}
              >
                <Option value="Spouse">Spouse</Option>
                <Option value="Friend">Friend</Option>
                <Option value="Family">Family</Option>
                <Option value="Colleague">Colleague</Option>
              </Select>

              {error.relationShip != '' && (
                <p className="errorMsg relationShip-error">
                  {error.relationShip}
                </p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">Nominee Name*</FormLabel>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={formData.nomineesName}
                helperText={
                  <p className="errorMsg">{error.nomineesName}</p>
                }
                onChange={(e) => {
                  handleInputChange('nomineesName', e?.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">Date of Birth*</FormLabel>
              <DatePicker
                className="fullWidth-datePicker"
                fullWidth
                value={dayjs(formData.DOB)}
                onChange={(e) => {
                  handleInputChange('DOB', e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl>
                <FormLabel component="legend">Address*</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={addressToggle}
                  onClick={handleAddress}
                >
                  <FormControlLabel
                    value={'complete address'}
                    control={<Radio />}
                    label="Field to enter complete address"
                  />
                  <FormControlLabel
                    value={'my address'}
                    control={<Radio />}
                    label="same as my address"
                  />
                </RadioGroup>
              </FormControl>
              <Textarea
                minRows={3}
                value={formData.address}
                onChange={(e) => {
                  handleInputChange('address', e?.target.value);
                }}
              />
              {error.address != '' && (
                <p className="errorMsg address-error">
                  {error.address}
                </p>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">Pincode*</FormLabel>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                value={formData.pinCode}
                helperText={
                  <p className="errorMsg">{error.pinCode}</p>
                }
                onChange={(e) => {
                  handleInputChange('pinCode', e?.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">City*</FormLabel>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                disabled
                value={formData.city}
                onChange={(e) => {
                  handleInputChange('city', e?.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">State*</FormLabel>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                disabled
                value={formData.state}
                onChange={(e) => {
                  handleInputChange('state', e?.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel component="legend">Country*</FormLabel>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                disabled
                value={formData.country}
                onChange={(e) => {
                  handleInputChange('country', e?.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                className="save-details"
                onClick={submitForm}
              >
                Save Details
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </LocalizationProvider>
  );
};

export default Index;
