function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-slate-900 text-white shadow-lg z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

        <h1 className="text-2xl font-bold">
          Roshan Portfolio
        </h1>

        <div className="flex gap-8">

          <a href="#home">Home</a>

          <a href="#about">About</a>

          <a href="#skills">Skills</a>

          <a href="#projects">Projects</a>

          <a href="#blogs">Blogs</a>

          <a href="#contact">Contact</a>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;