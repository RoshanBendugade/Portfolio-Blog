
import { Menu, Bell, UserCircle } from "lucide-react";

function AdminNavbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open sidebar"
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
        >
          <Menu size={23} />
        </button>

        <h2 className="truncate text-base font-semibold text-gray-800 sm:text-lg">
          Admin Dashboard
        </h2>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-orange-500"
        >
          <Bell size={21} />
        </button>

        <div className="flex items-center gap-2 text-gray-700">
          <UserCircle size={24} />
          <span className="hidden text-sm font-medium sm:inline">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
