import navigation from "../../constants/navigation";
import socialLinks from "../../constants/socialLinks";

function Footer() {
  return (
    <footer className="px-4 pb-8 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 border-t border-line pt-6 text-sm md:flex-row">

        <div className="flex items-center gap-3">
          <a href="#home" className="text-lg font-extrabold tracking-tight">
            RB<span className="text-accent">.</span>
          </a>
          <p className="text-muted">
            &copy; {new Date().getFullYear()} Roshan Bendugade
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {navigation.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="text-muted transition-colors hover:text-[var(--accent)]"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                title={item.name}
                className="icon-btn"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>

      </div>
    </footer>
  );
}

export default Footer;