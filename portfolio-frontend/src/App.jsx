import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";

import Projects from "./components/Projects/Projects";
import Blogs from "./components/Blogs/Blogs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
      <div className="bg-white text-gray-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">
      <Navbar />

      <Hero />

      <About />

      <Skills />

      <Projects />

      <Blogs />

      <Contact />

      <Footer />

    </div>
  );
}

export default App;