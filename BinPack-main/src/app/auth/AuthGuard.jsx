import useAuth from 'app/hooks/useAuth';
import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from 'react-router-dom';
import AllPages from '../Routes/routes';

const userHasPermission = (pathname, user, routes) => {
  //////console.log('AuthProvider-user: ' + user.role);
  //////console.log('AuthProvider-pathname: ' + pathname);
  //////console.log('AuthProvider-routes: ' + routes);

  if (!user) {
    return false;
  } else {
    const matched = routes.find((route) => route.path === pathname);
    const authenticated = matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;

    //////console.log('AuthProvider-matched: ' + matched);
    //////console.log('AuthProvider-matched.auth: ' + matched.auth);
    ////console.log('AuthProvider-matched.auth.length: ' + matched.auth.length);
    ////console.log('AuthProvider-matched.auth.includes(user.role): ' + matched.auth.includes(user.role));
    

    return authenticated;
  }
  
};

const AuthGuard = ({ children }) => {
  let authenticated;
  let { isAuthenticated, user } = useAuth();
  var { pathname } = useLocation();


  // Override path
  if (user && isAuthenticated) {
    ////console.log('user: ' + user.role );
    ////console.log('AuthProvider-isAuthenticated: ' + isAuthenticated);
    ////console.log('pathname: ' + pathname);

    const routes = flat(AllPages);
    ////console.log('routes: ' + routes);
    
    const hasPermission = userHasPermission(pathname, user, routes);

    ////console.log('AuthProvider-hasPermission: ' + hasPermission);

    authenticated = isAuthenticated && hasPermission;
  } else {
    authenticated = isAuthenticated;
  }

  ////console.log('AuthProvider-authenticated: ' + authenticated);
  // IF YOU NEED ROLE BASED AUTHENTICATION,
  // UNCOMMENT ABOVE LINES
  // AND COMMENT OUT BELOW authenticated VARIABLE

  

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
