import { styled } from '@mui/material';
import { Fragment } from 'react';
import { SimpleCard } from "app/components";
import AddRequisitionForm from "./components/AddRequisitionForm";

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const RequisitionAddForm = () => {
    return (
        <Fragment>
            <ContentBox className="hospitals-add-form">
                <SimpleCard title="Add Requisition">
                    <AddRequisitionForm />
                </SimpleCard>
            </ContentBox>
        </Fragment>
    );
};

export default RequisitionAddForm;
