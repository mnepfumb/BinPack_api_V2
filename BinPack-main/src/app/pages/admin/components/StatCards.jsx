import { Box, Card, Grid, Icon,  styled } from '@mui/material';
import { H2 } from 'app/components/Typography';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const cardList = [
    { name: 'Transportation', amount: '3050 kg of CO2-eq/month',  },
    { name: 'Landfilling', amount: '$8500 kg of CO2-eq/month' },
    { name: 'Composting', amount: '108.5 kg of CO2-eq/month' },
    { name: 'Recycling', amount: '305 kg of CO2-eq/month' },
    { name: 'Inceneration', amount: '8.5 kg of CO2-eq/month' },
    { name: 'Open Burning', amount: '305 kg of CO2-eq/month' },

    // { name: 'Orders to deliver', amount: '305 Orders', icon: 'shopping_cart' },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <H2>{item.name}</H2>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            {/* <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
