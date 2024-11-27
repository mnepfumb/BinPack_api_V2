import { styled,  Box } from '@mui/material';
import { Fragment } from 'react';
import CompletedRequisitionsCards from './components/Completed_Requisitions/CompletedRequisitionsCards';
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

const CompletedRequisitions = () => {

  return (
    <Fragment>
      <ContentBox className="active-requisitions">
        <SimpleCard>
          <CardHeader>
            <Title>Completed Requisitions</Title>
          </CardHeader>
          <CompletedRequisitionsCards />
        </SimpleCard>
      </ContentBox>
    </Fragment>
  );
};

export default CompletedRequisitions;
