import { styled } from '@mui/system';
import { MatxVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { admin_navigations } from 'app/pages/admin/navigations';
import { driver_navigations } from 'app/pages/driver/navigations';
import { hospital_navigations } from 'app/pages/hospital/navigations';
import { service_provider_navigations } from 'app/pages/service_provider/navigations';
import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import useAuth from 'app/hooks/useAuth';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  let { user } = useAuth();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  const Navigations = (user) => {
    
    if (user.role === 'admin') {
      return <MatxVerticalNav items={admin_navigations} />;
    } else if (user.role === 'hospital') {
      return <MatxVerticalNav items={hospital_navigations} />;
    } else if (user.role === 'service provider') {
      return <MatxVerticalNav items={service_provider_navigations} />;
    } else if (user.role === 'driver') {
      return <MatxVerticalNav items={driver_navigations} />;
    }
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        {Navigations(user)}
        
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
