
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  LogOut,
  X,
} from "lucide-react";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Projects", path: "/admin/projects", icon: FolderKanban },
    { name: "Blogs", path: "/admin/blogs", icon: FileText },
    { name: "Messages", path: "/admin/messages", icon: MessageSquare },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col bg-slate-900 text-white shadow-xl transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:sticky lg:top-0 lg:translate-x-0`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-slate-700 p-5 sm:p-6">
        <h2 className="text-xl font-bold text-orange-500">
          Roshan Admin
        </h2>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
        >
          <X size={22} />
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg p-3 transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} className="shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-slate-700 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-red-400 transition hover:bg-slate-800"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
