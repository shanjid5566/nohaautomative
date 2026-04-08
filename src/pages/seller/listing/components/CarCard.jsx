import { Eye, Edit2, Trash2, Calendar, Gauge, Zap, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const CarCard = ({ car, onView, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/seller/vehicle/${car.id}`);
    onView(car.id);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Car Image */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        <img
          src={car.image}
          alt={car.title}
          className="w-full h-full object-cover"
        />
        <StatusBadge status={car.status} />
      </div>

      {/* Car Details */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base line-clamp-1">{car.title}</h3>

        {/* Specs Box */}
        <div className="">
          <div className="flex items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-gray-400" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge size={14} className="text-gray-400" />
              <span>{car.mileage}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap size={14} className="text-gray-400" />
              <span>{car.fuel}</span>
            </div>
          </div>
        </div>

        {/* Location & Fuel */}
        <div className="flex items-center justify-between gap-4 text-xs text-gray-600 py-2 border-t border-gray-100">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {car.location}
          </span>
          <span>{car.transmission}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleView}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Eye size={16} />
            View
          </button>
          {car.status !== 'Rejected' && (
            <button
              onClick={() => onEdit(car.id)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Edit2 size={16} />
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(car.id)}
            className={`${car.status !== 'Rejected' ? 'flex-1' : 'flex-1'} bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer`}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
