import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

import socialLinks from "../../constants/socialLinks";
import FadeIn from "../ui/FadeIn";
import SectionHeading from "../ui/SectionHeading";
import ContactForm from "./ContactForm";

// Edit your real details here
const contactInfo = [
  { icon: FaEnvelope, label: "Email", value: "roshan@example.com" },
  { icon: FaPhoneAlt, label: "Phone", value: "+91 XXXXX XXXXX" },
  { icon: FaMapMarkerAlt, label: "Location", value: "Raigad, Maharashtra, India" },
];

function Contact() {
  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's work together"
          description="Have a project idea, an internship opportunity, or just want to connect? I'd love to hear from you."
        />

        <div className="grid gap-4 lg:grid-cols-5">

          <FadeIn className="lg:col-span-2">
            <div className="bento-soft flex h-full flex-col p-6 sm:p-8">
              <ul className="space-y-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.label} className="flex items-center gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--card)] text-accent">
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm text-muted">{item.label}</p>
                        <p className="break-all font-medium">{item.value}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-8">
                <p className="mb-3 text-sm font-semibold text-muted">
                  Find me online
                </p>

                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                        title={item.name}
                        className="icon-btn"
                      >
                        <Icon size={17} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

export default Contact;