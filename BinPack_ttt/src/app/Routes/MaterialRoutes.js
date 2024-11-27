/* eslint-disable react/jsx-pascal-case */
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from 'app/auth/authRoles';

const AppTable = Loadable(lazy(() => import('../pages/material-kit/tables/AppTable')));
const AppForm = Loadable(lazy(() => import('../pages/material-kit/forms/AppForm')));
const AppButton = Loadable(lazy(() => import('../pages/material-kit/buttons/AppButton')));
const AppIcon = Loadable(lazy(() => import('../pages/material-kit/icons/AppIcon')));
const AppProgress = Loadable(lazy(() => import('../pages/material-kit/AppProgress')));
const AppMenu = Loadable(lazy(() => import('../pages/material-kit/menu/AppMenu')));
const AppCheckbox = Loadable(lazy(() => import('../pages/material-kit/checkbox/AppCheckbox')));
const AppSwitch = Loadable(lazy(() => import('../pages/material-kit/switch/AppSwitch')));
const AppRadio = Loadable(lazy(() => import('../pages/material-kit/radio/AppRadio')));
const AppSlider = Loadable(lazy(() => import('../pages/material-kit/slider/AppSlider')));
const AppDialog = Loadable(lazy(() => import('../pages/material-kit/dialog/AppDialog')));
const AppSnackbar = Loadable(lazy(() => import('../pages/material-kit/snackbar/AppSnackbar')));
const AppAutoComplete = Loadable(lazy(() => import('../pages/material-kit/auto-complete/AppAutoComplete')));
const AppExpansionPanel = Loadable(lazy(() => import('../pages/material-kit/expansion-panel/AppExpansionPanel')));

//11111111111111

const WasteTypesAnalytics = Loadable(lazy(() => import('../pages/admin/WasteTypesAnalytics')));
const SmartBinsAnalytics = Loadable(lazy(() => import('../pages/admin/SmartBinsAnalytics')));
const TrackingAnalytics = Loadable(lazy(() => import('../pages/admin/TrackingAnalytics')));
const ESGReportingAnalytics = Loadable(lazy(() => import('../pages/admin/ESGReportingAnalytics')));

const Requisitions = Loadable(lazy(() => import('../pages/admin/RequisitionViews/ActiveRequisitions')));
const RequisitionAddForm = Loadable(lazy(() => import('../pages/admin/RequisitionViews/RequisitionAddForm')));
const ViewRequisitionDetails = Loadable(lazy(() => import('../pages/admin/RequisitionViews/ViewRequisitionDetails')));
const EditManifest = Loadable(lazy(() => import('../pages/admin/RequisitionViews/components/EditManifest')));

const ServiceProvider = Loadable(lazy(() => import('../pages/admin/ServiceProviderViews/ServiceProvider')));
const ServiceProviderEditForm = Loadable(lazy(() => import('../pages/admin/ServiceProviderViews/ServiceProviderEditForm')));
const ServiceProviderAddForm = Loadable(lazy(() => import('../pages/admin/ServiceProviderViews/ServiceProviderAddForm')));

const Hospital = Loadable(lazy(() => import('../pages/admin/HospitalViews/Hospitals')));
const HospitalsEditForm = Loadable(lazy(() => import('../pages/admin/HospitalViews/HospitalsEditForm')));
const HospitalsAddForm = Loadable(lazy(() => import('../pages/admin/HospitalViews/HospitalsAddForm')));

const User = Loadable(lazy(() => import('../pages/admin/UserViews/Users')));
const UserEditForm = Loadable(lazy(() => import('../pages/admin/UserViews/UsersEditForm')));
const UserAddForm = Loadable(lazy(() => import('../pages/admin/UserViews/UsersAddForm')));

const SmartBins = Loadable(lazy(() => import('../pages/admin/SmartBins/ActiveSmartBins')));
const SmartBinsAddForm = Loadable(lazy(() => import('../pages/admin/SmartBins/SmartBinsAddForm')));
const ViewSmartBinsDetails = Loadable(lazy(() => import('../pages/admin/SmartBins/ViewSmartBinsDetails')));
// const EditManifest = Loadable(lazy(() => import('../pages/admin/RequisitionViews/components/EditManifest')));

//11111111111111

