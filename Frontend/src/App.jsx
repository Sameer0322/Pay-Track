
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import Layout from "./components/Layout";
import Login from "./pages/Common/Login";
import Register from "./pages/Common/Register";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import DepartmentManagement from "./pages/Employer/DepartmentManagement";
import EmployeeManagement from "./pages/Employer/EmployeeManagement";
import SalaryManagement from "./pages/Employer/SalaryManagement";
import Reports from "./pages/Employer/Reports";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import EmployeeProfile from "./pages/Employee/EmployeeProfile";
import LandingPage from "./pages/Common/LandingPage";

// Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Load user from localStorage on initial render
const loadUser = () => {
  try {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Failed to parse user data from localStorage', error);
    return null;
  }
};

function App() {
  const [user, setUser] = useState(loadUser());

  const login = (userData) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Failed to save user data to localStorage', error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Failed to remove user data from localStorage', error);
    }
  };

  const isEmployer = user?.role === 'employer';
  const isEmployee = user?.role === 'employee';

  return (
    <AuthContext.Provider value={{ user, login, logout, isEmployer, isEmployee }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to={isEmployer ? "/dashboard" : "/employee-dashboard"} />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register /> : <Navigate to={isEmployer ? "/dashboard" : "/employee-dashboard"} />} 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/app" 
              element={user ? <Layout /> : <Navigate to="/login" />}
            >
              {/* Employer Routes */}
              {isEmployer && (
                <>
                  <Route index element={<Navigate to="/app/dashboard" />} />
                  <Route path="dashboard" element={<EmployerDashboard />} />
                  <Route path="departments" element={<DepartmentManagement />} />
                  <Route path="employees" element={<EmployeeManagement />} />
                  <Route path="salary" element={<SalaryManagement />} />
                  <Route path="reports" element={<Reports />} />
                </>
              )}
              
              {/* Employee Routes */}
              {isEmployee && (
                <>
                  <Route index element={<Navigate to="/app/employee-dashboard" />} />
                  <Route path="employee-dashboard" element={<EmployeeDashboard />} />
                  <Route path="profile" element={<EmployeeProfile />} />
                </>
              )}
            </Route>

            {/* Catch all - redirect to appropriate dashboard or login */}
            <Route 
              path="*" 
              element={
                user ? (
                  <Navigate to={isEmployer ? "/app/dashboard" : "/app/employee-dashboard"} />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
