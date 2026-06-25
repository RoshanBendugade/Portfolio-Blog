import { useState } from "react";
import api from "../services/api";

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    await api.post("/contact", {
      name,
      email,
      message,
    });

    alert("Message Sent!");

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Contact Me
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-xl"
      >

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          rows="5"
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Send Message
        </button>

      </form>
    </div>
  );
}

export default Contact;