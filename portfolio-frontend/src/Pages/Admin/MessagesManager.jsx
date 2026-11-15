
import { useEffect, useState } from "react";
import {
  Mail,
  Trash2,
  RefreshCw,
  Eye,
  X,
  User,
  Calendar,
} from "lucide-react";

import api from "../../services/api";

function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/contact");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content || [];

      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Unable to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/contact/${id}`);

      setMessages((previous) =>
        previous.filter((message) => message.id !== id)
      );

      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      setError("Unable to delete message. Check your backend endpoint.");
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Contact Messages
          </h1>

          <p className="text-gray-500 mt-1">
            View messages submitted through your portfolio.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="bg-white border rounded-xl p-5 mb-6 flex items-center gap-4">
        <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
          <Mail size={25} />
        </div>

        <div>
          <p className="text-gray-500 text-sm">Total Messages</p>
          <h2 className="text-2xl font-bold text-gray-800">
            {messages.length}
          </h2>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
          {error}
        </div>
      )}

      {/* Messages Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">

        <table className="w-full text-left">

          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Message</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-8 text-center">
                  Loading messages...
                </td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No contact messages found.
                </td>
              </tr>
            ) : (
              messages.map((message) => (
                <tr key={message.id} className="border-b hover:bg-gray-50">

                  <td className="p-4 font-medium">
                    {message.name}
                  </td>

                  <td className="p-4">
                    {message.email}
                  </td>

                  <td className="p-4 max-w-xs">
                    <p className="truncate">
                      {message.message}
                    </p>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">

                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="text-blue-600 hover:text-blue-800"
                        title="View message"
                      >
                        <Eye size={19} />
                      </button>

                      <button
                        onClick={() => handleDelete(message.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete message"
                      >
                        <Trash2 size={19} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold text-gray-800">
                Message Details
              </h2>

              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <User className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedMessage.email}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Message</p>
                <p className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

            </div>

            <button
              onClick={() => setSelectedMessage(null)}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default MessagesManager;
