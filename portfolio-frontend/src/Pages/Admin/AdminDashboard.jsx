
import { useCallback, useEffect, useState } from "react";

import {
  FolderKanban,
  FileText,
  MessageSquare,
  Star,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import Sidebar from "../../components/Admin/Sidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import api from "../../services/api";

const PAGE_SIZE = 100;

async function fetchAllRecords(endpoint) {
  const firstResponse = await api.get(endpoint, {
    params: {
      page: 0,
      size: PAGE_SIZE,
      sort: "id,desc",
    },
  });

  const firstData = Array.isArray(firstResponse.data)
    ? firstResponse.data
    : firstResponse.data?.content || [];

  // Handle APIs returning a normal array
  if (Array.isArray(firstResponse.data)) {
    return firstData;
  }

  const totalPages = firstResponse.data?.totalPages ?? 1;

  // Fetch remaining pages so featured counts are accurate
  const remainingPages = await Promise.all(
    Array.from(
      { length: Math.max(0, totalPages - 1) },
      (_, index) =>
        api.get(endpoint, {
          params: {
            page: index + 1,
            size: PAGE_SIZE,
            sort: "id,desc",
          },
        })
    )
  );

  const remainingData = remainingPages.flatMap((response) =>
    Array.isArray(response.data)
      ? response.data
      : response.data?.content || []
  );

  return [...firstData, ...remainingData];
}

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
    featured: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [projects, blogs, messages] = await Promise.all([
        fetchAllRecords("/projects"),
        fetchAllRecords("/blogs"),
        api.get("/contact", {
          params: {
            page: 0,
            size: 1,
            sort: "id,desc",
          },
        }),
      ]);

      const featuredProjects = projects.filter(
        (project) => project.featured === true
      ).length;

      const featuredBlogs = blogs.filter(
        (blog) => blog.featured === true
      ).length;

      const messageCount = Array.isArray(messages.data)
        ? messages.data.length
        : messages.data?.totalElements ?? 0;

      setStats({
        projects: projects.length,
        blogs: blogs.length,
        messages: messageCount,
        featured: featuredProjects + featuredBlogs,
      });

    } catch (err) {
      console.error("Error fetching dashboard statistics:", err);

      setError(
        "Unable to load dashboard statistics. Please check your backend connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Total Blogs",
      value: stats.blogs,
      icon: FileText,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: MessageSquare,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      title: "Featured Items",
      value: stats.featured,
      icon: Star,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 min-w-0">

        {/* Navbar */}
        <AdminNavbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-6">

          {/* Dashboard Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Dashboard Overview
              </h1>

              <p className="text-gray-500">
                Welcome to your portfolio administration panel.
              </p>
            </div>

            {/* Refresh Statistics */}
            <button
              type="button"
              onClick={fetchDashboardStats}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 border bg-white rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />

              {loading ? "Refreshing..." : "Refresh"}
            </button>

          </div>

          {/* Error State */}
          {error && (
            <div
              role="alert"
              className="flex flex-wrap items-center justify-between gap-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6"
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={20} />

                <p className="text-sm">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchDashboardStats}
                className="font-medium underline"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                >
                  <div className="flex justify-between items-center">

                    <div>
                      <p className="text-gray-500 text-sm">
                        {stat.title}
                      </p>

                      <h2 className="text-3xl font-bold text-gray-800 mt-2">
                        {loading
                          ? "..."
                          : error
                            ? "-"
                            : stat.value.toLocaleString("en-IN")}
                      </h2>
                    </div>

                    <div className={`${stat.bg} p-3 rounded-xl`}>
                      <Icon
                        size={30}
                        className={stat.color}
                      />
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Welcome Section */}
          <div className="bg-white rounded-xl p-6 mt-8 shadow-sm border border-gray-200">

            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Welcome to your Admin Dashboard
            </h2>

            <p className="text-gray-600">
              Manage your projects, blogs and contact messages
              from one place. Your dashboard statistics update
              whenever you refresh the dashboard.
            </p>

          </div>

        </main>

      </div>
    </div>
  );
}

export default AdminDashboard;
