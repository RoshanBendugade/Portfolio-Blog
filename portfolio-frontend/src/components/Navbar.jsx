import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900 dark:bg-slate-950 text-white shadow-lg z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* Logo */}
        <h1 className="text-3xl font-bold cursor-pointer">
          Roshan Portfolio
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-lg">

          <a
            href="#home"
            className="hover:text-blue-400 transition"
          >
            Home
          </a>

          <a
            href="#about"
            className="hover:text-blue-400 transition"
          >
            About
          </a>

          <a
            href="#skills"
            className="hover:text-blue-400 transition"
          >
            Skills
          </a>

          <a
            href="#projects"
            className="hover:text-blue-400 transition"
          >
            Projects
          </a>

          <a
            href="#blogs"
            className="hover:text-blue-400 transition"
          >
            Blogs
          </a>

          <a
            href="#contact"
            className="hover:text-blue-400 transition"
          >
            Contact
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-2xl hover:scale-110 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;