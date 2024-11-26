import { Card, Grid, styled, useTheme } from '@mui/material';
import { Fragment } from 'react';
import SimpleCard from 'app/components/SimpleCard';
import LineChart from 'app/pages/admin/components/SmartBins/LineChart';
import DoughnutChart from 'app/pages/admin/components/SmartBins/Doughnut';
import DoughnutChart2 from 'app/pages/admin/components/SmartBins/Doughnut2';

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

const SmartBinsAnalytics = () => {
	const { palette } = useTheme();
	const theme = useTheme();

	return (
		<Fragment>
			<ContentBox className="smart-bins-analytics">
				<SimpleCard title="Smart-Bins" sx={{ mb: '24px' }}>
					<LineChart
						height="350px"
						color={[theme.palette.primary.main, theme.palette.primary.light]}
					/>
				</SimpleCard>

				<Grid container spacing={3}>
					<Grid item lg={6} md={8} sm={12} xs={12}>
					<SimpleCard  sx={{ mb: '24px' }}>
							<Card sx={{ px: 3, py: 2, mb: 3 }}>
								<Title>Departments</Title>
								<SubTitle>Last 30 days</SubTitle>
								<DoughnutChart
									height="300px"
									color={[palette.primary.dark, palette.primary.main, palette.primary.light, 'gray']}
								/>
							</Card>
						</SimpleCard>
					</Grid>
					<Grid item lg={6} md={8} sm={12} xs={12}>
						<SimpleCard  sx={{ mb: '24px' }}>
							<Card sx={{ px: 3, py: 2, mb: 3 }}>
								<Title>Hospital</Title>
								<SubTitle>Last 30 days</SubTitle>
								<DoughnutChart2
									height="300px"
									color={[palette.primary.dark, palette.primary.main, palette.primary.light, 'gray']}
								/>
							</Card>
						</SimpleCard>
					</Grid>
				</Grid>
			</ContentBox>
		</Fragment>
	);
};

export default SmartBinsAnalytics;