const Hospital_Requisitions = Loadable(lazy(() => import('../pages/hospital/RequisitionViews/ActiveRequisitions')));
const Hospital_Completed_Requisitions = Loadable(lazy(() => import('../pages/hospital/RequisitionViews/CompletedRequisitions')));
const Hospital_Rejected_Requisitions = Loadable(lazy(() => import('../pages/hospital/RequisitionViews/RejectedRequisitions')));
const Hospital_RequisitionAddForm = Loadable(lazy(() => import('../pages/hospital/RequisitionViews/RequisitionAddForm')));
const Hospital_ViewRequisitionDetails = Loadable(lazy(() => import('../pages/hospital/RequisitionViews/ViewRequisitionDetails')));
const Hospital_ViewCompletedRequisitionDetails = Loadable(lazy(() => import('../pages/hospital/RequisitionViews/ViewCompletedRequisitionDetails')));
const Hospital_ViewRejectedRequisitionDetails = Loadable(lazy(() => import('../pages/hospital/RequisitionViews/ViewRejectedRequisitionDetails')));

const Hospital_ServiceProvider = Loadable(lazy(() => import('../pages/hospital/ServiceProviderViews/ServiceProvider')));
const Hospital_ServiceProviderEditForm = Loadable(lazy(() => import('../pages/hospital/ServiceProviderViews/ServiceProviderEditForm')));
const Hospital_ServiceProviderAddForm = Loadable(lazy(() => import('../pages/hospital/ServiceProviderViews/ServiceProviderAddForm')));

const Hospital_User = Loadable(lazy(() => import('../pages/hospital/UserViews/Users')));
const Hospital_UserEditForm = Loadable(lazy(() => import('../pages/hospital/UserViews/UsersEditForm')));
const Hospital_UserAddForm = Loadable(lazy(() => import('../pages/hospital/UserViews/UsersAddForm')));


//11111111111111

const Service_Provider_Requisitions = Loadable(lazy(() => import('../pages/service_provider/RequisitionViews/ActiveRequisitions')));
const Service_Provider_Completed_Requisitions = Loadable(lazy(() => import('../pages/service_provider/RequisitionViews/CompletedRequisitions')));
const Service_Provider_RequisitionAddForm = Loadable(lazy(() => import('../pages/service_provider/RequisitionViews/RequisitionAddForm')));
const Service_Provider_ViewRequisitionDetails = Loadable(lazy(() => import('../pages/service_provider/RequisitionViews/ViewRequisitionDetails')));
const Service_Provider_ViewCompletedRequisitionDetails = Loadable(lazy(() => import('../pages/service_provider/RequisitionViews/ViewCompletedRequisitionDetails')));
const Service_Provider_EditManifest = Loadable(lazy(() => import('../pages/service_provider/RequisitionViews/components/EditManifest')));

const Service_Provider_User = Loadable(lazy(() => import('../pages/service_provider/UserViews/Users')));
const Service_Provider_UserEditForm = Loadable(lazy(() => import('../pages/service_provider/UserViews/UsersEditForm')));
const Service_Provider_UserAddForm = Loadable(lazy(() => import('../pages/service_provider/UserViews/UsersAddForm')));

//11111111111111

const Driver_Requisitions = Loadable(lazy(() => import('../pages/driver/RequisitionViews/ActiveRequisitions')));
const Driver_Completed_Requisitions = Loadable(lazy(() => import('../pages/driver/RequisitionViews/CompletedRequisitions')));
const Driver_RequisitionAddForm = Loadable(lazy(() => import('../pages/driver/RequisitionViews/RequisitionAddForm')));
const Driver_ViewRequisitionDetails = Loadable(lazy(() => import('../pages/driver/RequisitionViews/ViewRequisitionDetails')));
const Driver_ViewCompletedRequisitionDetails = Loadable(lazy(() => import('../pages/driver/RequisitionViews/ViewCompletedRequisitionDetails')));
const Driver_EditManifest = Loadable(lazy(() => import('../pages/driver/RequisitionViews/components/EditManifest')));

//11111111111111 

