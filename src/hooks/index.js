import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin, register } from '../api';
import { getItemFromLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, setItemInLocalStorage } from '../utils';
import jwtDecode from 'jwt-decode';

// we are using it so that we don't have to call useContext again and again in every file, instead we will use useAuth
export const useAuth = () => {
    return useContext(AuthContext);
}

// Here we are creating a custom hook, for authroization purposes.
export const useProvideAuth = () => {
    // Defining User and Loading state

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Using useEffect just one time to check user authentication
    useEffect(() => {
        // Getting the token from the localstorage
        const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

        // Check if token exists
        if(userToken){
            // Decode the user info from the token
            const user = jwtDecode(userToken);

            // Set the decoded user in the state
            setUser(user);
        }

        // Set the loading state to false
        setLoading(false);
    }, [])
    
    // Defining the Login function
    const login = async(email, password) => {
        // Calling the login functionality and perform fetch request to login api
        const response = await userLogin(email, password);

        if(response.success){
            // Setting the user as the logged in user.
            setUser(response.data.user);
            // Set the user token in LocalStorage
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
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

    // Defining the Signup Action in Authentication Handler
    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);

        if(response.success){
            return {
                success: true,
            };
        }else{
            return {
                success: false,
                message: response.message,
            }
        }
    }

    // Defining the logout function
    const logout = () => {
        // Setting user as logout, when user logs out
        setUser(null);
        // Remove token from localstorage on logout
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    }

    // Returning the user and loading state, along with login and logout functions.
    return {
        user,
        login,
        logout,
        loading,
        signup,
    }
};