import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, Trash2, ChevronDown, X, MoreVertical, Check } from "lucide-react";
import ConfirmationModal from "./components/ConfirmationModal";

const REQUESTED_LISTINGS = [
  {
    id: 1,
    title: "2018 Toyota Corolla",
    sellerName: "Darlene Robertson",
    sellerEmail: "darta.cruz@example.com",
    joinedDate: "01 January 2019",
  },
  {
    id: 2,
    title: "BMW X5 Excellent Condition",
    sellerName: "Cameron Williamson",
    sellerEmail: "felicia.reid@example.com",
    joinedDate: "03 February 2018",
  },
  {
    id: 3,
    title: "Honda Civic, Low Mileage",
    sellerName: "Robert Fox",
    sellerEmail: "georgia.young@example.com",
    joinedDate: "22 March 2020",
  },
  {
    id: 4,
    title: "2018 Toyota Corolla",
    sellerName: "Guy Hawkins",
    sellerEmail: "jessica.harrison@example.com",
    joinedDate: "24 April 2016",
  },
  {
    id: 5,
    title: "Honda Civic, Low Mileage",
    sellerName: "Courtney Henry",
    sellerEmail: "delores.chamberlain@example.com",
    joinedDate: "1 May 2019",
  },
  {
    id: 6,
    title: "BMW X5 Excellent Condition",
    sellerName: "Arlene McCoy",
    sellerEmail: "nathan.roberts@example.com",
    joinedDate: "08 June 2015",
  },
  {
    id: 7,
    title: "BMW X5 Excellent Condition",
    sellerName: "Cody Fisher",
    sellerEmail: "dharma.curtis@example.com",
    joinedDate: "30 July 2021",
  },
];

const APPROVED_LISTINGS = [
  {
    id: 1,
    title: "BMW X5 Excellent Condition",
    sellerName: "Devon Lane",
    sellerEmail: "ella.jim@example.com",
    joinedDate: "01 January 2019",
  },
  {
    id: 2,
    title: "BMW X5 Excellent Condition",
    sellerName: "Floyd Miles",
    sellerEmail: "jackson.graham@example.com",
    joinedDate: "03 February 2018",
  }
];

