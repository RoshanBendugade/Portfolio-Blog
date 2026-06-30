import navigation from "../../constants/navigation";

function NavLinks() {
  return (
    <ul className="hidden md:flex items-center gap-8">
      {navigation.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            className="text-gray-700 dark:text-gray-300 hover:text-orange-500 transition duration-300 font-medium"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default NavLinks;