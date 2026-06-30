import { useState } from "react";

import Card from "../ui/Card";
import Button from "../ui/Button";

function ContactForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    alert("Message Sent Successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

  };

  return (
    <Card>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl border dark:bg-slate-900 dark:border-slate-700"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl border dark:bg-slate-900 dark:border-slate-700"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl border dark:bg-slate-900 dark:border-slate-700"
        />

        <textarea
          rows="6"
          name="message"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-4 rounded-xl border resize-none dark:bg-slate-900 dark:border-slate-700"
        />

        <Button type="submit">
          Send Message
        </Button>

      </form>

    </Card>
  );
}

export default ContactForm;