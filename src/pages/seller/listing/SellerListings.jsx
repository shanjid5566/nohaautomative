import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config';
import CarCard from './components/CarCard';
import FilterTab from './components/FilterTab';
import CreateListingModal from './components/CreateListingModal';
import Pagination from './components/Pagination';

const SellerListings = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - Replace with API call
  const allListings = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1215&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2022 BMW 3 Series M Sport',
      year: '2022',
      mileage: '15,000 mi',
      transmission: 'Manual',
      location: 'London',
      fuel: 'Petrol',
      status: 'Approved',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/flagged/photo-1553505192-acca7d4509be?q=80&w=1190&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2022 BMW 3 Series M Sport',
      year: '2022',
      mileage: '15,000 mi',
      transmission: 'Manual',
      location: 'London',
      fuel: 'Petrol',
      status: 'Pending',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2023 BMW 3 Series M Sport',
      year: '2023',
      mileage: '15,000 mi',
      transmission: 'Electric',
      location: 'London',
      fuel: 'Electric',
      status: 'Rejected',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2022 BMW 3 Series M Sport',
      year: '2022',
      mileage: '15,000 mi',
      transmission: 'Manual',
      location: 'London',
      fuel: 'Petrol',
      status: 'Approved',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1638618164682-12b986ec2a75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2022 BMW 3 Series M Sport',
      year: '2022',
      mileage: '15,000 mi',
      transmission: 'Pending',
      location: 'London',
      fuel: 'Petrol',
      status: 'Pending',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1626072557464-90403d788e8d?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2023 BMW 3 Series M Sport',
      year: '2023',
      mileage: '15,000 mi',
      transmission: 'Electric',
      location: 'London',
      fuel: 'Electric',
      status: 'Approved',
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1630826362226-a509049bcdbf?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2023 BMW 3 Series M Sport',
      year: '2023',
      mileage: '15,000 mi',
      transmission: 'Electric',
      location: 'London',
      fuel: 'Electric',
      status: 'Rejected',
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1650530579355-7ad9d4766043?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2022 BMW 3 Series M Sport',
      year: '2022',
      mileage: '15,000 mi',
      transmission: 'Manual',
      location: 'London',
      fuel: 'Petrol',
      status: 'Approved',
    },
    {
      id: 9,
      image: 'https://images.unsplash.com/photo-1634737581963-5a22ba471961?q=80&w=1243&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2022 BMW 3 Series M Sport',
      year: '2022',
      mileage: '15,000 mi',
      transmission: 'Manual',
      location: 'London',
      fuel: 'Petrol',
      status: 'Approved',
    },
    {
      id: 10,
      image: 'https://images.unsplash.com/photo-1609676671207-d021525a635d?q=80&w=1092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2022 BMW 3 Series M Sport',
      year: '2022',
      mileage: '15,000 mi',
      transmission: 'Manual',
      location: 'London',
      fuel: 'Petrol',
      status: 'Pending',
    },
    {
      id: 11,
      image: 'https://images.unsplash.com/photo-1627395427294-d01af2f943ac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '2023 BMW 3 Series M Sport',
      year: '2023',
      mileage: '15,000 mi',
      transmission: 'Manual',
      location: 'London',
      fuel: 'Petrol',
      status: 'Approved',
    },
  ];

  // Filter listings
  const filteredListings =
    activeFilter === 'All'
      ? allListings
      : allListings.filter((car) => car.status === activeFilter);

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedListings = filteredListings.slice(startIdx, startIdx + itemsPerPage);

  const handleView = (id) => {
    navigate(`/admin/cars/${id}`);
  };

  const handleEdit = (id) => {
    console.log('Edit car:', id);
    // TODO: Navigate to edit page
  };

  const handleDelete = (id) => {
    console.log('Delete car:', id);
    // TODO: Show delete confirmation
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleCreateListing = (formData) => {
    console.log('Creating listing:', formData);
    // TODO: Submit form data to API
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className=" space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-poppins font-semibold text-3xl lg:text-4xl text-gray-900">
              My Listings
            </h1>
            <p className="text-gray-600 text-base">Manage and track the status of your car listings.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: '#6C3BFF' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a2dd1'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6C3BFF'}
            className="text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors cursor-pointer"
          >
            Create a new listings
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white border border-gray-50 rounded-lg p-2 flex gap-2 overflow-x-auto w-full lg:w-fit">
          {['All', 'Approved', 'Pending', 'Rejected'].map((filter) => (
            <FilterTab
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => handleFilterChange(filter)}
            />
          ))}
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedListings.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Create Listing Modal */}
      <CreateListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateListing}
      />
    </div>
  );
};

export default SellerListings;
