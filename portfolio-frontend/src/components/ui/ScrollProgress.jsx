import { useEffect, useState } from "react";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent">
      <div
        className="h-full bg-[var(--fill)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ScrollProgress;