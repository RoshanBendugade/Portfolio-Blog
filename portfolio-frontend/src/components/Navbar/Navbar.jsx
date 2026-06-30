import { FaMoon, FaSun, FaDownload } from "react-icons/fa";

import { useTheme } from "../../context/ThemeContext";

import NavLinks from "./NavLinks";
import Button from "../ui/Button";
import Container from "../ui/Container";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <Container>
        <nav className="mt-5 flex items-center justify-between rounded-2xl border border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg px-6 py-4 shadow-lg">
          <a
            href="#home"
            className="text-2xl font-bold text-orange-500"
          >
            Roshan.
          </a>

          <NavLinks />

          <div className="flex items-center gap-4">
            <a href="/resume.pdf">
              <Button>
                <FaDownload />
                <span className="ml-2">Resume</span>
              </Button>
            </a>

            <button
              onClick={toggleTheme}
              className="text-2xl text-orange-500"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;