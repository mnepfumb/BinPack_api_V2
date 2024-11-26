import { Grid, styled } from '@mui/material';
import { Fragment } from 'react';
import HospitalTable from './components/HospitalTable';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Hospital = () => {
  return (
    <Fragment>
      <ContentBox className="admin-analytics">
        <Grid container spacing={3}>
          <HospitalTable />
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Hospital;
