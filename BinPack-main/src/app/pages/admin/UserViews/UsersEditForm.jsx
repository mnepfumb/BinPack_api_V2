import { styled } from '@mui/material';
import { Fragment } from 'react';
import { SimpleCard } from 'app/components';
import EditHospitalForm from './components/EditUserForm';

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const HospitalsEditForm = () => {
  return (
    <Fragment>
      <ContentBox className="hospital-edit-user-form">
        <SimpleCard title="Edit User Details">
          <EditHospitalForm />
        </SimpleCard>
      </ContentBox>
    </Fragment>
  );
};

export default HospitalsEditForm;
