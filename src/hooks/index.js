import {useContext, useEffect, useState} from 'react';
import { AuthContext, PostsContext } from '../providers';
import { editProfile, login as userLogin, register, fetchUserFriends, getPosts } from '../api';
import { getItemFromLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, setItemInLocalStorage } from '../utils';
import jwtDecode from 'jwt-decode';

// we are using it so that we don't have to call useContext again and again in every file, instead we will use useAuth
export const useAuth = () => {
    return useContext(AuthContext);
}

// Here we are creating a custom hook, for authorization purposes.
export const useProvideAuth = () => {
    // Defining User and Loading state

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Using useEffect just one time to check user authentication - It checks the token in localstorage and fetches the user info and decodes it and set the logged in user in the state. Mainly useful when we make page refreshes.
    useEffect(() => {

        const getUser = async() => {
            // Getting the token from the localstorage
            const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

            // Check if token exists
            if(userToken){
                // Decode the user info from the token
                const user = jwtDecode(userToken);

                // Fetching friends of logged in User
                const response = await fetchUserFriends();

                let friends = [];
                // If friends exists, then store them in the friends variable
                if(response.success){
                    friends = response.data.friends;
                }

                // Set the decoded user in the state
                // Setting the user and its friend in the state
                setUser({
                    ...user,
                    friends,
                });
            }

            // Set the loading state to false
            setLoading(false);
        }

        getUser();
        
    }, [])

    // Updating the user profile, and on success changing the user state, and also updating token in localstorage
    const updateUser = async(userId, name, password, confirmPassword) => {
        // Calling the editProfile Function from the API and making a request to update profile details
        const response = await editProfile(userId, name, password, confirmPassword);

        if(response.success){
            // Setting the updated user as the logged in user.
            setUser(response.data.user);
            // Refresh the user token in LocalStorage when user updates his details
            setItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
            // // Returning Success
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

    // Updating User Friends
    const updateUserFriends = (addFriend, friend) => {
        // If addFriend is true, then add the new friend to the friends state of user.
        if(addFriend){
            setUser({
                ...user,
                friends: [...user.friends, friend],
            })
            return;
        }
        
        //remove the friend from the friends state of logged in user. Filter out the friend from the friends array
        const newFriends = user.friends.filter(userFriend => userFriend.to_user._id !== friend.to_user._id);
        
        // If addFriend is false, then remove the friend from the friends state of logged in user.
        setUser({
            ...user,
            // Filtering out the friend from the friends list to remove it from the state
            friends: newFriends
        })
        
    }

    // Returning the user and loading state, along with login and logout functions.
    return {
        user,
        login,
        logout,
        loading,
        signup,
        updateUser,
        updateUserFriends
    }
};

/**
 * Posts Custom Hook for Handling the PostsContext
 */

//Creating a Custom Hook, so that instead of calling useContext, we use usePosts to fetch the current posts from PostsContext
export const usePosts = () => {
    //Accepts a context object (the value returned from React.createContext)
    // and returns the current context value, as given by the nearest context provider for the given context.
    return useContext(PostsContext);
}

/**
 * It returns the state for PostsContext
 */
export const useProvidePosts = () => {
    //Defining Posts and Loading State
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    //Using React Hook, and calling the getPosts() function to fetch Posts
    useEffect(() => {

        // We can't make useEffect directly as an async, so we define a function inside it and make it async
        const fetchPosts = async () => {

            //Fetching Posts from the API
            const response = await getPosts();

            // If the response is success, then store the posts in posts variable
            if (response.success) {
                setPosts(response.data.posts);
            }

            // Once the content is loaded, set the loading to false.
            setLoading(false);
        }

        //Calling the fetch posts functions
        fetchPosts();

        // [] - Ensures that this hook will be called only once the component is mounted.
    }, []);

    //Adding new post to the posts state, so it updates the posts state, thus re-rendering the posts list
    const addPostsToState = (post) => {
        const newPosts = [post, ...posts];

        setPosts(newPosts);
    }

    return {
        data: posts,
        loading,
        addPostsToState,
    }
}