import {useContext, useState} from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin } from '../api';

// we are using it so that we don't have to call useContext again and again in every file, instead we will use useAuth
export const useAuth = () => {
    return useContext(AuthContext);
}

// Here we are creating a custom hook, for authroization purposes.
export const useProvideAuth = () => {
    // Defining User and Loading state

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Defining the Login function
    const login = async(email, password) => {
        // Calling the login functionality and perform fetch request to login api
        const response = await userLogin(email, password);

        if(response.success){
            // Setting the user as the logged in user.
            setUser(response.data.user);
            // Returning Success
            return{
                success: true
            }
        }else{
            // Returning false, and error message
            return{
                success: false,
                message: response.message,
            }
        }
    }

    // Defining the logout function
    const logout = () => {
        // Setting user as logout, when user logs out
        setUser(null);
    }

    // Returning the user and loading state, along with login and logout functions.
    return {
        user,
        login,
        logout,
        loading
    }
};