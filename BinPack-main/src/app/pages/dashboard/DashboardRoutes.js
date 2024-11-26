import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const AdminAnalytics = Loadable(lazy(() => import('../admin/AdminAnalytics')));
const HospitalAnalytics = Loadable(lazy(() => import('../hospital/HospitalAnalytics')));
const ServiceProviderAnalytics = Loadable(lazy(() => import('../service_provider/ServiceProviderAnalytics')));
const DriverAnalytics = Loadable(lazy(() => import('../driver/DriverAnalytics')));

const dashboardRoutes = [
  { path: '/netcare/admin/dashboard', element: <AdminAnalytics />, auth: authRoles.admin },
  { path: '/netcare/hospital/dashboard', element: <HospitalAnalytics />, auth: authRoles.hospital },
  { path: '/netcare/service_provider/dashboard', element: <ServiceProviderAnalytics />, auth: authRoles.sp },
  { path: '/netcare/driver/dashboard', element: <DriverAnalytics />, auth: authRoles.sp_driver },
];

export default dashboardRoutes;
