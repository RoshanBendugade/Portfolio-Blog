
import socialLinks from "../../constants/socialLinks";

function HeroSocials() {
  return (
    <div className="mt-9">

      <p className="text-sm text-gray-500
        dark:text-gray-400 mb-4 font-medium">
        Find me on
      </p>

      <div className="flex flex-wrap items-center gap-3">

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
              className="w-11 h-11 rounded-xl
                flex items-center justify-center
                bg-gray-100 dark:bg-slate-800
                text-gray-700 dark:text-gray-200
                border border-gray-200 dark:border-slate-700
                hover:bg-teal-700 hover:text-white
                hover:border-teal-700
                hover:-translate-y-1 transition-all duration-300"
            >
              <Icon size={19} />
            </a>
          );
        })}

      </div>

    </div>
  );
}

export default HeroSocials;
