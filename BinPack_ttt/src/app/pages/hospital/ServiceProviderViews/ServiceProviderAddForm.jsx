import { styled } from '@mui/material';
import { Fragment } from 'react';
import { SimpleCard } from "app/components";
import AddHospitalForm from "./components/AddServiceProviderForm";

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const ServiceProviderAddForm = () => {
    return (
        <Fragment>
            <ContentBox className="service-provider-add-form">
                <SimpleCard title="Add Service Provider">
                    <AddHospitalForm />
                </SimpleCard>
            </ContentBox>
        </Fragment>
    );
};

export default ServiceProviderAddForm;
