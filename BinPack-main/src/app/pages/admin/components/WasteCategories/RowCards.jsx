import {
  Avatar,
  Box,
  Card,
  Fab,
  Grid,
  Hidden,
  Icon,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import { Span } from 'app/components/Typography';
import { format } from 'date-fns';
import { Fragment } from 'react';

const ProjectName = styled(Span)(({ theme }) => ({
  marginLeft: 24,
  fontWeight: '500',
  [theme.breakpoints.down('sm')]: { marginLeft: 4 },
}));

const StarOutline = styled(Fab)((color) => ({
  marginLeft: 0,
  boxShadow: 'none',
  background: '#08ad6c !important',
  backgroundColor: `${color} !important`,
}));

// const DateRange = styled(Fab)(({ theme }) => ({
//   marginLeft: 0,
//   boxShadow: 'none',
//   color: 'white !important',
//   background: `${theme.palette.error.main} !important`,
// }));

const StyledAvatar = styled(Avatar)(() => ({
  width: '32px !important',
  height: '32px !important',
}));

const RowCards = () => {
  const { palette } = useTheme();
  const textMuted = palette.text.secondary;

  return List.map((item) => (
    <Fragment key={item}>
      <Card sx={{ py: 1, px: 2 }} className="project-card">
        <Grid container alignItems="center">
          <Grid item md={5} xs={7}>
            <Box display="flex" alignItems="center">
              {/* <Checkbox /> */}
                <StarOutline color={item.color} />
              <ProjectName>Project {item.name}</ProjectName>
            </Box>
          </Grid>

          <Grid item md={3} xs={4}>
            <Box color={textMuted}>{format(new Date().getTime(), 'MM/dd/yyyy hh:mma')}</Box>
          </Grid>

          <Hidden smDown>
            <Grid item xs={3}>
              <Box display="flex" position="relative" marginLeft="-0.875rem !important">
                <StyledAvatar src="/BinPack/assets/images/face-4.jpg" />
                <StyledAvatar src="/BinPack/assets/images/face-4.jpg" />
                <StyledAvatar src="/BinPack/assets/images/face-4.jpg" />
                <StyledAvatar sx={{ fontSize: '14px' }}>+3</StyledAvatar>
              </Box>
            </Grid>
          </Hidden>

          <Grid item xs={1}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton>
                <Icon>more_vert</Icon>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Card>
      <Box py={1} />
    </Fragment>
  ));
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
];

export default RowCards;
