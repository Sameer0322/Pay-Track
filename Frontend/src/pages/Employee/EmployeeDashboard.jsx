
import { useState } from "react";
import { DollarSign, Calendar, CheckCircle, Clock, Eye } from "lucide-react";

const EmployeeDashboard = () => {
  const [salaryData] = useState({
    fixedSalary: 75000,
    extraAmount: 5000,
    deductions: 2000,
    totalSalary: 78000,
    paymentDate: "2024-01-15",
    paymentStatus: "Paid",
    confirmationStatus: "Pending"
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const confirmReceived = () => {
    setShowConfirmModal(false);
    alert("Salary receipt confirmed successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600 mt-1">View your salary information and status</p>
      </div>

      {/* Salary Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Fixed Salary</p>
              <p className="text-xl font-bold text-gray-900">${salaryData.fixedSalary.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Extra Amount</p>
              <p className="text-xl font-bold text-gray-900">${salaryData.extraAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Deductions</p>
              <p className="text-xl font-bold text-gray-900">${salaryData.deductions.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Salary</p>
              <p className="text-xl font-bold text-accent">${salaryData.totalSalary.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Salary Details</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Salary Breakdown */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900">Salary Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Fixed Salary</span>
                  <span className="text-sm font-medium text-gray-900">${salaryData.fixedSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Extra Amount</span>
                  <span className="text-sm font-medium text-green-600">+${salaryData.extraAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Deductions</span>
                  <span className="text-sm font-medium text-red-600">-${salaryData.deductions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 pt-3 border-t-2 border-gray-200">
                  <span className="text-md font-semibold text-gray-900">Total Salary</span>
                  <span className="text-md font-bold text-accent">${salaryData.totalSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900">Payment Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Payment Date</p>
                    <p className="text-sm font-medium text-gray-900">{salaryData.paymentDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {salaryData.paymentStatus}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {salaryData.confirmationStatus === "Pending" ? (
                    <Clock className="w-5 h-5 text-orange-500" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Confirmation Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      salaryData.confirmationStatus === "Pending" 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {salaryData.confirmationStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <h3 className="text-md font-semibold text-gray-900">Actions</h3>
              <div className="space-y-3">
                {salaryData.confirmationStatus === "Pending" && (
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="w-full bg-accent text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Confirm Received
                  </button>
                )}
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Eye className="w-5 h-5 mr-2" />
                  View Pay Slip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Salary Processed</p>
                <p className="text-sm text-gray-600">Your salary for January 2024 has been processed</p>
              </div>
              <span className="text-sm text-gray-500">Jan 15, 2024</span>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Payroll Schedule Updated</p>
                <p className="text-sm text-gray-600">Next payroll date: February 15, 2024</p>
              </div>
              <span className="text-sm text-gray-500">Jan 10, 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Confirm Salary Receipt
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Please confirm that you have received your salary payment of ${salaryData.totalSalary.toLocaleString()} for the month.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReceived}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