const REJECTED_LISTINGS = [
  {
    id: 1,
    title: "BMW X5, Excellent Condition",
    sellerName: "Kristin Watson",
    sellerEmail: "jackson.graham@example.com",
    joinedDate: "01 January 2019",
  },
  {
    id: 2,
    title: "BMW X5, Excellent Condition",
    sellerName: "Dianne Russell",
    sellerEmail: "alma.lawson@example.com",
    joinedDate: "03 February 2018",
  },
  {
    id: 3,
    title: "BMW X5, Excellent Condition",
    sellerName: "Theresa Webb",
    sellerEmail: "georgia.young@example.com",
    joinedDate: "22 March 2020",
  },
  {
    id: 4,
    title: "BMW X5, Excellent Condition",
    sellerName: "Marvin McKinney",
    sellerEmail: "kenzi.lawson@example.com",
    joinedDate: "24 April 2016",
  },
  {
    id: 5,
    title: "BMW X5, Excellent Condition",
    sellerName: "Albert Flores",
    sellerEmail: "bill.sanders@example.com",
    joinedDate: "1 May 2019",
  },
  {
    id: 6,
    title: "BMW X5, Excellent Condition",
    sellerName: "Ralph Edwards",
    sellerEmail: "michelle.rivera@example.com",
    joinedDate: "08 June 2015",
  },
  {
    id: 7,
    title: "BMW X5, Excellent Condition",
    sellerName: "Kathryn Murphy",
    sellerEmail: "sara.cruz@example.com",
    joinedDate: "30 July 2021",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get tab from sessionStorage or URL params, default to "requested"
  const savedTab = sessionStorage.getItem('activeTab') || "requested";
  const [activeTab, setActiveTab] = useState(savedTab);
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuDirection, setMenuDirection] = useState('down');
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRefs = useRef({});
  const pageSize = 7; // Items per page

  // Confirmation modal state
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    action: null,
    itemId: null,
    itemTitle: null,
  });

  const openConfirmation = (action, itemId, itemTitle) => {
    setConfirmation({
      isOpen: true,
      action,
      itemId,
      itemTitle,
    });
  };

  const closeConfirmation = () => {
    setConfirmation({
      isOpen: false,
      action: null,
      itemId: null,
      itemTitle: null,
    });
  };

  const handleConfirmAction = () => {
    const { action, itemId } = confirmation;
    
    // Perform the action based on the type
    if (action === 'approve') {
      console.log(`Approved listing ${itemId}`);
      // Add your approve logic here
    } else if (action === 'reject') {
      console.log(`Rejected listing ${itemId}`);
      // Add your reject logic here
    } else if (action === 'delete') {
      console.log(`Deleted listing ${itemId}`);
      // Add your delete logic here
    }
    
    closeConfirmation();
    setOpenMenuId(null);
  };

  const getConfirmationContent = () => {
    const { action, itemTitle } = confirmation;
    
    if (action === 'approve') {
      return {
        title: 'Approve Listing',
        message: `Are you sure you want to approve "${itemTitle}"? This will make the listing live on the marketplace.`,
        confirmText: 'Approve',
        isDangerous: false,
      };
    } else if (action === 'reject') {
      return {
        title: 'Reject Listing',
        message: `Are you sure you want to reject "${itemTitle}"? This action cannot be undone.`,
        confirmText: 'Reject',
        isDangerous: true,
      };
    } else if (action === 'delete') {
      return {
        title: 'Delete Listing',
        message: `Are you sure you want to delete "${itemTitle}"? This action cannot be undone.`,
        confirmText: 'Delete',
        isDangerous: true,
      };
    }
    return {};
  };

  // Calculate menu offset based on active tab
  const getMenuOffsetByTab = () => {
    if (activeTab === 'requested') return 200;
    if (activeTab === 'approved') return 150;
    if (activeTab === 'rejected') return 100;
    return 200;
  };

  const tabs = [
    {
      id: "requested",
      name: "Requested Listings",
      label: "Listings Request List",
      data: REQUESTED_LISTINGS,
      showApprove: true,
      showReject: true,
    },
    {
      id: "approved",
      name: "Approved Listings",
      label: "Listings Approved List",
      data: APPROVED_LISTINGS,
      showApprove: false,
      showReject: true,
    },
    {
      id: "rejected",
      name: "Rejected listings",
      label: "Rejected  List",
      data: REJECTED_LISTINGS,
      showApprove: false,
      showReject: false,
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  // Save activeTab to sessionStorage whenever it changes
  React.useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab);
    setCurrentPage(1);
  }, [activeTab]);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('[data-menu-container]')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Determine menu direction based on total items and position
  const handleMenuClick = (itemId, event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Find the index of the item in paginated data
    const itemIndex = paginatedData.findIndex((item) => item.id === itemId);
    const totalItems = paginatedData.length;
    
    // If 6 or less items: open down always
    if (totalItems <= 6) {
      setMenuDirection('down');
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.right - 192, // 192px is width of menu (w-48)
      });
    } else {
      // If more than 6 items: first 4 items open down, last 3 items open up
      if (itemIndex < 4) {
        // First 4 items - open down
        setMenuDirection('down');
        setMenuPosition({
          top: rect.bottom + 8,
          left: rect.right - 192,
        });
      } else {
        // Last 3 items - open up
        setMenuDirection('up');
        setMenuPosition({
          top: rect.top,
          left: rect.right - 192,
        });
      }
    }
    
    setOpenMenuId(openMenuId === itemId ? null : itemId);
  };

  // Optional: Update tab from URL params if provided
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
      sessionStorage.setItem('activeTab', tabFromUrl);
    }
  }, [location.search]);

  // Calculate pagination
  const totalItems = activeTabData?.data.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = activeTabData?.data.slice(startIndex, endIndex) || [];

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

  return (
    <div className="space-y-4 bg-[#F9FAFB">
      {/* Floating Menu - Rendered Outside Table */}
      {openMenuId && (
        <div
          className="fixed w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          style={{
            top: menuDirection === 'up' ? `${menuPosition.top - getMenuOffsetByTab()}px` : `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
          data-menu-container
        >
          {paginatedData.map((item) => (
            item.id === openMenuId && (
              <div key={item.id}>
                <button
                  onClick={() => {
                    navigate(`/admin/cars/${item.id}`);
                    setOpenMenuId(null);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                >
                  <Eye size={16} />
                  View
                </button>
                
                {activeTabData.showApprove && (
                  <button
                    onClick={() => openConfirmation('approve', item.id, item.title)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-green-600 hover:bg-green-50 border-b border-gray-100 transition-colors"
                  >
                    <Check size={16} />
                    Approve
                  </button>
                )}
                
                {activeTabData.showReject && (
                  <button
                    onClick={() => openConfirmation('reject', item.id, item.title)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-orange-600 hover:bg-orange-50 border-b border-gray-100 transition-colors"
                  >
                    <X size={16} />
                    Reject
                  </button>
                )}
                
                <button
                  onClick={() => openConfirmation('delete', item.id, item.title)}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )
          ))}
        </div>
      )}

      {/* Tab Navigation */}
      {/* Desktop/Tablet View */}
      <div className="hidden md:flex gap-12 border-b border-gray-200 mb-8 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-base font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-[#6C3BFF]"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.name}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6C3BFF] " />
            )}
          </button>
        ))}
      </div>

      {/* Mobile View - Select Dropdown */}
      <div className="md:hidden  mb-6">
        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-sm font-medium text-gray-800 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C3BFF] focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header / Title */}
        <div className="px-4 md:px-8 py-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {activeTabData?.label}
          </h2>
        </div>

        {/* Table Content - Hidden on Mobile, Visible on MD+ */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-gray-200 text-gray-400 text-sm bg-[#F9FAFB] uppercase tracking-wider">
                <th className="px-4 md:px-8 py-4 text-black text-base font-normal">Title</th>
                <th className="px-4 md:px-8 py-4 text-black text-base font-normal">Seller Name</th>
                <th className="px-4 md:px-8 py-4 text-black text-base font-normal">
                  Seller Email
                </th>
                <th className="px-4 md:px-8 py-4 text-black text-base font-normal">Joined Date</th>
                <th className="px-4 md:px-18 py-4 text-black text-base font-normal text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 md:px-8 py-5 text-sm text-gray-700 leading-relaxed max-w-50">
                    {item.title}
                  </td>
                  <td className="px-4 md:px-8 py-5 text-sm text-gray-600">
                    {item.sellerName}
                  </td>
                  <td className="px-4 md:px-8 py-5 text-sm text-gray-500 break-all max-w-50">
                    {item.sellerEmail}
                  </td>
                  <td className="px-4 md:px-8 py-5 text-sm text-gray-500">
                    {item.joinedDate}
                  </td>
                  <td className="px-4 md:px-22 py-5 text-right">
                    <div className="relative inline-block" data-menu-container>
                      <button
                        ref={(el) => (menuRefs.current[item.id] = el)}
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
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-5 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider mb-1">
                    Title
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </p>
                </div>
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
                <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider mb-1">
                  Seller Name
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {item.sellerName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider mb-1">
                  Email
                </p>
                <p className="text-sm text-gray-600 break-all">
                  {item.sellerEmail}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider mb-1">
                  Joined Date
                </p>
                <p className="text-sm text-gray-600">{item.joinedDate}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100">
          <p className="text-sm text-[#6C3BFF] font-medium text-center md:text-left">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
            {totalItems} results
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

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmation.isOpen}
        {...getConfirmationContent()}
        onConfirm={handleConfirmAction}
        onCancel={closeConfirmation}
      />
    </div>
  );
};

export default Dashboard;
