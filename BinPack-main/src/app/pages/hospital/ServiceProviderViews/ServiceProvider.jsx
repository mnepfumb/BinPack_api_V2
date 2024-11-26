import { Grid, styled } from '@mui/material';
import { Fragment } from 'react';
import ServiceProviderTable from './components/ServiceProviderTable';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const ServiceProvider = () => {
    return (
        <Fragment>
            <ContentBox className="admin-analytics">
                <Grid container spacing={3}>
                <ServiceProviderTable />
                </Grid>
            </ContentBox>
        </Fragment>
    );
};

export default ServiceProvider;
