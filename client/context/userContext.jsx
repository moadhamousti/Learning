// import axios from 'axios';
// import { createContext, useEffect, useState } from 'react';

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         axios.get('/dashboard')
//             .then(({ data }) => {
//                 console.log('User data:', data); // Log the user data
//                 setUser(data); // Ensure data has a name field
//             })
//             .catch((error) => {
//                 console.error('Error fetching user profile:', error);
//             });
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// }






import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('https://learning-cm37.onrender.com/api/auth/profile', { withCredentials: true });
                setUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };        
        fetchUser();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('https://learning-cm37.onrender.com/api/auth/login', { email, password }, { withCredentials: true });
            setUser(data);
            navigate('/'); // Redirect to home after successful login
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
        }
    };

    const logout = async () => {
        try {
            await axios.post('https://learning-cm37.onrender.com/api/auth/logout', {}, { withCredentials: true });
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
}
