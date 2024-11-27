import { styled } from '@mui/material';
import { Fragment } from 'react';

import StatCards from 'app/pages/admin/components/StatCards';
import SimpleCard from 'app/components/SimpleCard';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const ESGReportingAnalytics = () => {

	return (
		<Fragment>
			<ContentBox className="admin-analytics">
				<SimpleCard title="ESG Reporting">
					<StatCards />
				</SimpleCard>
			</ContentBox>
		</Fragment>
	);
};

export default ESGReportingAnalytics;
