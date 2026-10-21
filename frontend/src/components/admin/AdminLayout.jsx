import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  GraduationCap,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { portfolioApi, useLogoutMutation } from "../../services/portfolioApi";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Projects",
    path: "/admin/projects",
    icon: FolderKanban,
  },
  {
    name: "Skills",
    path: "/admin/skills",
    icon: Code2,
  },
  {
    name: "Journey",
    path: "/admin/journey",
    icon: GraduationCap,
  },
];

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
  try {
    await logout().unwrap();

    dispatch(portfolioApi.util.resetApiState());

    navigate("/admin/login", { replace: true });
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <div className="min-h-screen bg-[#09090b] text-white md:flex">
      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-[#27272a]">
        <span className="font-bold text-lg">
          Muneeb<span className="text-[#D4B783]">.Admin</span>
        </span>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          className="p-2 rounded-lg hover:bg-[#27272a]"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex md:flex-col w-full md:w-64 md:min-h-screen shrink-0 border-r border-[#27272a] bg-[#111114]`}
      >
        <div className="hidden md:block p-6 border-b border-[#27272a]">
          <h1 className="text-xl font-bold">
            Muneeb<span className="text-[#D4B783]">.Admin</span>
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            Portfolio management
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <p className="text-xs uppercase tracking-widest text-gray-500 px-3 py-2">
            Workspace
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-[#242220] text-[#D4B783] border border-[#D4B783]/30"
                      : "text-gray-400 hover:text-white hover:bg-[#1c1c20]"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#27272a]">
         
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoading}
          className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-sm text-gray-400 hover:text-[#E84A4A] hover:bg-[#1c1c20] transition-colors disabled:opacity-50"
        >
          <LogOut size={19} />
          {isLoading ? "Signing out..." : "Logout"}
        </button>

        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-5 md:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
