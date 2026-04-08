import React from 'react';
import { ArrowUp, Clock, CheckCircle2, AlertCircle, Car , ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, percentage }) => (
  <div className="bg-white border border-gray-300 rounded-2xl p-6 flex flex-col gap-5">
    <div className="flex gap-2 items-center">
      <div className="bg-purple-100 rounded-lg p-2 flex items-center justify-center w-10 h-10">
        <Icon size={24} className="text-purple-600" />
      </div>
      <div className="bg-purple-100 rounded-full px-2 py-1 flex items-center justify-center gap-1">
        <ArrowUp size={15} className="text-purple-600" />
        <span className="text-purple-600 text-xs font-normal">{percentage}%</span>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="text-gray-600 text-xs font-normal">{label}</p>
      <p className="text-black text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

// Listing Card Component
const ListingCard = ({ image, title, price, status, onViewClick }) => (
  <div className="border-b border-gray-200 py-1 last:border-b-0">
    <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <img
          src={image}
          alt={title}
          className="w-20 h-20 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
          <p className="text-gray-600 font-semibold">${price}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
        <span
          className={`px-3 py-2 rounded-full text-sm font-normal flex items-center gap-2 whitespace-nowrap ${
            status === 'Approved'
              ? 'bg-green-50 text-green-600'
              : 'bg-amber-50 text-amber-600'
          }`}
        >
          {status === 'Approved' ? (
            <CheckCircle2 size={20} />
          ) : (
            <Clock size={20} />
          )}
          {status}
        </span>
        <button
          onClick={onViewClick}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="View details"
        >
          <ChevronRight size={24} className="text-gray-400" />
        </button>
      </div>
    </div>
  </div>
);

const SellerDashboard = () => {
  // Mock data
  const listings = [
    {
      id: 1,
      image: '/seller/dashboard/image-1.jpg',
      title: 'BMW 3 Series 2018',
      price: '400.00',
      status: 'Pending Approval',
    },
    {
      id: 2,
      image: '/seller/dashboard/image_2.jpg',
      title: 'BMW 3 Series 2018',
      price: '400.00',
      status: 'Approved',
    },
    {
      id: 3,
      image: '/seller/dashboard/image_3.jpg',
      title: 'BMW 3 Series 2018',
      price: '400.00',
      status: 'Approved',
    },
    {
      id: 4,
      image: '/seller/dashboard/image_4.jpg',
      title: 'BMW 3 Series 2018',
      price: '400.00',
      status: 'Pending Approval',
    },
    {
      id: 5,
      image: '/seller/dashboard/image_5.jpg',
      title: 'BMW 3 Series 2018',
      price: '400.00',
      status: 'Approved',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-poppins font-semibold text-3xl sm:text-4xl text-gray-900">
              Welcome back, James!
            </h1>
            <p className="font-inter font-normal text-lg sm:text-xl text-gray-600">
              Here's what's happening with your listings today.
            </p>
          </div>

          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatsCard
              icon={Car}
              label="Total Listings"
              value="84"
              percentage="12"
            />
            <StatsCard
              icon={Clock}
              label="Active Listings"
              value="42"
              percentage="12"
            />
            <StatsCard
              icon={CheckCircle2}
              label="Pending Approval"
              value="1,192"
              percentage="8"
            />
            <StatsCard
              icon={AlertCircle}
              label="Total Message"
              value="18"
              percentage="2"
            />
          </div>
        </div>

        {/* Main Content Grid - Responsive */}
        <div>
          {/* Recent Listings */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <h2 className="font-inter font-medium text-2xl text-gray-900">
                Recent Listings
              </h2>
              <Link to={'/seller/listings'} className="text-purple-600 font-semibold text-sm sm:text-base hover:text-purple-700 transition-colors">
                View All
              </Link>
            </div>
            <div className="space-y-2">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  image={listing.image}
                  title={listing.title}
                  price={listing.price}
                  status={listing.status}
                  onViewClick={() => console.log('View listing:', listing.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
