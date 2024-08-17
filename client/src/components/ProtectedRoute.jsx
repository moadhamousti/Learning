import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const ProtectedRoute = ({ element }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        // User is not authenticated
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;
