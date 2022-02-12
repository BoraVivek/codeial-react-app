import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login, Register, Settings, UserProfile } from "../pages";
import { Loader, Navbar } from "./";

const Page404 = () => {
  return <h1>Page 404</h1>
}

// Private route- which protects the un-authorized access to pages
function PrivateRoute ({children}){
  const auth = useAuth(); //Getting the logged in users details

  // If the user is logged in then render the child component, else redirect to login page
  return auth.user ? children : <Navigate to="/login" />;
}

function App() {
  const auth = useAuth(); //Getting the useContext of AuthContext

  // If the content is still being fetched, then show the loader.
  if (auth.loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="App">
      {/* <Routes> Component should be child of <Router> Component */}
      <Router>
        {/* Component containing <Link> Component, should be inside the <Router> Component */}
        <Navbar /> 
        {/* All <Route> Component should be child of <Routes> component. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Here we are wrapping our element with PrivateRoute, so that only authorized users should be able to access it */}
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/user/:userId" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="*" element={<Page404 />} /> {/* Creating a 404 Page by targeting the all selector */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
