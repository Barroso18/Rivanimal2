import { useAuth } from './AuthProvider';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default RutaProtegida;
