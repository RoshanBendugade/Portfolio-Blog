
import { useState } from "react";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Star,
} from "lucide-react";

import Sidebar from "../../components/Admin/Sidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: "Total Projects",
      value: "0",
      icon: FolderKanban,
      color: "text-blue-500",
    },
    {
      title: "Total Blogs",
      value: "0",
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "Messages",
      value: "0",
      icon: MessageSquare,
      color: "text-orange-500",
    },
    {
      title: "Featured Items",
      value: "0",
      icon: Star,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

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

        <AdminNavbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-6">

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Dashboard Overview
          </h1>

          <p className="text-gray-500 mb-8">
            Welcome to your portfolio administration panel.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {stats.map((stat) => {
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
                        {stat.value}
                      </h2>
                    </div>

                    <Icon
                      size={32}
                      className={stat.color}
                    />

                  </div>
                </div>
              );
            })}

          </div>

          <div className="bg-white rounded-xl p-6 mt-8 shadow-sm border border-gray-200">

            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Welcome to your Admin Dashboard
            </h2>

            <p className="text-gray-600">
              Manage your projects, blogs and contact messages
              from one place.
            </p>

          </div>

        </main>

      </div>
    </div>
  );
}

export default AdminDashboard;
