
import { useCallback, useEffect, useState } from "react";

import {
  Mail,
  Trash2,
  RefreshCw,
  Eye,
  X,
  User,
  Inbox,
} from "lucide-react";

import api from "../../services/api";
import PaginationControls from "../../components/ui/PaginationControls";
import AdminTableState from "../../components/ui/AdminTableState";

function MessagesManager() {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Pagination and sorting state
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("id,desc");

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError("");

      const response = await api.get("/contact", {
        params: {
          page,
          size,
          sort,
        },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.content || [];

      setMessages(data);

      setTotalPages(
        response.data?.totalPages ?? (data.length > 0 ? 1 : 0)
      );

      setTotalElements(
        response.data?.totalElements ?? data.length
      );

    } catch (err) {
      console.error("Error fetching messages:", err);

      setLoadError(
        "Unable to load messages. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [page, size, sort]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Delete message
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      await api.delete(`/contact/${id}`);

      // Close modal if deleted message is selected
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }

      // Move to previous page if the last message is deleted
      if (messages.length === 1 && page > 0) {
        setPage((previous) => previous - 1);
      } else {
        await fetchMessages();
      }

    } catch (err) {
      console.error("Error deleting message:", err);

      setError(
        "Unable to delete message. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Change page size
  const handleSizeChange = (newSize) => {
    setSize(newSize);
    setPage(0);
  };

  // Change sorting
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(0);
  };

  return (
    <div className="p-6">

      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Contact Messages
          </h1>

          <p className="text-gray-500 mt-1">
            View messages submitted through your portfolio.
          </p>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={fetchMessages}
          disabled={loading}
          className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw
            size={18}
            className={loading ? "animate-spin" : ""}
          />

          {loading ? "Refreshing..." : "Refresh"}
        </button>

      </div>

      {/* Message Statistics */}
      <div className="bg-white border rounded-xl p-5 mb-6 flex items-center gap-4">

        <div className="bg-orange-100 text-orange-600 p-3 rounded-lg">
          <Mail size={25} />
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Total Messages
          </p>

          <h2 className="text-2xl font-bold text-gray-800">
            {totalElements}
          </h2>
        </div>

      </div>

      {/* Delete Error Message */}
      {error && (
        <div
          role="alert"
          className="bg-red-100 text-red-700 p-3 rounded-lg mb-5"
        >
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
              <th className="p-4">Subject</th>
              <th className="p-4">Message</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {/* Loading, Error and Empty States */}
            <AdminTableState
              loading={loading}
              error={loadError}
              isEmpty={messages.length === 0}
              onRetry={fetchMessages}
              columns={5}
              EmptyIcon={Inbox}
              emptyTitle="Your Inbox Is Empty"
              emptyDescription="You haven't received any contact messages yet. Messages submitted through your portfolio will appear here."
            />

            {/* Message Rows */}
            {!loading &&
              !loadError &&
              messages.map((message) => (
                <tr
                  key={message.id}
                  className="border-b hover:bg-gray-50"
                >

                  {/* Name */}
                  <td className="p-4 font-medium">
                    {message.name}
                  </td>

                  {/* Email */}
                  <td className="p-4">
                    {message.email}
                  </td>

                  {/* Subject */}
                  <td className="p-4">
                    {message.subject || "-"}
                  </td>

                  {/* Message Preview */}
                  <td className="p-4 max-w-xs">
                    <p className="truncate">
                      {message.message}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex gap-3">

                      {/* View Message */}
                      <button
                        type="button"
                        onClick={() => setSelectedMessage(message)}
                        disabled={deletingId !== null}
                        className="text-blue-600 hover:text-blue-800 disabled:opacity-40"
                        title="View message"
                      >
                        <Eye size={19} />
                      </button>

                      {/* Delete Message */}
                      <button
                        type="button"
                        onClick={() => handleDelete(message.id)}
                        disabled={deletingId !== null}
                        className="text-red-600 hover:text-red-800 disabled:opacity-40"
                        title="Delete message"
                      >
                        {deletingId === message.id ? (
                          <RefreshCw
                            size={19}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={19} />
                        )}
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

          </tbody>
        </table>
      </div>

      {/* Pagination and Sorting */}
      <PaginationControls
        page={page}
        totalPages={totalPages}
        totalElements={totalElements}
        size={size}
        sort={sort}
        onPageChange={setPage}
        onSizeChange={handleSizeChange}
        onSortChange={handleSortChange}
        sortOptions={[
          { value: "id,desc", label: "Newest first" },
          { value: "id,asc", label: "Oldest first" },
        ]}
      />

      {/* Message Details Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold text-gray-800">
                Message Details
              </h2>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={22} />
              </button>

            </div>

            <div className="space-y-4">

              {/* Name */}
              <div className="flex items-center gap-3">

                <User className="text-orange-500" />

                <div>
                  <p className="text-sm text-gray-500">
                    Name
                  </p>

                  <p className="font-medium">
                    {selectedMessage.name}
                  </p>
                </div>

              </div>

              {/* Email */}
              <div className="flex items-center gap-3">

                <Mail className="text-orange-500" />

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="font-medium break-all">
                    {selectedMessage.email}
                  </p>
                </div>

              </div>

              {/* Subject */}
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Subject
                </p>

                <p className="font-medium">
                  {selectedMessage.subject || "-"}
                </p>
              </div>

              {/* Message */}
              <div>
                <p className="text-sm text-gray-500 mb-2">
                  Message
                </p>

                <p className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap break-words">
                  {selectedMessage.message}
                </p>
              </div>

            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors"
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
