import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import DoughnutChart from '../dashboard/shared/Doughnut';
import RowCards from '../dashboard/shared/RowCards';
import StatCards from '../dashboard/shared/StatCards';
import StatCards2 from '../dashboard/shared/StatCards2';
import TopSellingTable from './adminComponents/TopSellingTable';
import SimpleCard from 'app/components/SimpleCard';
import ComparisonChart from 'app/pages/driver/adminComponents/ComparisonChart';
import ComparisonChart2 from 'app/pages/driver/adminComponents/ComparisonChart2';

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

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

// const Container = styled('div')(({ theme }) => ({
//   margin: '30px',
//   [theme.breakpoints.down('sm')]: {
//     margin: '16px',
//   },
//   '& .breadcrumb': {
//     marginBottom: '30px',
//     [theme.breakpoints.down('sm')]: {
//       marginBottom: '16px',
//     },
//   },
// }));

const DriverAnalytics = () => {
  const { palette } = useTheme();
  const theme = useTheme();
  return (
    <Fragment>
      <ContentBox className="admin-analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <SimpleCard title="Waste Status" sx={{ mb: '24px' }}>
              <ComparisonChart
                height="400px"
                color={[theme.palette.primary.dark, theme.palette.primary.light]}
              />
            </SimpleCard>

            <SimpleCard title="Diverted Waste Types">
              <ComparisonChart2
                height="400px"
                color={[theme.palette.primary.dark, theme.palette.primary.light]}
              />
            </SimpleCard>

            <SimpleCard title="ESG Reporting">
              <StatCards />
            </SimpleCard>

            <TopSellingTable />

            <StatCards2 />

            <H4>Ongoing Projects</H4>
            <RowCards />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Traffic Sources</Title>
              <SubTitle>Last 30 days</SubTitle>

              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            {/* <UpgradeCard />
            <Campaigns /> */}
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default DriverAnalytics;