const materialRoutes = [
  {
    path: '/netcare/admin/waste-types-dashboard',
    element: <WasteTypesAnalytics />,
    auth: authRoles.admin
  },
  {
    path: '/netcare/admin/ESG-dashboard',
    element: <ESGReportingAnalytics />,
    auth: authRoles.admin
  },
  {
    path: '/netcare/admin/tracking-dashboard',
    element: <TrackingAnalytics />,
    auth: authRoles.admin
  },
  {
    path: '/netcare/admin/requisitions',
    element: <Requisitions />,
    auth: authRoles.admin
  }, 
  {
    path: '/netcare/admin/add-requisitions',
    element: <RequisitionAddForm />,
    auth: authRoles.admin
  }, 
  {
    path: '/netcare/admin/view-requisitions-details',
    element: <ViewRequisitionDetails />,
    auth: authRoles.admin
  },
  {
    path: '/netcare/admin/edit-manifest-details',
    element: <EditManifest />,
    auth: authRoles.admin
  },
  {
    path: '/netcare/admin/smart-bins-dashboard',
    element: <SmartBinsAnalytics />,
    auth: authRoles.admin
  },
  {
    path: '/netcare/admin/smart-bins',
    element: <SmartBins />,
    auth: authRoles.admin
  },
  {
    path: '/netcare/admin/smart-bins-form',
    element: <SmartBinsAddForm />,
    auth: authRoles.admin
  },
  {
    path: '/netcare/admin/view-smart-bins-details',
    element: <ViewSmartBinsDetails />,
    auth: authRoles.admin
  },
   
  //111111111111111111111111111111111111111111111111111111111111111111111111111111

  {
    path: '/netcare/admin/service-provider',
    element: <ServiceProvider />,
    auth: authRoles.admin
  },   
  {
    path: '/netcare/admin/service-provider-edit-form',
    element: <ServiceProviderEditForm />,
    auth: authRoles.admin
  }, 
  {
    path: '/netcare/admin/service-provider-add-form',
    element: <ServiceProviderAddForm />,
    auth: authRoles.admin
  },

  //111111111111111111111111111111111111111111111111111111111111111111111111111111

  {
    path: '/netcare/admin/hospital',
    element: <Hospital />,
    auth: authRoles.admin
  }, 
  {
    path: '/netcare/admin/hospitals-edit-form',
    element: <HospitalsEditForm />,
    auth: authRoles.admin
  }, 
  {
    path: '/netcare/admin/hospitals-add-form',
    element: <HospitalsAddForm />,
    auth: authRoles.admin
  },

  //111111111111111111111111111111111111111111111111111111111111111111111111111111

  {
    path: '/netcare/admin/user',
    element: <User />,
    auth: authRoles.admin
  }, 
  {
    path: '/netcare/admin/user-edit-form',
    element: <UserEditForm />,
    auth: authRoles.admin
  }, 
  {
    path: '/netcare/admin/user-add-form',
    element: <UserAddForm />,
    auth: authRoles.admin
  },

  //111111111111111111111111111111111111111111111111111111111111111111111111111111
  {
    path: '/netcare/hospital/requisitions',
    element: <Hospital_Requisitions />,
    auth: authRoles.hospital
  },   
  {
    path: '/netcare/hospital/completed-requisitions',
    element: <Hospital_Completed_Requisitions />,
    auth: authRoles.hospital
  },
  {
    path: '/netcare/hospital/rejected-requisitions',
    element: <Hospital_Rejected_Requisitions />,
    auth: authRoles.hospital
  },
  {
    path: '/netcare/hospital/add-requisitions',
    element: <Hospital_RequisitionAddForm />,
    auth: authRoles.hospital
  }, 
  {
    path: '/netcare/hospital/view-requisitions-details',
    element: <Hospital_ViewRequisitionDetails />,
    auth: authRoles.hospital
  }, 
  {
    path: '/netcare/hospital/view-completed-requisitions-details',
    element: <Hospital_ViewCompletedRequisitionDetails />,
    auth: authRoles.hospital
  }, 
  {
    path: '/netcare/hospital/view-rejected-requisitions-details',
    element: <Hospital_ViewRejectedRequisitionDetails />,
    auth: authRoles.hospital
  },
   
  //111111111111111111111111111111111111111111111111111111111111111111111111111111

  {
    path: '/netcare/hospital/service-provider',
    element: <Hospital_ServiceProvider />,
    auth: authRoles.hospital
  },   
  {
    path: '/netcare/hospital/service-provider-edit-form',
    element: <Hospital_ServiceProviderEditForm />,
    auth: authRoles.hospital
  }, 
  {
    path: '/netcare/hospital/service-provider-add-form',
    element: <Hospital_ServiceProviderAddForm />,
    auth: authRoles.hospital
  },

  //111111111111111111111111111111111111111111111111111111111111111111111111111111

  {
    path: '/netcare/hospital/user',
    element: <Hospital_User />,
    auth: authRoles.hospital
  }, 
  {
    path: '/netcare/hospital/user-edit-form',
    element: <Hospital_UserEditForm />,
    auth: authRoles.hospital
  }, 
  {
    path: '/netcare/hospital/user-add-form',
    element: <Hospital_UserAddForm />,
    auth: authRoles.hospital
  },

  //111111111111111111111111111111111111111111111111111111111111111111111111111111
  {
    path: '/netcare/service_provider/requisitions',
    element: <Service_Provider_Requisitions />,
    auth: authRoles.sp
  }, 
  {
    path: '/netcare/service_provider/completed_requisitions',
    element: <Service_Provider_Completed_Requisitions />,
    auth: authRoles.sp
  },
  { 
    path: '/netcare/service_provider/add-requisitions',
    element: <Service_Provider_RequisitionAddForm />,
    auth: authRoles.sp
  }, 
  {
    path: '/netcare/service_provider/view-requisitions-details',
    element: <Service_Provider_ViewRequisitionDetails />,
    auth: authRoles.sp
  },
  {
    path: '/netcare/service_provider/view-completed-requisitions-details',
    element: <Service_Provider_ViewCompletedRequisitionDetails />,
    auth: authRoles.sp
  },
  {
    path: '/netcare/service_provider/edit-manifest-details',
    element: <Service_Provider_EditManifest />,
    auth: authRoles.sp
  },

  //111111111111111111111111111111111111111111111111111111111111111111111111111111

  {
    path: '/netcare/service_provider/user',
    element: <Service_Provider_User />,
    auth: authRoles.sp
  }, 
  {
    path: '/netcare/service_provider/user-edit-form',
    element: <Service_Provider_UserEditForm />,
    auth: authRoles.sp
  }, 
  {
    path: '/netcare/service_provider/user-add-form',
    element: <Service_Provider_UserAddForm />,
    auth: authRoles.sp
  },

  //111111111111111111111111111111111111111111111111111111111111111111111111111111 
  {
    path: '/netcare/driver/requisitions',
    element: <Driver_Requisitions />,
    auth: authRoles.sp_driver
  }, 
  {
    path: '/netcare/driver/completed_requisitions',
    element: <Driver_Completed_Requisitions />,
    auth: authRoles.sp_driver
  },
  {
    path: '/netcare/driver/add-requisitions',
    element: <Driver_RequisitionAddForm />,
    auth: authRoles.sp_driver
  }, 
  {
    path: '/netcare/driver/view-requisitions-details',
    element: <Driver_ViewRequisitionDetails />,
    auth: authRoles.sp_driver
  },
  {
    path: '/netcare/driver/view-completed-requisitions-details',
    element: <Driver_ViewCompletedRequisitionDetails />,
    auth: authRoles.sp_driver
  },
  {
    path: '/netcare/driver/edit-manifest-details',
    element: <Driver_EditManifest />,
    auth: authRoles.sp_driver
  },
  
  //111111111111111111111111111111111111111111111111111111111111111111111111111111


  {
    path: '/material/table',
    element: <AppTable />,
  },
  {
    path: '/material/form',
    element: <AppForm />,
  },
  {
    path: '/material/buttons',
    element: <AppButton />,
  },
  {
    path: '/material/icons',
    element: <AppIcon />,
  },
  {
    path: '/material/progress',
    element: <AppProgress />,
  },
  {
    path: '/material/menu',
    element: <AppMenu />,
  },
  {
    path: '/material/checkbox',
    element: <AppCheckbox />,
  },
  {
    path: '/material/switch',
    element: <AppSwitch />,
  },
  {
    path: '/material/radio',
    element: <AppRadio />,
  },
  {
    path: '/material/slider',
    element: <AppSlider />,
  },
  {
    path: '/material/autocomplete',
    element: <AppAutoComplete />,
  },
  {
    path: '/material/expansion-panel',
    element: <AppExpansionPanel />,
  },
  {
    path: '/material/dialog',
    element: <AppDialog />,
  },
  {
    path: '/material/snackbar',
    element: <AppSnackbar />,
  },
];

export default materialRoutes;
