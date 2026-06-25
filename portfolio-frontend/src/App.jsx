import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";

import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-slate-950 text-white">

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