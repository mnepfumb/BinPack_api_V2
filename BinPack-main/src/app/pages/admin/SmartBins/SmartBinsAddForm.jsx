import { styled } from '@mui/material';
import { Fragment } from 'react';
import { SimpleCard } from "app/components";
import AddSmartBinsForm from "./components/AddSmartBinsForm";

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const SmartBinsAddForm = () => {
    return (
        <Fragment>
            <ContentBox className="hospitals-add-form">
                <SimpleCard title="Add Requisition">
                    <AddSmartBinsForm />
                </SimpleCard>
            </ContentBox>
        </Fragment>
    );
};

export default SmartBinsAddForm;
