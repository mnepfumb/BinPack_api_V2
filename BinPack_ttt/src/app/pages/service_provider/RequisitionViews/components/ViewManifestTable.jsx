import {
  Box,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';

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

const ViewManifestTable = ({ manifest }) => {

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Waste Type
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Treatment
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Bin Location
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Bin Qty
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Bin Sizes
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Mass (Kg)
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* {productList.map((product, index) => ( */}
              <TableRow  hover>

                <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.wasteType}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.treatment}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.bin_location}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.bin_qty}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.bin_size}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell colSpan={2} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 0 }}>{manifest.waste_mass}</Paragraph>
                  </Box>
                </TableCell>

                {/* <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  ${product.price > 999 ? (product.price / 1000).toFixed(1) + 'k' : product.price}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.available ? (
                    product.available < 20 ? (
                      <Small bgcolor={bgSecondary}>{product.available} available</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>in stock</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>out of stock</Small>
                  )}
                </TableCell> */}

              </TableRow>
            {/*  ))} */}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

export default ViewManifestTable;
