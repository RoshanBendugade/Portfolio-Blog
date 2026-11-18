import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
import NotFound from "./Pages/NotFound";
import Experience from "./components/Experience/Experience";

// Authentication
import ProtectedRoute from "./components/ProtectedRoute";

// Loaded only when needed, so the public site downloads less JavaScript
const BlogPost = lazy(() => import("./Pages/BlogPost"));
const Login = lazy(() => import("./Pages/Admin/Login"));
const AdminDashboard = lazy(() => import("./Pages/Admin/AdminDashboard"));
const ProjectsManager = lazy(() => import("./Pages/Admin/ProjectsManager"));
const BlogsManager = lazy(() => import("./Pages/Admin/BlogsManager"));
const MessagesManager = lazy(() => import("./Pages/Admin/MessagesManager"));

function PageLoader() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--line)] border-t-[var(--accent)]" />
    </div>
  );
}

function Home() {
  const { hash } = useLocation();
  const [initialHash] = useState(hash);

  // When arriving from another page (e.g. "/#blogs"), jump to that section
  useEffect(() => {
    if (!initialHash) return;

    const timer = setTimeout(() => {
      document.getElementById(initialHash.slice(1))?.scrollIntoView();
    }, 400);

    return () => clearTimeout(timer);
  }, [initialHash]);

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Blogs />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<ProjectsManager />} />
          <Route path="/admin/blogs" element={<BlogsManager />} />
          <Route path="/admin/messages" element={<MessagesManager />} />
        </Route>

        {/* Anything else */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;