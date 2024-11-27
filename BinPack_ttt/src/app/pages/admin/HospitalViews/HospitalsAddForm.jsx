import { styled } from '@mui/material';
import { Fragment } from 'react';
import { SimpleCard } from "app/components";
import AddHospitalForm from "./components/AddHospitalForm";

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const HospitalsAddForm = () => {
    return (
        <Fragment>
            <ContentBox className="hospitals-add-form">
                <SimpleCard title="Add Hospital">
                    <AddHospitalForm />
                </SimpleCard>
            </ContentBox>
        </Fragment>
    );
};

export default HospitalsAddForm;
