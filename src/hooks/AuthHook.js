import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers';
import { editProfile, login as userLogin, register, fetchUserFriends } from '../api';
import {
    getItemFromLocalStorage,
    LOCALSTORAGE_TOKEN_KEY,
    removeItemFromLocalStorage,
    setItemInLocalStorage
} from '../utils';
import jwtDecode from 'jwt-decode';

// we are using it so that we don't have to call useContext again and again in every file, instead we will use useAuth
export const useAuth = () => {
    return useContext(AuthContext);
};

// Here we are creating a custom hook, for authorization purposes.
export const useProvideAuth = () => {
    // Defining User and Loading state

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Using useEffect just one time to check user authentication - It checks the token in localstorage and fetches the user info and decodes it and set the logged in user in the state. Mainly useful when we make page refreshes.
    useEffect(() => {

        const getUser = async () => {
            // Getting the token from the localstorage
            const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

            // Check if token exists
            if (userToken) {
                // Decode the user info from the token
                const user = jwtDecode(userToken);

                // Fetching friends of logged in User
                const response = await fetchUserFriends();

                let friends = [];
                // If friends exists, then store them in the friends variable
                if (response.success) {
                    friends = response.data.friends;
                }

                // Set the decoded user in the state
                // Setting the user and its friend in the state
                setUser({
                    ...user,
                    friends
                });
            }

            // Set the loading state to false
            setLoading(false);
        };

        getUser();

    }, []);

    // Updating the user profile, and on success changing the user state, and also updating token in localstorage
    const updateUser = async (userId, name, password, confirmPassword) => {
        // Calling the editProfile Function from the API and making a request to update profile details
        const response = await editProfile(userId, name, password, confirmPassword);

        if (response.success) {
            // Setting the updated user as the logged in user.
            setUser(response.data.user);
            // Refresh the user token in LocalStorage when user updates his details
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
            // // Returning Success
            return {
                success: true
            };
        } else {
            // Returning false, and error message
            return {
                success: false,
                message: response.message
            };
        }
    };

    // Defining the Login function
    const login = async (email, password) => {
        // Calling the login functionality and perform fetch request to login api
        const response = await userLogin(email, password);

        if (response.success) {
            // Setting the user as the logged in user.
            setUser(response.data.user);
            // Set the user token in LocalStorage
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
            // Returning Success
            return {
                success: true
            };
        } else {
            // Returning false, and error message
            return {
                success: false,
                message: response.message
            };
        }
    };

    // Defining the Signup Action in Authentication Handler
    const signup = async (name, email, password, confirmPassword) => {
        const response = await register(name, email, password, confirmPassword);

        if (response.success) {
            return {
                success: true
            };
        } else {
            return {
                success: false,
                message: response.message
            };
        }
    };

    // Defining the logout function
    const logout = () => {
        // Setting user as logout, when user logs out
        setUser(null);
        // Remove token from localstorage on logout
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };

    // Updating User Friends
    const updateUserFriends = (addFriend, friend) => {
        // If addFriend is true, then add the new friend to the friends state of user.
        if (addFriend) {
            setUser({
                ...user,
                friends: [...user.friends, friend]
            });
            return;
        }

        //remove the friend from the friends state of logged in user. Filter out the friend from the friends array
        const newFriends = user.friends.filter(userFriend => userFriend.to_user._id !== friend.to_user._id);

        // If addFriend is false, then remove the friend from the friends state of logged in user.
        setUser({
            ...user,
            // Filtering out the friend from the friends list to remove it from the state
            friends: newFriends
        });

    };

    // Returning the user and loading state, along with login and logout functions.
    return {
        user,
        login,
        logout,
        loading,
        signup,
        updateUser,
        updateUserFriends
    };
};