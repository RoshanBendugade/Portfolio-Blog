function Home() {
  return (
    <div>

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center items-center">

        <h1 className="text-6xl font-bold">
          Hi, I'm Roshan 👋
        </h1>

        <p className="text-xl mt-4">
          Java Full Stack Developer
        </p>

        <p className="mt-2">
          React • Spring Boot • MySQL
        </p>

        <button
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg"
        >
          View Projects
        </button>

      </div>

      {/* About Section */}
      <section className="max-w-4xl mx-auto p-10">
        <h2 className="text-3xl font-bold mb-4">
          About Me
        </h2>

        <p>
          I am an IT student passionate about
          Java, Spring Boot, React, and Full
          Stack Development.
        </p>
      </section>

      {/* Skills Section */}
      <section className="p-10">
        <h2 className="text-3xl font-bold">
          Skills
        </h2>

        <div className="flex gap-4 mt-4">
          <div className="border p-4 rounded">
            Java
          </div>

          <div className="border p-4 rounded">
            Spring Boot
          </div>

          <div className="border p-4 rounded">
            React
          </div>

          <div className="border p-4 rounded">
            MySQL
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;