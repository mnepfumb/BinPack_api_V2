// import { navigations } from 'app/pages/admin/navigations';
import { admin_navigations } from 'app/pages/admin/navigations';
import { driver_navigations } from 'app/pages/driver/navigations';
import { hospital_navigations } from 'app/pages/hospital/navigations';
import { service_provider_navigations } from 'app/pages/service_provider/navigations';
import { SET_USER_NAVIGATION } from '../actions/NavigationAction';

const initialState = [...admin_navigations, driver_navigations, hospital_navigations, service_provider_navigations];

const NavigationReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAVIGATION: {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default NavigationReducer;
