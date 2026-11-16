
import { useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import api from "../../services/api";

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setSuccess("");
      setError("");

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      await api.post("/contact", payload);

      setSuccess("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
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
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full p-4 rounded-xl border dark:bg-slate-900 dark:border-slate-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isSubmitting}
          className="w-full p-4 rounded-xl border dark:bg-slate-900 dark:border-slate-700"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          maxLength={200}
          disabled={isSubmitting}
          className="w-full p-4 rounded-xl border dark:bg-slate-900 dark:border-slate-700"
        />

        <textarea
          rows="6"
          name="message"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          required
          maxLength={1000}
          disabled={isSubmitting}
          className="w-full p-4 rounded-xl border resize-none dark:bg-slate-900 dark:border-slate-700"
        />

        {success && (
          <p className="text-green-600 text-sm font-medium">
            {success}
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm font-medium">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>

      </form>
    </Card>
  );
}

export default ContactForm;
