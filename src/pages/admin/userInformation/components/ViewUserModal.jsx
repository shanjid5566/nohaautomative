import React from 'react';

const ViewUserModal = ({ isOpen, user, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-xl font-semibold text-gray-800">View User Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">User Name</label>
            <p className="text-gray-900 text-base">{user.name}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <p className="text-gray-900 text-base">{user.phone}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <p className="text-gray-900 text-base">{user.email}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Joined Date</label>
            <p className="text-gray-900 text-base">{user.joinedDate}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
            <p className="text-gray-900 text-base">{user.address}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
