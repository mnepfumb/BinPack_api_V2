import { styled,  Box, Icon, Fab } from '@mui/material';
import { Fragment } from 'react';
import ActiveRequisitionCards from './components/ActiveRequisitionCards';
import SimpleCard from 'app/components/SimpleCard';
import { useNavigate } from 'react-router-dom';

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

const Requisitions = () => {
  const navigate = useNavigate();
  const onClick = () => navigate('/netcare/admin/add-requisitions');

  return (
    <Fragment>
      <ContentBox className="active-requisitions">
        <SimpleCard>
          <CardHeader>
            <Title>Active Requisitions</Title>
            <Fab color="primary" aria-label="Add" className="button" onClick={onClick}>
              <Icon>add</Icon>
            </Fab>
          </CardHeader>
          <ActiveRequisitionCards />
        </SimpleCard>
      </ContentBox>
    </Fragment>
  );
};

export default Requisitions;
