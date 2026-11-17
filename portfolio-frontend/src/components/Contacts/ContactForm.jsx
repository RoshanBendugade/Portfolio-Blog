import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

import api from "../../services/api";

const inputStyle =
  "w-full rounded-xl border border-line bg-[var(--bg)] px-4 py-3 outline-none " +
  "placeholder:text-[var(--muted)] focus:border-[var(--accent)] " +
  "focus:ring-2 focus:ring-[var(--accent)]/20 transition-colors " +
  "disabled:cursor-not-allowed disabled:opacity-60";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setSuccess("");
    setError("");
  };

  // Submit message to Spring Boot backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setSuccess("");
      setError("");

      await api.post("/contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setSuccess("Your message has been sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form submission failed:", err);

      setError(
        err.response?.data?.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bento h-full p-6 sm:p-8">
      <h3 className="text-2xl font-bold tracking-tight">Send a message</h3>

      <p className="mt-2 text-muted">
        Fill out the form and I&rsquo;ll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold">
              Your name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              autoComplete="name"
              className={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold">
              Email address
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              autoComplete="email"
              className={inputStyle}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-2 block text-sm font-semibold">
            Subject
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            placeholder="What would you like to discuss?"
            value={formData.subject}
            onChange={handleChange}
            required
            maxLength={200}
            disabled={isSubmitting}
            className={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold">
            Your message
          </label>
          <textarea
            id="contact-message"
            rows={6}
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={1000}
            disabled={isSubmitting}
            className={`${inputStyle} resize-none`}
          />
          <p className="mt-2 text-right text-xs text-muted">
            {formData.message.length}/1000
          </p>
        </div>

        {success && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-300"
          >
            {success}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaPaperPlane size={14} />
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;