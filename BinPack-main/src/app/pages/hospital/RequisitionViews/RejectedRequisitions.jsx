import { styled,  Box} from '@mui/material';
import { Fragment } from 'react';
import RejectedRequisitionsCards from './components/Rejected_Requisitions/RejectedRequisitionsCards';
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

const RejectedRequisitions = () => {

  return (
    <Fragment>
      <ContentBox className="active-requisitions">
        <SimpleCard>
          <CardHeader>
            <Title>Rejected Requisitions</Title>
          </CardHeader>
          <RejectedRequisitionsCards />
        </SimpleCard>
      </ContentBox>
    </Fragment>
  );
};

export default RejectedRequisitions;
