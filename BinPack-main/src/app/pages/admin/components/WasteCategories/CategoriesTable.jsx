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
} from '@mui/material';

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

const CategoriesTable = ({ tableDataset }) => {
  // const { palette } = useTheme();

  console.log(tableDataset)
  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 0}} colSpan={0}>
                
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={3}>
                Waste Category
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Weekly
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Monthly
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            
            {tableDataset.map((data, index) => (
              
              <TableRow key={index} hover>
              <TableCell colSpan={0} align="center" sx={{ px: 0, textTransform: 'capitalize' }}>
                <Icon className="icon" style={{ color: `${data[0].color}` }}>brightness_1</Icon>
              </TableCell>
                <TableCell colSpan={3} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  {data[0].category}
                </TableCell>
                <TableCell align="center" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {data[0].wastePerWeek}
                </TableCell> 
                <TableCell align="center" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {data[0].wastePerMonth}
                </TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

export default CategoriesTable;
