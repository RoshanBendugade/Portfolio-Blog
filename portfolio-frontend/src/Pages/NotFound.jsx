import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

function NotFound() {
  useEffect(() => {
    document.title = "Page not found | Roshan Bendugade";
  }, []);

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="bento w-full max-w-md p-10 text-center">
        <p className="text-6xl font-extrabold tracking-tight text-accent">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>

        <p className="mt-2 text-muted">
          The page you're looking for doesn't exist or has moved.
        </p>

        <Link to="/" className="btn btn-primary mt-8">
          <FaArrowLeft size={13} />
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}

export default NotFound;