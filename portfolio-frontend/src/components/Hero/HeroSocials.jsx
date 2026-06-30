import socialLinks from "../../constants/socialLinks";

function HeroSocials() {
  return (
    <div className="flex gap-5 mt-10">

      {socialLinks.map((item) => {
        const Icon = item.icon;

        return (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="text-2xl hover:text-orange-500 transition"
          >
            <Icon />
          </a>
        );
      })}

    </div>
  );
}

export default HeroSocials;