import { useContext, useEffect, useState } from 'react';
import { PostsContext } from '../providers';
import { getPosts } from '../api';

/**
 * Posts Custom Hook for Handling the PostsContext
 */

//Creating a Custom Hook, so that instead of calling useContext, we use usePosts to fetch the current posts from PostsContext
export const usePosts = () => {
    //Accepts a context object (the value returned from React.createContext)
    // and returns the current context value, as given by the nearest context provider for the given context.
    return useContext(PostsContext);
};

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
        };

        //Calling the fetch posts functions
        fetchPosts();

        // [] - Ensures that this hook will be called only once the component is mounted.
    }, []);

    //Adding new post to the posts state, so it updates the posts state, thus re-rendering the posts list
    const addPostsToState = (post) => {
        const newPosts = [post, ...posts];

        setPosts(newPosts);
    };

    //Adds the newly added comment to the post in the posts state
    const addCommentToPost = (postId, comment) => {

        //Loops throug the posts, and if postId matches a post, then return the new post
        const newPosts = posts.map((post) => {
            if (post._id === postId) {
                //destructuring the post, and its comments by adding the new comment in the end
                return { ...post, comments: [...post.comments, comment] };
            }
            return post;
        });

        //Setting the newPosts
        setPosts(newPosts);
    };

    // Function which is used to delete comment from the post present in the posts state, so that the component re-renders after removing the comment.
    const deleteCommentFromPost = (postId, commentId) => {

        // Mapping through the posts
        const newPosts = posts.map((post) => {

            // If post is the post of comment
            if (post._id === postId) {
                // Then filter out the comment which needs to be removed, and store rest of the comments in a new variable
                const newComments = post.comments.filter((comment) => {
                    return comment._id !== commentId;
                })

                // Now return the post with the new comments, which doesn't include the deleted comment
                return { ...post, comments: [...newComments] };
            }
            // Return the post directly, if it doesn't match the post of comment we want to delete.
            return post;
        })

        // Set the newPosts in state
        setPosts(newPosts);
    }

    return {
        data: posts,
        loading,
        addPostsToState,
        addCommentToPost,
        deleteCommentFromPost
    };
};