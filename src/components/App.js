import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth } from "../hooks";
import { Home, Login, Register, Settings } from "../pages";
import { Loader, Navbar } from "./";

const Page404 = () => {
  return <h1>Page 404</h1>
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
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Page404 />} /> {/* Creating a 404 Page by targeting the all selector */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
