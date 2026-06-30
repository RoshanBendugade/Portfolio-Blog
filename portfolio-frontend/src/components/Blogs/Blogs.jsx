import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import FadeIn from "../ui/FadeIn";

import BlogCard from "./BlogCard";

import blogs from "../../constants/blogs";

function Blogs() {
  return (
    <section
      id="blogs"
      className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <Container>

        <SectionHeading
          subtitle="Blogs"
          title="Latest Articles"
          description="I enjoy sharing my learning journey and technical knowledge through blogs."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog, index) => (
            <FadeIn
              key={blog.id}
              delay={index * 0.15}
            >
              <BlogCard
                image={blog.image}
                title={blog.title}
                description={blog.description}
                category={blog.category}
                date={blog.date}
                link={blog.link}
              />
            </FadeIn>
          ))}

        </div>

      </Container>
    </section>
  );
}

export default Blogs;