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

const TopSellingTable = () => {

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Waste (kg) Generation </Title>
        {/* <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select> */}
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Waste Category
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Waste Mass(kg/PM)
              </TableCell>
              {/* <TableCell sx={{ px: 0 }} colSpan={2}>
                Stock Status
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action
              </TableCell> */}
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{product.name}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  ${product.price > 999 ? (product.price / 1000).toFixed(1)  : product.price}
                </TableCell>

                {/* <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.available ? (
                    product.available < 20 ? (
                      <Small bgcolor={bgSecondary}>{product.available} available</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>in stock</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>out of stock</Small>
                  )}
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <IconButton>
                    <Icon color="primary">edit</Icon>
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

const productList = [
  {
    imgUrl: '/BinPack/assets/images/products/headphone-2.jpg',
    name: 'Covid Waste',
    price: 100,
    available: 15,
  },
  {
    imgUrl: '/BinPack/assets/images/products/headphone-3.jpg',
    name: 'General Waste',
    price: 1500,
    available: 30,
  },
  {
    imgUrl: '/BinPack/assets/images/products/iphone-2.jpg',
    name: 'Hazardous Waste',
    price: 1900,
    available: 35,
  },
  {
    imgUrl: '/BinPack/assets/images/products/iphone-1.jpg',
    name: 'Metal Waste',
    price: 100,
    available: 0,
  },
  {
    imgUrl: '/BinPack/assets/images/products/headphone-3.jpg',
    name: 'Paper Waste',
    price: 1190,
    available: 5,
  },

  {
    imgUrl: '/BinPack/assets/images/products/headphone-3.jpg',
    name: 'Plastic Waste',
    price: 1500,
    available: 30,
  },
  {
    imgUrl: '/BinPack/assets/images/products/iphone-2.jpg',
    name: 'Refuse Waste',
    price: 1900,
    available: 35,
  },
  {
    imgUrl: '/BinPack/assets/images/products/iphone-1.jpg',
    name: 'Healthcare Risk Waste',
    price: 100,
    available: 0,
  },
  {
    imgUrl: '/BinPack/assets/images/products/headphone-3.jpg',
    name: 'Other',
    price: 1190,
    available: 5,
  },
];

export default TopSellingTable;
