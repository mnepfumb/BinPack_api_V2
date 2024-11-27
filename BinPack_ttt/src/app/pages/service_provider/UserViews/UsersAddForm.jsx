import { styled } from '@mui/material';
import { Fragment } from 'react';
import { SimpleCard } from 'app/components';
import AddHospitalForm from './components/AddUserForm';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const HospitalsAddForm = () => {
  return (
    <Fragment>
      <ContentBox className="hospitals-add-user-form">
        <SimpleCard title="Add User">
          <AddHospitalForm />
        </SimpleCard>
      </ContentBox>
    </Fragment>
  );
};

export default HospitalsAddForm;
