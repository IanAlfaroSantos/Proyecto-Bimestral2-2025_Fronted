import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    
   
    if (!user) {
        return <Navigate to="/auth" replace />;
    }
    
   
    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};


export default ProtectedRoute;