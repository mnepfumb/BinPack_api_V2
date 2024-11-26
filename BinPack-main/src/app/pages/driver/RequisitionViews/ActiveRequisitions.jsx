import { styled,  Box, Button } from '@mui/material';
import { Span } from "app/components/Typography";
import { Fragment, useState, useEffect } from 'react';
import axios from 'app/api/axios';
import ActiveRequisitionCards from './components/ActiveRequisitionCards';
import SimpleCard from 'app/components/SimpleCard';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const delay = ms => new Promise(res => setTimeout(res, ms));

const Requisitions = () => {	
  const [locationState, setLocationState] = useState( false );
  const [locationDetails, setLocationDetails] = useState( [] );

  useEffect(() => {

    const LocationData = async () => {
      while (locationState.isActive) {
        // timer
        await delay(5000);
        try {
          navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            const { latitude, longitude } = position.coords
            console.log(latitude);
            console.log(longitude);
          })

        } catch (error) {
          console.log('error: ' + error);
        }
      }
    };

		const fetchLocationData = async () => {
			try {
				const accessToken = window.localStorage.getItem('accessToken');
			// 	//console.log('user.email: ' + user.id);
      var id = '63ea2973ddeb14b5c1bdb0da'
				var url =  '/locationTracking/stream-location?user_id=' + id;
				const response = await axios.get( url , {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				});
				const { status, location } = response.data;
				console.log('status: ' + status);
				console.log('location: ' + location[0].isActive);
			// 	//console.log('requisitions: ' + requisitions);
				if (status === "success") {
					setLocationState(location[0].isActive);
          setLocationDetails(location[0])
				}
			} catch (error) {
				console.log('error: ' + error);
			}
		};
		fetchLocationData();
    LocationData();
	}, [locationState.isActive]);

  const handleActivatation = async (signal) => {
    var state = false;
    console.log('signal: ' + signal);

    if (signal === 1) { state = true }

    try {
      const res = await axios.patch('/locationTracking/' + locationDetails._id, {
        isActive: state,
          headers: { 
              'Content-Type': 'application/json', 
          },
      })
      console.log('res: ' + res);
    } catch (error) {
				console.log('error: ' + error);
    }
  }


  const DeviceTracking = (locationState) => {
    console.log('locationState: '+locationState)
  if (!locationState) {
    return (
      // <>
      <Button style={{ background: '#FF3D57' }} variant="contained" onClick={event => handleActivatation(1)}>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Activate Device Tracking</Span>
      </Button>
      // {/* </> */}
    )
  } else {
    return (
      // <>
     <Button style={{ background: '#08ad6c' }} variant="contained"  onClick={event => handleActivatation(2)}>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>De-Activate Device Tracking</Span>
      </Button>
      // </>
    )
  }
}

  return (
    <Fragment>
      <ContentBox className="active-requisitions">
        <SimpleCard>
          <CardHeader>
            <Title>Active Requisitions</Title>
            <Box ml="-5px" style={{textAlign: 'right'}}>
                {DeviceTracking(locationState)}
            </Box>
          </CardHeader>
          <ActiveRequisitionCards />
        </SimpleCard>
      </ContentBox>
    </Fragment>
  );
};

export default Requisitions;
