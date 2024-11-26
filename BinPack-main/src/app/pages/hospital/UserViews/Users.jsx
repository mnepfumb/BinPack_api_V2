import { Grid, styled } from '@mui/material';
import { Fragment } from 'react';
import HospitalTable from './components/UserTable';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Hospital = () => {
  return (
    <Fragment>
      <ContentBox className="user">
        <Grid container spacing={3}>
          <HospitalTable />
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Hospital;
