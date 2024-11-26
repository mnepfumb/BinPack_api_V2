import { styled } from '@mui/material';
import { Fragment } from 'react';
import { SimpleCard } from "app/components";
import EditServiceProviderForm from "./components/EditServiceProviderForm";

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const ServiceProviderEditForm = () => {
    return (
        <Fragment>
            <ContentBox className="service-provider-edit-form">
                <SimpleCard title="Edit Service Provider Details">
                    <EditServiceProviderForm />
                </SimpleCard>
            </ContentBox>
        </Fragment>
    );
};

export default ServiceProviderEditForm;
