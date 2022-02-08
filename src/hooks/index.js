import {useState} from 'react';

// Here we are creating a custom hook, for authroization purposes.
export const useProvideAuth = () => {
    // Defining User and Loading state
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Defining the Login function
    const login = (email, password) => {

    }

    // Defining the logout function
    const logout = () => {

    }

    // Returning the user and loading state, along with login and logout functions.
    return {
        user,
        login,
        logout,
        loading
    }
};