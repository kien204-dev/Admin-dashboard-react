import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static
          top-0 left-0
          min-h-screen w-64 
          bg-gray-900 text-white p-5
          overflow-y-auto
          transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300
          z-50
        `}
      >
        <button
          className="md:hidden mb-4 text-xl"
          onClick={() => setSidebarOpen(false)}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${
                  isActive ? "bg-indigo-600" : "hover:bg-gray-700"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
           <li>
    <NavLink
      to="/users"
      onClick={() => setSidebarOpen(false)}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg transition ${
          isActive ? "bg-indigo-600" : "hover:bg-gray-700"
        }`
      }
    >
      Users
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/orders"
      onClick={() => setSidebarOpen(false)}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg transition ${
          isActive ? "bg-indigo-600" : "hover:bg-gray-700"
        }`
      }
    >
      Orders
    </NavLink>
  </li>

  <li>
    <NavLink
      to="/settings"
      onClick={() => setSidebarOpen(false)}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg transition ${
          isActive ? "bg-indigo-600" : "hover:bg-gray-700"
        }`
      }
    >
      Settings
    </NavLink>
  </li>

        </ul>
      </div>
    </>
  );
}

export default Sidebar;