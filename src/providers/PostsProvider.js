import { createContext } from 'react';
import { useProvidePosts } from '../hooks';

//Initial State for PostsContext
const initialState = {
  data: [],
  loading: true,
  addPostsToState: () => {},
}

//Creating PostsContext using the createContext and passing the initialState to it
export const PostsContext = createContext(initialState);

//Creating the PostsProvider Component, which fetches the children,
export const PostsProvider = ({children}) => {
  //Fetching the new state for PostsContext
  const posts = useProvidePosts();

  //Setting the value of PostsContext with the posts state
  return <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
}
