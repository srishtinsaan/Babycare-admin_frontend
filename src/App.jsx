import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Events from "./pages/Events";
import Blogs from "./pages/Blogs";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";

// ✅ Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {

  const [jokes,setJokes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/jokes')
    .then((response) => {
      setJokes(response.data) // no need to do .json and all in axios
    })
    // setJokes ne jokes array me set kar diya api se jokes data le ke
    .catch((error) => {
      console.log(error)
    })
  })


  return (
    <Router>
      <Routes>
        {/* Public Route — Login */}
        <Route path="/" element={<Auth />} />

        {/* Protected Routes — Inside Sidebar */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        >
          {/* Nested routes rendered inside Sidebar */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programs" element={<Programs />} />
          <Route path="events" element={<Events />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="team" element={<Team />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
