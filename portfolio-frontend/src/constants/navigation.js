import experience from "./experience";

const navigation = [
  { id: 1, title: "Home", href: "#home" },
  { id: 2, title: "About", href: "#about" },
  { id: 3, title: "Skills", href: "#skills" },

  // Only shown once you add entries in constants/experience.js
  ...(experience.length > 0
    ? [{ id: 7, title: "Journey", href: "#journey" }]
    : []),

  { id: 4, title: "Projects", href: "#projects" },
  { id: 5, title: "Blogs", href: "#blogs" },
  { id: 6, title: "Contact", href: "#contact" },
];

export default navigation;