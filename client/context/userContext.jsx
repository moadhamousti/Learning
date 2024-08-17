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
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://e-learning-rosy-sigma.vercel.app/api/auth/profile', { withCredentials: true })
            .then(({ data }) => {
                console.log('User data:', data); // Check this log to ensure data is correct
                setUser(data);
            })
            .catch((error) => {
                console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
                setUser(null);
            });
    }, []);
    

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('https://e-learning-rosy-sigma.vercel.app/api/auth/login', { email, password }, { withCredentials: true });
            console.log('Login successful:', data);
            setUser(data);
            navigate('/formation');
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error.message);
        }
    };
    
    const logout = async () => {
        try {
            await axios.post('https://e-learning-rosy-sigma.vercel.app/api/auth/logout', {}, { withCredentials: true });
            console.log('Logout successful');
            setUser(null);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error logging out:', error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}
