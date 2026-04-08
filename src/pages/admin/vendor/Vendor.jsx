

import React, { useState, useEffect } from 'react';
import { Eye, Pencil, MoreVertical } from 'lucide-react';
import ViewVendorModal from './components/ViewVendorModal';
import EditVendorModal from './components/EditVendorModal';

const VENDORS_DATA = [
  { id: 1, name: 'John Motors', phone: '+1-555-0101', email: 'john@motors.com', joinedDate: '01 January 2019', address: '123 Auto Street, Car City, CC 12345' },
  { id: 2, name: 'Premium Cars Ltd', phone: '+1-555-0102', email: 'info@premiumcars.com', joinedDate: '03 February 2018', address: '456 Premium Ave, Luxury town, LT 67890' },
  { id: 3, name: 'Elite Auto Sales', phone: '+1-555-0103', email: 'sales@eliteauto.com', joinedDate: '22 March 2020', address: '789 Elite Road, Car Valley, CV 11111' },
  { id: 4, name: 'Classic Cars Co', phone: '+1-555-0104', email: 'contact@classiccars.com', joinedDate: '24 April 2016', address: '321 Classic Lane, Vintage City, VC 22222' },
  { id: 5, name: 'Speed Motors', phone: '+1-555-0105', email: 'support@speedmotors.com', joinedDate: '1 May 2019', address: '654 Speed Drive, Fast Town, FT 33333' },
  { id: 6, name: 'Luxury Auto Hub', phone: '+1-555-0106', email: 'hello@luxuryauto.com', joinedDate: '08 June 2015', address: '987 Luxury Blvd, Premium City, PC 44444' },
  { id: 7, name: 'Urban Vehicles', phone: '+1-555-0107', email: 'info@urbanvehicles.com', joinedDate: '30 July 2021', address: '147 Urban Street, Metro City, MC 55555' },
  { id: 8, name: 'Drive Pro Agency', phone: '+1-555-0108', email: 'contact@drivepro.com', joinedDate: '15 August 2020', address: '258 Pro Road, Business Park, BP 66666' },
  { id: 9, name: 'AutoCare Services', phone: '+1-555-0109', email: 'support@autocare.com', joinedDate: '22 September 2019', address: '369 Care Lane, Service City, SC 77777' },
  { id: 10, name: 'NextGen Motors', phone: '+1-555-0110', email: 'sales@nextgenmotors.com', joinedDate: '10 October 2021', address: '741 Next Avenue, Tech City, TC 88888' },
];

const Vendor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuDirection, setMenuDirection] = useState('down');
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const pageSize = 7;

  // Calculate pagination
  const totalItems = VENDORS_DATA.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = VENDORS_DATA.slice(startIndex, endIndex) || [];

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle menu click
  const handleMenuClick = (vendorId, event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    const itemIndex = paginatedData.findIndex((item) => item.id === vendorId);
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
    
    setOpenMenuId(openMenuId === vendorId ? null : vendorId);
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
  const handleViewClick = (vendor) => {
    setSelectedVendor(vendor);
    setShowViewModal(true);
    setOpenMenuId(null);
  };

  // Handle Edit button click
  const handleEditClick = (vendor) => {
    setSelectedVendor(vendor);
    setShowEditModal(true);
    setOpenMenuId(null);
  };

  // Handle Save Vendor
  const handleSaveVendor = (vendorId, formData) => {
    console.log('Vendor updated:', { id: vendorId, ...formData });
    // TODO: Add API call to update vendor data
  };

  return (
    <div className=" space-y-4 bg-[#F9FAFB] ">
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-6">
          <h2 className="text-2xl font-semibold text-gray-800">Vendors List</h2>
        </div>

        {/* Desktop Table View (Hidden on Mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-gray-200 text-gray-400 text-sm bg-[#F9FAFB] uppercase tracking-wider">
                <th className="px-4 md:px-8 py-4 text-black text-base font-normal">Name</th>
                <th className="px-8 py-4 text-black text-base font-normal">Phone Number</th>
                <th className="px-8 py-4 text-black text-base font-normal">Seller Email</th>
                <th className="px-8 py-4 text-black text-base font-normal">Joined Date</th>
                <th className="px-8 py-4 text-black text-base font-normal">Address</th>
                <th className="px-8 py-4 text-black text-base font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5 text-sm text-gray-700 font-medium">{item.name}</td>
                  <td className="px-8 py-5 text-sm text-gray-600">{item.phone}</td>
                  <td className="px-8 py-5 text-sm text-gray-600 break-all max-w-50">{item.email}</td>
                  <td className="px-8 py-5 text-sm text-gray-500">{item.joinedDate}</td>
                  <td className="px-8 py-5 text-sm text-gray-500 max-w-50">{item.address}</td>
                  <td className="px-8   md:px-12 py-5 text-right">
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

        {/* Mobile Card View (Hidden on Desktop) */}
        <div className="md:hidden grid grid-cols-1 gap-4 px-2 pb-6">
          {paginatedData.map((item) => (
            <div key={item.id} className="p-4 border border-gray-100 rounded-lg bg-[#F9FAFB] space-y-3">
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
              
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm uppercase font-semibold">Phone</span>
                  <span className="text-gray-700">{item.phone}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm uppercase font-semibold">Email</span>
                  <span className="text-gray-700 break-all">{item.email}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm uppercase font-semibold">Joined Date</span>
                  <span className="text-gray-600">{item.joinedDate}</span>
                </div>
                <div className="flex flex-col border-t border-gray-200 pt-2 mt-1">
                  <span className="text-gray-400 text-sm uppercase font-semibold">Address</span>
                  <span className="text-gray-600">{item.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-6 py-6 flex flex-col md:flex-row items-center justify-between border-t border-gray-100 gap-4">
          <p className="text-sm text-[#6C3BFF] font-medium order-2 md:order-1">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems}
          </p>
          <div className="flex gap-3 order-1 md:order-2 w-full md:w-auto">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="flex-1 md:flex-none px-6 py-2 border border-[#6C3BFF] text-[#6C3BFF] rounded-lg text-sm font-medium hover:bg-[#6C3BFF] hover:text-white disabled:opacity-50 disabled:border-gray-200 disabled:text-gray-400"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="flex-1 md:flex-none px-6 py-2 border border-[#6C3BFF] text-[#6C3BFF] rounded-lg text-sm font-medium hover:bg-[#6C3BFF] hover:text-white disabled:opacity-50 disabled:border-gray-200 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewVendorModal 
        isOpen={showViewModal} 
        vendor={selectedVendor} 
        onClose={() => setShowViewModal(false)} 
      />
      <EditVendorModal 
        isOpen={showEditModal} 
        vendor={selectedVendor} 
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveVendor}
      />
    </div>
  );
};

export default Vendor;