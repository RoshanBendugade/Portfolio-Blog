import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import ContactForm from "./ContactForm";

function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-gray-100 dark:bg-[#111827] transition-colors duration-300"
    >
      <Container>
        <SectionHeading
          subtitle="Contact"
          title="Let's Work Together"
          description="Feel free to contact me for internships, freelance work, or collaboration."
        />

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left */}

          <div className="space-y-6">

            <Card>

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <FaEnvelope className="text-orange-500 text-xl" />
                </div>

                <div>
                  <h3 className="font-bold text-lg dark:text-white">
                    Email
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400">
                    roshan@example.com
                  </p>
                </div>

              </div>

            </Card>

            <Card>

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <FaPhoneAlt className="text-orange-500 text-xl" />
                </div>

                <div>
                  <h3 className="font-bold text-lg dark:text-white">
                    Phone
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400">
                    +91 XXXXX XXXXX
                  </p>
                </div>

              </div>

            </Card>

            <Card>

              <div className="flex items-center gap-5">

                <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-orange-500 text-xl" />
                </div>

                <div>
                  <h3 className="font-bold text-lg dark:text-white">
                    Location
                  </h3>

                  <p className="text-gray-500 dark:text-gray-400">
                    Raigad, Maharashtra, India
                  </p>
                </div>

              </div>

            </Card>

            {/* Social */}

            <div className="flex gap-4 mt-8">

              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-slate-900 hover:bg-orange-500 flex justify-center items-center transition"
              >
                <FaGithub className="text-white text-xl" />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-blue-700 hover:bg-orange-500 flex justify-center items-center transition"
              >
                <FaLinkedin className="text-white text-xl" />
              </a>

            </div>

          </div>

          {/* Right */}

          <ContactForm />

        </div>

      </Container>
    </section>
  );
}

export default Contact;