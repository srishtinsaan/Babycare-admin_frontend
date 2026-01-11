
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services"
import Programs from "./pages/Programs";
import Events from "./pages/Events";
import Blogs from "./pages/Blogs";
import Teams from "./pages/Teams";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Testimonials from "./pages/Testimonials";

// ✅ Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {

  


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
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Nested routes rendered inside Sidebar */}
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="programs" element={<Programs />} />
          <Route path="events" element={<Events />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="teams" element={<Teams />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
