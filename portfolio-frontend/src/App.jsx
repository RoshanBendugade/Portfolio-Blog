
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Public portfolio components
import ScrollProgress from "./components/ui/ScrollProgress";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Blogs from "./components/Blogs/Blogs";
import Contact from "./components/Contacts/Contact";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/ui/BackToTop";
import Loader from "./components/ui/Loader";

// Admin pages
import Login from "./Pages/Admin/Login";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ProjectsManager from "./Pages/Admin/ProjectsManager";
import BlogsManager from "./Pages/Admin/BlogsManager";
import MessagesManager from "./Pages/Admin/MessagesManager";

// Authentication
import ProtectedRoute from "./components/ProtectedRoute";

// Public homepage
function Home() {
  return (
    <div className="bg-white text-gray-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">
      <ScrollProgress />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blogs />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>

      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected admin routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/projects" element={<ProjectsManager />} />
        <Route path="/admin/blogs" element={<BlogsManager />} />
        <Route path="/admin/messages" element={<MessagesManager />} />
      </Route>

    </Routes>
  );
}

export default App;
