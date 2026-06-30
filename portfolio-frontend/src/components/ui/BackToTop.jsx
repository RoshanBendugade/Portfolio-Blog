import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function BackToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed
        bottom-8
        right-8
        z-50
        w-14
        h-14
        rounded-full
        bg-orange-500
        hover:bg-orange-600
        text-white
        shadow-xl
        transition-all
        duration-300
        hover:scale-110
      "
    >
      <FaArrowUp className="mx-auto" />
    </button>
  );
}

export default BackToTop;