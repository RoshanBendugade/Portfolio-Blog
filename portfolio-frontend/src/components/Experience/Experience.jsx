import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import experience from "../../constants/experience";

function Experience() {
  if (experience.length === 0) return null;

  return (
    <section id="journey" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Journey"
          title="Education & experience"
          description="Where I've studied, worked and what I've learned along the way."
        />

        <ol className="relative max-w-3xl space-y-4 border-l border-line pl-6 sm:pl-8">
          {experience.map((item, index) => (
            <li key={item.id} className="relative">
              <span className="absolute -left-[30px] top-7 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] sm:-left-[38px]" />

              <FadeIn delay={Math.min(index, 3) * 0.08}>
                <div className="bento p-5 sm:p-6">
                  <p className="text-sm font-semibold text-accent">
                    {item.period}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  {item.place && <p className="text-muted">{item.place}</p>}

                  {item.description && (
                    <p className="mt-3 leading-7 text-muted">
                      {item.description}
                    </p>
                  )}

                  {item.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="chip !px-2.5 !py-0.5 !text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Experience;