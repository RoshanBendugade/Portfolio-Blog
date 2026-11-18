import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaDownload, FaBars, FaXmark } from "react-icons/fa6";

import { useTheme } from "../../context/ThemeContext";
import navigation from "../../constants/navigation";
import resume from "../../assets/resume/Roshan_Bendugade_Resume.pdf";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  // Highlight the link of the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    navigation.forEach((item) => {
      const el = document.getElementById(item.href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <nav className="mx-auto max-w-6xl">
        <div className="glass flex items-center justify-between gap-4 rounded-2xl px-4 py-2.5">
          <a
            href="#home"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2"
          >
            <span className="text-xl font-extrabold tracking-tight">
              RB<span className="text-accent">.</span>
            </span>
            <span className="hidden text-sm font-medium text-muted xl:block">
              Roshan Bendugade
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="nav-link"
                  data-active={active === item.href}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={resume}
              download="Roshan_Bendugade_Resume.pdf"
              className="btn btn-primary btn-sm hidden sm:inline-flex"
            >
              <FaDownload size={12} />
              Resume
            </a>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="icon-btn"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="icon-btn lg:hidden"
            >
              {menuOpen ? <FaXmark /> : <FaBars />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="glass mt-2 rounded-2xl p-3 lg:hidden">
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="nav-link block"
                    data-active={active === item.href}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={resume}
              download="Roshan_Bendugade_Resume.pdf"
              className="btn btn-primary mt-3 w-full sm:hidden"
            >
              <FaDownload size={12} />
              Download resume
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;