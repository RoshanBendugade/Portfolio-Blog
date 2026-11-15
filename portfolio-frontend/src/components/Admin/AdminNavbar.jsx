
import { Menu, Bell, UserCircle } from "lucide-react";

function AdminNavbar({ onMenuClick }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-700"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-lg font-semibold text-gray-800">
          Admin Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-gray-600 hover:text-orange-500">
          <Bell size={21} />
        </button>

        <div className="flex items-center gap-2 text-gray-700">
          <UserCircle size={25} />
          <span className="font-medium">Admin</span>
        </div>
      </div>

    </header>
  );
}

export default AdminNavbar;
