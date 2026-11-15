
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
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0 lg:static`}
    >
      <div className="flex justify-between items-center p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold text-orange-500">
          Roshan Admin
        </h2>

        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden"
        >
          <X size={22} />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full rounded-lg text-red-400 hover:bg-slate-800"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
