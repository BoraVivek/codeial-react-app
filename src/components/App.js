import { useEffect, useState } from "react";
import { getPosts } from "../api";
import {Home} from "../pages";
import {Loader} from "./";


function App() {

  // State for Posts
  const [posts, setPosts] = useState([]);

  // State for Loading
  const [loading, setLoading] = useState(true);

  //Using React Hook, and calling the getPosts() function to fetch Posts
  useEffect(() => {

    // We can't make useEffect directly as an async, so we define a function inside it and make it async
    const fetchPosts = async () => {

      //Fetching Posts from the API
      const response = await getPosts();
      
      // If the response is success, then store the posts in posts variable
      if(response.success){
        setPosts(response.data.posts);
      }

      // Once the content is loaded, set the loading to false.
      setLoading(false);
    }

    //Calling the fetch posts functions
    fetchPosts();

    // [] - Ensures that this hook will be called only once the component is mounted.
  }, []);

  // If the content is still being fetched, then show the loader.
  if(loading){
    return (
      <Loader />
    );
  }

  return (
    <div className="App">
      {/* Passing posts to the Home Component */}
      <Home posts = {posts} />
    </div>
  );
}

export default App;
