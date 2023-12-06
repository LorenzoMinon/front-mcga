import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
      // Verifica la autenticación al cargar el componente
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        setIsAuthenticated(!!user);
      });
  
      // Limpia el efecto al desmontar el componente
      return () => unsubscribe();
    }, []);
  
    return isAuthenticated ? (
      <Route path={path} element={element} />
    ) : (
      <Navigate to="/login" replace={true} />
    );
  };

export default PrivateRoute;
