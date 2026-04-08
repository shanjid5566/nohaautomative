import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../config";
import { selectUser } from "../../store/slices/authSlice";
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  CheckCircle,
  MapPin,
  Settings,
  User,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const ALL_LISTINGS = [
  {
    id: 1,
    title: "2022 BMW 3 Series M Sport",
    sellerName: "EV Motors",
    sellerEmail: "ev.motors@example.com",
    joinedDate: "June 2021",
    price: "$42,500",
    year: 2022,
    mileage: "8,000 mi",
    transmission: "Automatic",
    fuel: "Electric",
    condition: "New",
    make: "BMW",
    model: "Model 3",
    engine: "Dual Motor Electric",
    horsepower: "346 HP",
    color: "Pearl White",
    doors: 4,
    seats: 5,
    location: "Manchester",
    listedDays: "4 days ago",
    activeListings: 15,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=800&q=80",
      "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=800&q=80",
    ],
  },
];

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userRole = user?.role?.toLowerCase();

  const car =
    ALL_LISTINGS.find((item) => item.id === parseInt(id)) || ALL_LISTINGS[0];
  const [mainImage, setMainImage] = useState(car.images[0]);
  const [activeImg, setActiveImg] = useState(0);

  const handleBackClick = () => {
    if (userRole === 'admin') {
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else if (userRole === 'seller') {
      navigate(ROUTES.SELLER_LISTINGS);
    } else {
      navigate(-1);
    }
  };

  const prevImg = () =>
    setActiveImg((p) => (p === 0 ? car.images.length - 1 : p - 1));
  const nextImg = () =>
    setActiveImg((p) => (p === car.images.length - 1 ? 0 : p + 1));

  return (
    <div className="space-y-4 bg-[#F9FAFB]">
      {/* Navigation */}
      <button
        onClick={handleBackClick}
        className="flex items-center gap-2 text-[#6C3BFF] font-semibold mb-6 transition-all"
      >
        <ArrowLeft size={20} />
        Back to Listings
      </button>

      {/* Image Gallery Grid */}
      <div className="flex gap-2 sm:gap-3 md:gap-4 mb-8">
        {/* Left group: vertical thumbnail strip */}
        <div className="flex flex-col gap-1.5 sm:gap-2 w-16 sm:w-32 md:w-60 shrink-0 h-72 sm:h-96 md:h-[550px]">
          {/* UP arrow */}
          <button
            onClick={prevImg}
            className="w-full shrink-0 flex items-center justify-center py-2 rounded bg-[#6C3BFF] hover:bg-[#5a2fbf] text-white transition-colors"
          >
            <ChevronUp size={18} />
          </button>

          {/* Thumbnails */}
          {car.images.map((src, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveImg(i);
                setMainImage(src);
              }}
              className={`flex-1 min-h-0 w-full rounded overflow-hidden border-2 transition-colors ${
                activeImg === i ? "border-[#6C3BFF]" : "border-transparent"
              }`}
            >
              <img
                src={src}
                alt={`View ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}

          {/* DOWN arrow */}
          <button
            onClick={nextImg}
            className="w-full shrink-0 flex items-center justify-center py-2 rounded bg-[#6C3BFF] hover:bg-[#5a2fbf] text-white transition-colors"
          >
            <ChevronDown size={18} />
          </button>
        </div>

        {/* Main image */}
        <div className="flex-1 h-72 sm:h-96 md:h-[550px] rounded-2xl overflow-hidden bg-gray-200 shadow-sm">
          <img
            src={mainImage}
            alt="Main"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-2xl font-medium text-[#0A0A0A] mb-4">
              {car.title}
            </h1>
            <p className="text-[#323232] leading-relaxed mb-6 text-base">
              Experience the perfect balance of performance, luxury, and modern
              design with the {car.year} {car.make} {car.model}. This sporty
              sedan comes with a powerful turbocharged engine, delivering smooth
              acceleration and dynamic driving performance.
            </p>
            <div className="text-4xl font-extrabold text-gray-900 mb-8">
              {car.price}
            </div>
            {/* Icon Specs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Year Card */}
              <div className="bg-[#F2F1FD] p-5 rounded-2xl flex items-center gap-4">
                <div className="p-2">
                  <Calendar className="text-[#6C3BFF]" size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 uppercase  tracking-wide">
                    Year
                  </span>
                  <span className="font-bold text-base text-gray-900 leading-tight">
                    {car.year}
                  </span>
                </div>
              </div>

              {/* Mileage Card */}
              <div className="bg-[#F2F1FD] p-5 rounded-2xl flex items-center gap-4">
                <div className="p-2">
                  <Gauge className="text-[#6C3BFF]" size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 uppercase  tracking-wide">
                    Mileage
                  </span>
                  <span className="font-bold text-base text-gray-900 leading-tight">
                    {car.mileage}
                  </span>
                </div>
              </div>

              {/* Fuel Card */}
              <div className="bg-[#F2F1FD] p-5 rounded-2xl flex items-center gap-4">
                <div className="p-2">
                  <Fuel className="text-[#6C3BFF]" size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 uppercase  tracking-wide">
                    Fuel
                  </span>
                  <span className="font-bold text-base text-gray-900 leading-tight">
                    {car.fuel}
                  </span>
                </div>
              </div>

              {/* Transmission Card */}
              <div className="bg-[#F2F1FD] p-5 rounded-2xl flex items-center gap-4">
                <div className="p-2">
                  <Settings className="text-[#6C3BFF]" size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400 uppercase  tracking-wide">
                    Transmission
                  </span>
                  <span className="font-bold text-base text-gray-900 leading-tight">
                    {car.transmission}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {[
                { label: "Make", value: car.make },
                { label: "Model", value: car.model },
                { label: "Engine", value: car.engine },
                { label: "Horsepower", value: car.horsepower },
                { label: "Color", value: car.color },
                { label: "Doors", value: car.doors },
                { label: "Seats", value: car.seats },
                { label: "Condition", value: car.condition },
              ].map((spec, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-3 border-b border-gray-300 last:border-0"
                >
                  <span className="text-gray-500 font-medium">
                    {spec.label}
                  </span>
                  <span className="text-gray-900 font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Seller Info */}
        <div className="space-y-6">
          <div className=" p-6 rounded-lg border border-[#E5E7EB]">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Seller Information
            </h2>

            {/* Profile Section */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#EDE9FF] rounded-full flex items-center justify-center">
                {/* User Icon like the image */}
                <User size={28} className="text-[#6366F1]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl text-gray-900 leading-none">
                    {car.sellerName}
                  </h3>
                  <div className="bg-white rounded-full">
                    <CheckCircle
                      size={18}
                      className="text-[#10B981]" // Green checkmark
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {car.joinedDate}
                </p>
                <p className="text-sm text-gray-400">
                  {car.activeListings} active listings
                </p>
              </div>
            </div>

            {/* Location Section */}
            <div className="flex items-center gap-2 text-gray-400 mb-6">
              <MapPin size={18} className="text-gray-400" />
              <span className="text-sm font-medium">{car.location}</span>
            </div>

            {/* Footer Section */}
            <div className="pt-5 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                Listed {car.listedDays}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
