import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { getPosts } from "../api";
import { Home, Login } from "../pages";
import { Loader, Navbar } from "./";

const About = () => {
  return <h1>About</h1>
}

const UserInfo = () => {
  return <h1>User</h1>
}

const Page404 = () => {
  return <h1>Page 404</h1>
}

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

  // If the content is still being fetched, then show the loader.
  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home posts={posts} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/user/vivek" element={<UserInfo />} />
          <Route exact path="/login" element={<Login />} />
          <Route element={<Page404 />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
