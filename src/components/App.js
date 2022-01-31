import { useEffect } from "react";
import { getPosts } from "../api";
import {Home} from "../pages";

function App() {

  //Using React Hook, and calling the getPosts() function to fetch Posts
  useEffect(() => {

    // We can't make useEffect directly as an async, so we define a function inside it and make it async
    const fetchPosts = async () => {

      //Fetching Posts from the API
      const response = await getPosts();
      console.log('response', response);
    }

    //Calling the fetch posts functions
    fetchPosts();

    // [] - Ensures that this hook will be called only once the component is mounted.
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
