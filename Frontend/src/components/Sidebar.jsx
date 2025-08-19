import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { 
  Home, 
  Users, 
  Building, 
  CreditCard, 
  FileText, 
  LogOut,
  User,
  X
} from "lucide-react";

const Sidebar = ({ mobile, onClose }) => {
  const { user, logout, isEmployer } = useAuth();

  const employerNavItems = [
    { name: "Dashboard", href: "/app/dashboard", icon: Home },
    { name: "Employees", href: "/app/employees", icon: Users },
    { name: "Departments", href: "/app/departments", icon: Building },
    { name: "Salary Management", href: "/app/salary", icon: CreditCard },
    { name: "Reports", href: "/app/reports", icon: FileText },
  ];

  const employeeNavItems = [
    { name: "Dashboard", href: "/app/employee-dashboard", icon: Home },
    { name: "Profile", href: "/app/profile", icon: User },
  ];

  const navItems = isEmployer ? employerNavItems : employeeNavItems;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (mobile && onClose) onClose();
  };

  return (
    <div className="flex flex-col w-64 bg-primary text-white h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-secondary">
        <div>
          <h1 className="text-xl font-bold">Pay Track</h1>
          <p className="text-sm text-gray-300 capitalize">{user?.role}</p>
        </div>
        {mobile && (
          <button onClick={onClose} className="lg:hidden">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={mobile ? onClose : undefined}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "text-gray-300 hover:bg-accent/80 hover:text-white"
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-secondary">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          
          <div className="ml-3">
            <p className="text-sm font-medium">{user?.name || 'User'}</p>
            {user?.role === 'employer' && user?.employerId && (
              <p className="text-xs text-gray-400 mt-0.5">
                Employer ID: <span className="font-mono">{user.employerId}</span>
                <br />
                Organization: <span className="font-mono">{user.organization}</span>
              </p>
            )}
            {user?.role === 'employee' && user?.employeeId && (
              <p className="text-xs text-gray-400 mt-0.5">
                Employee ID: <span className="font-mono">{user.employeeId}</span>
              </p>
            )}
            <p className="text-xs text-gray-300">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-accent/80 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
