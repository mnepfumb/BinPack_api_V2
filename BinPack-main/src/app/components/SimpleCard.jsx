import { Card } from '@mui/material';
import { Box, styled } from '@mui/system';
import { convertHexToRGB } from 'app/utils/utils';

const CardRoot = styled(Card)(({ theme }) => ({
  // height: '100%',
  padding: '20px 24px',
  background: `rgb(${convertHexToRGB(theme.palette.primary.main)}, 0.15) !important`,
}));

const CardTitle = styled('div')(({ subtitle }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
  marginBottom: !subtitle && '16px',
}));

const SimpleCard = ({ children, title, subtitle, icon }) => {
  return (
    <CardRoot elevation={16} sx={{ mb: '24px' }}>
      <CardTitle subtitle={subtitle}>{title}</CardTitle>
      {subtitle && <Box sx={{ mb: 2 }}>{subtitle}</Box>}
      {children}
    </CardRoot>
  );
};

export default SimpleCard;
