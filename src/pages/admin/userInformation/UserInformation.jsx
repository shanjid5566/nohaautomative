import React, { useState, useEffect } from 'react';
import { Eye, Pencil, MoreVertical } from 'lucide-react';
import ViewUserModal from './components/ViewUserModal';
import EditUserModal from './components/EditUserModal';

const USERS_DATA = [
  { id: 1, name: 'Kristin Watson', phone: '(307) 555-0133', email: 'jackson.graham@example.com', joinedDate: '01 January 2019', address: '6391 Elgin St. Celina, Delaware 10299' },
  { id: 2, name: 'Ralph Edwards', phone: '(205) 555-0100', email: 'alma.lawson@example.com', joinedDate: '03 February 2018', address: '3517 W. Gray St. Utica, Pennsylvania 57867' },
  { id: 3, name: 'Albert Flores', phone: '(702) 555-0122', email: 'georgia.young@example.com', joinedDate: '22 March 2020', address: '3891 Ranchview Dr. Richardson, California 62639' },
  { id: 4, name: 'Guy Hawkins', phone: '(207) 555-0119', email: 'kenzi.lawson@example.com', joinedDate: '24 April 2016', address: '2118 Thornridge Cir. Syracuse, Connecticut 35624' },
  { id: 5, name: 'Jane Cooper', phone: '(907) 555-0101', email: 'bill.sanders@example.com', joinedDate: '1 May 2019', address: '4517 Washington Ave. Manchester, Kentucky 39495' },
  { id: 6, name: 'Dianne Russell', phone: '(201) 555-0124', email: 'michelle.rivera@example.com', joinedDate: '08 June 2015', address: '4517 Washington Ave. Manchester, Kentucky 39495' },
  { id: 7, name: 'Theresa Webb', phone: '(629) 555-0129', email: 'sara.cruz@example.com', joinedDate: '30 July 2021', address: '2715 Ash Dr. San Jose, South Dakota 83475' },
  { id: 8, name: 'Marvin McKinney', phone: '(303) 555-0105', email: 'nathan.roberts@example.com', joinedDate: '05 August 2015', address: '8502 Preston Rd. Inglewood, Maine 98380' },
  { id: 9, name: 'Ronald Richards', phone: '(406) 555-0120', email: 'curtis.weaver@example.com', joinedDate: '17 september 2022', address: '2464 Royal Ln. Mesa, New Jersey 45463' },
  { id: 10, name: 'Leslie Alexander', phone: '(225) 555-0118', email: 'michael.mitch@example.com', joinedDate: '09 October 2010', address: '09 October 2010' },
];

const UserInformation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuDirection, setMenuDirection] = useState('down');
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const pageSize = 7;

  // Reset pagination if needed
  React.useEffect(() => {
    setCurrentPage(1);
  }, []);

  // Calculate pagination
  const totalItems = USERS_DATA.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = USERS_DATA.slice(startIndex, endIndex) || [];

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle menu click
  const handleMenuClick = (userId, event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const itemIndex = paginatedData.findIndex((item) => item.id === userId);
    const totalItems = paginatedData.length;
    
    if (totalItems <= 6) {
      setMenuDirection('down');
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.right - 160,
      });
    } else {
      // If more than 6 items: last 2 items open up, others open down
      if (itemIndex >= totalItems - 2) {
        setMenuDirection('up');
        setMenuPosition({
          top: rect.top,
          left: rect.right - 160,
        });
      } else {
        setMenuDirection('down');
        setMenuPosition({
          top: rect.bottom + 8,
          left: rect.right - 160,
        });
      }
    }
    
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-menu-container]')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle View button click
  const handleViewClick = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
    setOpenMenuId(null);
  };

  // Handle Edit button click
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
    setOpenMenuId(null);
  };

  // Handle Save User
  const handleSaveUser = (userId, formData) => {
    console.log('User updated:', { id: userId, ...formData });
    // TODO: Add API call to update user data
  };

  return (
    <div className="space-y-4 bg-[#F9FAFB]">
      {/* Floating Menu */}
      {openMenuId && (
        <div
          className="fixed w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          style={{
            top: menuDirection === 'up' ? `${menuPosition.top - 100}px` : `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
          data-menu-container
        >
          {paginatedData.map((item) => (
            item.id === openMenuId && (
              <div key={item.id}>
                <button 
                  onClick={() => handleViewClick(item)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  <Eye size={16} />
                  View
                </button>
                <button 
                  onClick={() => handleEditClick(item)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              </div>
            )
          ))}
        </div>
      )}

      {/* Main Card Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header / Title */}
        <div className="px-4 md:px-8 py-6">
          <h2 className="text-2xl font-semibold text-gray-800">User List</h2>
        </div>

        {/* Table Content - Hidden on Mobile, Visible on MD+ */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-gray-200 text-gray-400 text-sm bg-[#F9FAFB] uppercase tracking-wider">
                <th className="ppx-4 md:px-8 py-4 text-black text-base font-normal">Name</th>
                <th className="px-8 py-4 text-black text-base font-normal">Phone Number</th>
                <th className="px-8 py-4 text-black text-base font-normal">User Email</th>
                <th className="px-8 py-4 text-black text-base font-normal">Joined Date</th>
                <th className="px-8 py-4 text-black text-base font-normal">Address</th>
                <th className="px-8 py-4 text-black text-base font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5 text-sm text-gray-700 leading-relaxed font-medium">
                    {item.name}
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-600">
                    {item.phone}
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-600 break-all max-w-50">
                    {item.email}
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500">
                    {item.joinedDate}
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500 max-w-62.5">
                    {item.address}
                  </td>
                  <td className="px-8 md:px-12 py-5 text-right">
                    <div className="relative inline-block" data-menu-container>
                      <button
                        onClick={(e) => handleMenuClick(item.id, e)}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <MoreVertical size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card View - Visible on Mobile, Hidden on MD+ */}
        <div className="md:hidden px-4 py-6 space-y-4">
          {paginatedData.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                <div className="relative" data-menu-container>
                  <button
                    onClick={(e) => handleMenuClick(item.id, e)}
                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <MoreVertical size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider mb-1">Phone Number</p>
                <p className="text-sm text-gray-700">{item.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider mb-1">Email</p>
                <p className="text-sm text-gray-600 break-all">{item.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider mb-1">Joined Date</p>
                <p className="text-sm text-gray-600">{item.joinedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider mb-1">Address</p>
                <p className="text-sm text-gray-600">{item.address}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100">
          <p className="text-sm text-[#6C3BFF] font-medium text-center md:text-left">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} results
          </p>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex-1 md:flex-none px-6 py-2 border border-[#6C3BFF] text-[#6C3BFF] rounded-lg text-sm font-medium hover:bg-[#6C3BFF] hover:text-white transition-colors disabled:opacity-50 disabled:border-gray-200 disabled:text-gray-400"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="flex-1 md:flex-none px-6 py-2 border border-[#6C3BFF] text-[#6C3BFF] rounded-lg text-sm font-medium hover:bg-[#6C3BFF] hover:text-white transition-colors disabled:opacity-50 disabled:border-gray-200 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewUserModal 
        isOpen={showViewModal} 
        user={selectedUser} 
        onClose={() => setShowViewModal(false)} 
      />
      <EditUserModal 
        isOpen={showEditModal} 
        user={selectedUser} 
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
};

export default UserInformation;
