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

import { useEffect, useState } from "react";

import Loader from "./components/ui/Loader";

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

export default App;