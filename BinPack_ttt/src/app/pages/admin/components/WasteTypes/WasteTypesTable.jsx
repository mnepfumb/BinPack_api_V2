import {
  Box,
  Card,
  Icon,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { useState } from "react";

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

const WasteTypesTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 0}} colSpan={0}>
                
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={3}>
                Waste Types
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Weekly(kg/W)
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Monthly(kg/M)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {List
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product, index) => (
              <TableRow key={index} hover>
              <TableCell colSpan={0} align="center" sx={{ px: 0, textTransform: 'capitalize' }}>
                <Icon className="icon" style={{ color: `${product.color}` }}>brightness_1</Icon>
              </TableCell>
                <TableCell colSpan={3} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  {product.name}
                </TableCell>
                <TableCell align="center" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {product.weekly}
                </TableCell> 
                <TableCell align="center" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {product.monthly}
                </TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={List.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>
    </Card>
  );
};

const Purple = '#800080';
const Fuchsia = '#FF00FF';
const Navy = '#000080';
const Blue = '#0000FF';
const Teal = '#008080';
const Aqua = '#00FFFF';
const Green = '#008000';
const Olive = '#808000';
const Silver = '#C0C0C0';
const List = [
  {
    name: 'Covid Waste',
    weekly: 100,
    monthly: 15,
    color: Silver,
  },
  {
    name: 'General Waste',
    weekly: 100,
    monthly: 15,
    color: Olive,
  },
  {
    name: 'Hazardous Waste',
    weekly: 100,
    monthly: 15,
    color: Green,
  },
  {
    name: 'Metal Waste',
    weekly: 100,
    monthly: 15,
    color: Aqua,
  },
  {
    name: 'Paper Waste',
    weekly: 100,
    monthly: 15,
    color: Teal,
  },

  {
    name: 'Plastic Waste',
    weekly: 100,
    monthly: 15,
    color: Navy,
  },
  {
    name: 'Refuse Waste',
    weekly: 100,
    monthly: 15,
    color: Fuchsia,
  },
  {
    name: 'Healthcare Risk Waste',
    weekly: 100,
    monthly: 15,
    color: Blue,
  },
  {
    name: 'Other',
    weekly: 100,
    monthly: 15,
    color: Purple,
  },
  {
    name: 'Covid Waste',
    weekly: 100,
    monthly: 15,
    color: Silver,
  },
  {
    name: 'General Waste',
    weekly: 100,
    monthly: 15,
    color: Olive,
  },
  {
    name: 'Hazardous Waste',
    weekly: 100,
    monthly: 15,
    color: Green,
  },
  {
    name: 'Metal Waste',
    weekly: 100,
    monthly: 15,
    color: Aqua,
  },
  {
    name: 'Paper Waste',
    weekly: 100,
    monthly: 15,
    color: Teal,
  },

  {
    name: 'Plastic Waste',
    weekly: 100,
    monthly: 15,
    color: Navy,
  },
  {
    name: 'Refuse Waste',
    weekly: 100,
    monthly: 15,
    color: Fuchsia,
  },
  {
    name: 'Healthcare Risk Waste',
    weekly: 100,
    monthly: 15,
    color: Blue,
  },
  {
    name: 'Other',
    weekly: 100,
    monthly: 15,
    color: Purple,
  },
  {
    name: 'Healthcare Risk Waste',
    weekly: 100,
    monthly: 15,
    color: Blue,
  },
  {
    name: 'Other',
    weekly: 100,
    monthly: 15,
    color: Purple,
  },
];

export default WasteTypesTable;
