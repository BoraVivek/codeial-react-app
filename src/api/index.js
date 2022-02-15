import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from "../utils";

//Setting up custom fetch function
const customFetch = async (url, { body, ...customConfig }) => {

    //Getting Authorization Token from the local storage
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    //Define Headers
    const headers = {
        // Our server expects body in x-www-form-url-encoded format
        // We had written content-type in lowercase, which was causing error as 422 - Unprocessed Entity
        'Content-Type': 'application/x-www-form-urlencoded',
    }

    //If Token Exists in localstorage, add the authorization in headers
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    //Define custom Configuration
    const config = {
        //Spread the content of customConfig
        ...customConfig,

        //Set the headers
        headers: {
            //Spread the contents form headers
            ...headers,

            //If headers are present in customConfig, then define them in headers aswell
            ...customConfig.headers,
        }
    }

    //If body is present, then set the body in the config by stringifying it
    if (body) {
        //JSON.stringify - Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
        // config.body = JSON.stringify(body);

        // As we are using x-www-form-url-encoded format, we have to encode our data, before passing to the server, so we use the getFormBody function to encode our data
        config.body = getFormBody(body);
    }

    try {
        //Fetch the content from the specified url, based on the provided configuration
        const response = await fetch(url, config);
        //Conver the response to json
        const data = await response.json();

        //If data is success, then return the data
        if (data.success) {
            return {
                data: data.data,
                success: true,
            }
        }

        //If the response fails, then throw an error
        throw new Error(data.message);
    } catch (error) {
        console.error(error);
        //Returning the error message, and success as false
        return {
            message: error.message,
            success: false,
        }
    }
}

//Get Post Function which uses customFetch to fetch the Posts
export const getPosts = (page = 1, limit = 5) => {
    // Passing the posts url to the customFetch function, with get as the method 
    return customFetch(API_URLS.posts(page, limit), {
        method: 'GET',
    });
}

// Implementing the login functionality, which fetches the url from the constants file, and make a fetch request to the login api
export const login = (email, password) => {
    return customFetch(API_URLS.login(), {
        method: 'POST',
        // Passing email and password as body
        body: { email, password }
    });
}

// Implementing the register functionality, which fetches the register url from the constants file, and make a fetch request to register the account
export const register = async (name, email, password, confirmPassword) => {
    return customFetch(API_URLS.signup(), {
        method: 'POST',
        // Passing email and password as body
        body: { name, email, password, confirm_password: confirmPassword }
    })
}

// Implementing the editing profile functionality
export const editProfile = async (userId, name, password, confirmPassword) => {
    return customFetch(API_URLS.editUser(), {
        method: 'POST',
        // Passing fields as body
        body: { id: userId, name: name, password: password, confirm_password: confirmPassword }
    })
}

//Fetching user info to display user info in their profile page
export const fetchUserProfile = (userId) => {
    return customFetch(API_URLS.userInfo(userId), {
        method: 'GET',
    });
}

//Fetching logged in user's friends
export const fetchUserFriends = () => {
    return customFetch(API_URLS.friends(), {
        method: 'GET',
    });
}

//Adding Friend
export const addFriend = (userId) => {
    return customFetch(API_URLS.createFriendship(userId), {
        method: 'POST',
    });
}

// Remove Friend
export const removeFriend = (userId) => {
    return customFetch(API_URLS.removeFriend(userId), {
        method: 'POST',
    });
}

// Add Post Function
export const addPost = (content) => {
    return customFetch(API_URLS.createPost(), {
        method: 'POST',
        body: {
            content
        }
    });
}