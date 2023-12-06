import { Route, RouteProps, Navigate } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

interface PrivateRouteProps extends RouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const user = firebase.auth().currentUser;

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />}
    />
  );
};
export default PrivateRoute;

