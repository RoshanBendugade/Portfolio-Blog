import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";

import Container from "../ui/Container";
import navigation from "../../constants/navigation";
import socialLinks from "../../constants/socialLinks";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-950 text-gray-300">

      <Container>

        <div className="grid md:grid-cols-3 gap-12 py-16">

          {/* Left */}

          <div>

            <h2 className="text-3xl font-bold text-white">
              Roshan
              <span className="text-orange-500">.</span>
            </h2>

            <p className="mt-5 leading-8 text-gray-400">
              Passionate Java Full Stack Developer focused on building
              scalable, responsive and modern web applications using
              Spring Boot, React and MySQL.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="hover:text-orange-500 transition"
                  >
                    {item.name}
                  </a>
                </li>
              ))}

            </ul>

          </div>

          {/* Social */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-6">
              Connect
            </h3>

            <div className="flex gap-4">

              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-slate-800 hover:bg-orange-500 transition flex items-center justify-center"
                  >
                    <Icon className="text-white text-xl" />
                  </a>
                );
              })}

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-800 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-center">
            © {new Date().getFullYear()} Roshan Bendugade. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 transition flex items-center justify-center"
          >
            <FaArrowUp className="text-white" />
          </button>

        </div>

      </Container>

    </footer>
  );
}

export default Footer;