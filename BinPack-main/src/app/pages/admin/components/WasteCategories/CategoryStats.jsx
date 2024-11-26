import { Card, Fab, Grid, Icon, lighten, styled, useTheme } from '@mui/material';

const ContentBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}));

// const FabIcon = styled(Fab)(() => ({
//   width: '44px !important',
//   height: '44px !important',
//   boxShadow: 'none !important',
// }));

const H3 = styled('h3')(({ textcolor }) => ({
  margin: 0,
  color: textcolor,
  // fontWeight: '500',
  marginLeft: '12px',
}));

// const H1 = styled('h1')(({ theme, textcolor }) => ({
//   margin: 0,
//   color: textcolor,
//   flexGrow: 1,
//   // color: theme.palette.text.secondary,
// }));

// const Span = styled('span')(({ textcolor }) => ({
//   fontSize: '13px',
//   color: textcolor,
//   marginLeft: '4px',
// }));

// const IconBox = styled('div')(() => ({
//   width: 16,
//   height: 16,
//   color: '#fff',
//   display: 'flex',
//   overflow: 'hidden',
//   borderRadius: '300px ',
//   justifyContent: 'center',
//   '& .icon': { fontSize: '14px' },
// }));

const CategoryStats = () => {
  const { palette } = useTheme();
  const textError = palette.error.main;

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>

        <Card elevation={3} sx={{ p: 2 }}>
          <H3 textcolor={'#08ad6c'}>Covid Waste</H3>
          <ContentBox sx={{ pt: 2 }}>
            <H3 textcolor={'#08ad6c'}>Weekly:</H3>
            <H3>10.8</H3>
          </ContentBox>
          <ContentBox>
            <H3 textcolor={'#08ad6c'}>Monthly:</H3>
            <H3>10.8</H3>
          </ContentBox>
        </Card>
        
      </Grid>
      <Grid item xs={12} md={3}>

        <Card elevation={3} sx={{ p: 2 }}>
          <H3 textcolor={'#08ad6c'}>General Waste</H3>
          <ContentBox sx={{ pt: 2 }}>
            <H3 textcolor={'#08ad6c'}>Weekly:</H3>
            <H3>10.8</H3>
          </ContentBox>
          <ContentBox>
            <H3 textcolor={'#08ad6c'}>Monthly:</H3>
            <H3>10.8</H3>
          </ContentBox>
        </Card>
        
      </Grid>
      <Grid item xs={12} md={3}>

        <Card elevation={3} sx={{ p: 2 }}>
          <H3 textcolor={'#08ad6c'}>Hazardous Waste</H3>
          <ContentBox sx={{ pt: 2 }}>
            <H3 textcolor={'#08ad6c'}>Weekly:</H3>
            <H3>10.8</H3>
          </ContentBox>
          <ContentBox>
            <H3 textcolor={'#08ad6c'}>Monthly:</H3>
            <H3>10.8</H3>
          </ContentBox>
        </Card>
        
      </Grid>

      <Grid item xs={12} md={3}>

        <Card elevation={3} sx={{ p: 2 }}>
          <H3 textcolor={textError}>Metal Waste</H3>
          <ContentBox sx={{ pt: 2 }}>
            <H3 textcolor={'#08ad6c'}>Weekly:</H3>
            <H3>10.8</H3>
          </ContentBox>
          <ContentBox>
            <H3 textcolor={'#08ad6c'}>Monthly:</H3>
            <H3>10.8</H3>
          </ContentBox>
        </Card>
        
      </Grid>

      <Grid item xs={12} md={3}>

        <Card elevation={3} sx={{ p: 2 }}>
          <H3 textcolor={textError}>Paper Waste</H3>
          <ContentBox sx={{ pt: 2 }}>
            <H3 textcolor={'#08ad6c'}>Weekly:</H3>
            <H3>10.8</H3>
          </ContentBox>
          <ContentBox>
            <H3 textcolor={'#08ad6c'}>Monthly:</H3>
            <H3>10.8</H3>
          </ContentBox>
        </Card>
        
      </Grid>

      <Grid item xs={12} md={3}>

        <Card elevation={3} sx={{ p: 2 }}>
          <H3 textcolor={textError}>Plastic Waste</H3>
          <ContentBox sx={{ pt: 2 }}>
            <H3 textcolor={'#08ad6c'}>Weekly:</H3>
            <H3>10.8</H3>
          </ContentBox>
          <ContentBox>
            <H3 textcolor={'#08ad6c'}>Monthly:</H3>
            <H3>10.8</H3>
          </ContentBox>
        </Card>
        
      </Grid>

      <Grid item xs={12} md={3}>

        <Card elevation={3} sx={{ p: 2 }}>
          <H3 textcolor={textError}>Refuse Waste</H3>
          <ContentBox sx={{ pt: 2 }}>
            <H3 textcolor={'#08ad6c'}>Weekly:</H3>
            <H3>10.8</H3>
          </ContentBox>
          <ContentBox>
            <H3 textcolor={'#08ad6c'}>Monthly:</H3>
            <H3>10.8</H3>
          </ContentBox>
        </Card>
        
      </Grid>

      <Grid item xs={12} md={3}>

        <Card elevation={3} sx={{ p: 2 }}>
          <H3 textcolor={textError}>Healthcare Risk </H3>
          <ContentBox sx={{ pt: 2 }}>
            <H3 textcolor={'#08ad6c'}>Weekly:</H3>
            <H3>10.8</H3>
          </ContentBox>
          <ContentBox>
            <H3 textcolor={'#08ad6c'}>Monthly:</H3>
            <H3>10.8</H3>
          </ContentBox>
        </Card>
        
      </Grid>

      <Grid item xs={12} md={3}>

        <Card elevation={3} sx={{ p: 2 }}>
          <H3 textcolor={textError}>Other</H3>
          <ContentBox sx={{ pt: 2 }}>
            <H3 textcolor={'#08ad6c'}>Weekly:</H3>
            <H3>10.8</H3>
          </ContentBox>
          <ContentBox>
            <H3 textcolor={'#08ad6c'}>Monthly:</H3>
            <H3>10.8</H3>
          </ContentBox>
        </Card>
        
      </Grid>
    </Grid>
  );
};

export default CategoryStats;
