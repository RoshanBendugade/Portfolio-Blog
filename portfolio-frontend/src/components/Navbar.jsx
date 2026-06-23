import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Link to="/">Home</Link>{" "}
      |{" "}
      <Link to="/projects">Projects</Link>{" "}
      |{" "}
      <Link to="/blogs">Blogs</Link>
    </nav>
  );
}

export default Navbar;