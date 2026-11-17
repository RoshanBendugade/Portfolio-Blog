import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 grid h-11 w-11 place-items-center rounded-full bg-[var(--fill)] text-white shadow-lg transition-colors hover:bg-[var(--fill-hover)]"
    >
      <FaArrowUp size={14} />
    </button>
  );
}

export default BackToTop;