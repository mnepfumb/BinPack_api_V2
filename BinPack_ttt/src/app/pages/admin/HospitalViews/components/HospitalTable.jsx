import {
  Box,
  Card,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Fab,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import SimpleCard from 'app/components/SimpleCard';
import { useEffect, useState } from 'react';
import axios from 'app/api/axios';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const HospitalTable = () => {
  const [hospitals, setHospitals] = useState([]);

  const navigate = useNavigate();

  const fetchHospitalData = async () => {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      //console.log('accessToken: ' + accessToken);
      const response = await axios.get('/hospital', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        // withCredentials: true
      });
      const { status, hospitals } = response.data;
      //console.log('hospitals: ' + hospitals);
      if (status === "success") {
        setHospitals(hospitals);
      }
    } catch (error) {
      //console.log('error: ' + error);
    }
  };

  useEffect(() => {
    fetchHospitalData();
  }, []);

  const onClick = () => navigate('/netcare/admin/hospitals-add-form');

  //   const onClickEdit = () => navigate('/netcare/admin/hospitals-edit-form');
  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <SimpleCard>
        <CardHeader>
          <Title>Hospital List</Title>
          <Fab color="primary" aria-label="Add" className="button" onClick={onClick}>
            <Icon>add</Icon>
          </Fab>
        </CardHeader>

        <Box overflow="auto">
          <ProductTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ px: 4 }} colSpan={4}>
                  Name
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={4}>
                  Phone Number
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={4}>
                  Email
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={4}>
                  Address
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={4}>
                  Registration #
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={4}>
                  Tax #
                </TableCell>
                <TableCell sx={{ px: 0 }} colSpan={4}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {hospitals.map((hospital, index) => (
                <TableRow key={index} hover>
                  <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                    {hospital.name}
                  </TableCell>

                  <TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
                    {hospital.phone}
                  </TableCell>

                  <TableCell sx={{ px: 0 }} align="left" colSpan={4}>
                    {hospital.email}
                  </TableCell>

                  <TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
                    {hospital.address}
                  </TableCell>

                  <TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
                    {hospital.registration_no}
                  </TableCell>

                  <TableCell align="left" colSpan={4} sx={{ px: 0, textTransform: 'capitalize' }}>
                    {hospital.tax_no}
                  </TableCell>

                  <TableCell sx={{ px: 0 }} colSpan={4}>
                    <IconButton
                    // onClick={() => navigate('/netcare/admin/hospitals-edit-form/'+hospital,{ state: { name: hospital.name }})}
                    >
                      <Icon
                        color="primary"
                        state={{
                          hospital,
                        }}
                        component={Link}
                        to={{
                          pathname: '/netcare/admin/hospitals-edit-form',
                          state: hospital,
                        }}
                      >
                        edit
                      </Icon>
                    </IconButton>
                    {/* <IconButton>
                      <DeactivateHospitalDialog />
                    </IconButton> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ProductTable>
        </Box>
      </SimpleCard>
    </Card>
  );
};

export default HospitalTable;
