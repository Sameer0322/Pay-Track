
import { useAuth } from "../App";
import { Menu, Bell } from "lucide-react";

const MobileNav = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="ml-3 text-xl font-bold text-primary">Pay Track Pro</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
