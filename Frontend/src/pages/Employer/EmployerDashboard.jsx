
import { useState } from "react";
import { Users, CreditCard, Clock, CheckCircle, ChevronDown, Filter } from "lucide-react";

const EmployerDashboard = () => {
  const [filters, setFilters] = useState({
    department: "all",
    dateRange: "all"
  });
  const [showDepartmentFilter, setShowDepartmentFilter] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Mock data
  const kpiData = {
    totalEmployees: 145,
    totalDisbursed: 850000,
    pendingConfirmations: 12
  };

  const employees = [
    {
      id: 1,
      name: "John Smith",
      employeeId: "EMP001",
      department: "Engineering",
      totalSalary: 75000,
      salaryDispersed: 75000,
      dateDispersed: "2024-01-15",
      confirmed: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      employeeId: "EMP002",
      department: "Marketing",
      totalSalary: 60000,
      salaryDispersed: 60000,
      dateDispersed: "2024-01-15",
      confirmed: false
    },
    {
      id: 3,
      name: "Mike Davis",
      employeeId: "EMP003",
      department: "HR",
      totalSalary: 55000,
      salaryDispersed: 55000,
      dateDispersed: "2024-01-15",
      confirmed: true
    }
  ];

  const departments = ["All", "Engineering", "Marketing", "HR", "Sales"];
  const dateRanges = ["All", "This Month", "Last Month", "Last 3 Months"];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of payroll management</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{kpiData.totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Disbursed</p>
              <p className="text-2xl font-bold text-gray-900">${kpiData.totalDisbursed.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending Confirmations</p>
              <p className="text-2xl font-bold text-gray-900">{kpiData.pendingConfirmations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Department Filter */}
          <div className="relative flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
            <button
              onClick={() => setShowDepartmentFilter(!showDepartmentFilter)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white text-left flex items-center justify-between"
            >
              <span>{filters.department === "all" ? "All Departments" : filters.department}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            
            {showDepartmentFilter && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => {
                      setFilters({ ...filters, department: dept.toLowerCase() });
                      setShowDepartmentFilter(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Filter */}
          <div className="relative flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white text-left flex items-center justify-between"
            >
              <span>{filters.dateRange === "all" ? "All Time" : filters.dateRange}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            
            {showDateFilter && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setFilters({ ...filters, dateRange: range.toLowerCase() });
                      setShowDateFilter(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Employee Salary Status</h2>
        </div>
        
        {/* Mobile Card View */}
        <div className="lg:hidden">
          {employees.map((employee) => (
            <div key={employee.id} className="p-6 border-b border-gray-200 last:border-b-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    employee.confirmed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.confirmed ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                    {employee.confirmed ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Employee ID:</span>
                    <p className="font-medium">{employee.employeeId}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Department:</span>
                    <p className="font-medium">{employee.department}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Salary:</span>
                    <p className="font-medium">${employee.totalSalary.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <p className="font-medium">{employee.dateDispersed}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Salary Dispersed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Dispersed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{employee.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.employeeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${employee.totalSalary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${employee.salaryDispersed.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.dateDispersed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.confirmed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.confirmed ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                      {employee.confirmed ? 'Confirmed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
