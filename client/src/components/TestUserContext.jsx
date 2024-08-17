// TestUserContext.jsx
import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const TestUserContext = () => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <div>User: {user ? JSON.stringify(user) : 'No user'}</div>;
};

export default TestUserContext;
