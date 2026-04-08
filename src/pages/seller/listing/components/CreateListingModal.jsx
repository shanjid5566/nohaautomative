import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';

const CreateListingModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    about: '',
    price: '',
    year: '',
    mileage: '',
    fuel: '',
    transmission: '',
    make: '',
    model: '',
    engine: '',
    horsepower: '',
    color: '',
    doors: '',
    seats: '',
    condition: 'New',
    sellerName: '',
    address: '',
    images: [null],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => {
          const newImages = [...prev.images];
          newImages[index] = reader.result;
          return { ...prev, images: newImages };
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addImageSlot = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, null]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      about: '',
      price: '',
      year: '',
      mileage: '',
      fuel: '',
      transmission: '',
      make: '',
      model: '',
      engine: '',
      horsepower: '',
      color: '',
      doors: '',
      seats: '',
      condition: 'New',
      sellerName: '',
      address: '',
      images: [null],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header - Sticky */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Create your listings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Title & About */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g listing title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">About this car</label>
              <input
                type="text"
                name="about"
                placeholder="About description"
                value={formData.about}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="price"
              placeholder="10,000"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
            />
          </div>

          {/* Year & Mileage */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="text"
                name="year"
                placeholder="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mileage</label>
              <input
                type="text"
                name="mileage"
                placeholder="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>
          </div>

          {/* Fuel & Transmission */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel</label>
              <input
                type="text"
                name="fuel"
                placeholder="Fuel"
                value={formData.fuel}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <input
                type="text"
                name="transmission"
                placeholder="Transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>
          </div>

          {/* Specifications Section */}
          <div className="pt-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
            
            {/* Make & Model */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                <input
                  type="text"
                  name="make"
                  placeholder="Make"
                  value={formData.make}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  name="model"
                  placeholder="Model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>
            </div>

            {/* Engine & Horsepower */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Engine</label>
                <input
                  type="text"
                  name="engine"
                  placeholder="Engine type"
                  value={formData.engine}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Horsepower</label>
                <input
                  type="text"
                  name="horsepower"
                  placeholder="Horsepower"
                  value={formData.horsepower}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>
            </div>

            {/* Color & Doors */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Doors</label>
                <input
                  type="text"
                  name="doors"
                  placeholder="Doors"
                  value={formData.doors}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>
            </div>

            {/* Seats & Condition */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
                <input
                  type="text"
                  name="seats"
                  placeholder="Seats"
                  value={formData.seats}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <input
                  type="text"
                  name="condition"
                  placeholder="New"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Seller Information Section */}
          <div className="pt-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Seller Name</label>
              <input
                type="text"
                name="sellerName"
                placeholder="John"
                value={formData.sellerName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Seller address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
              />
            </div>
          </div>

          {/* Image Section */}
          <div className="pt-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload your images</h3>
            
            {/* Image Grid - 2 per row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="relative bg-gray-200 rounded-lg aspect-square flex items-center justify-center overflow-hidden group cursor-pointer hover:bg-gray-300 transition-colors"
                >
                  {image ? (
                    <>
                      <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Trash size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <Plus size={32} className="text-gray-400" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Add Another Image Button */}
            <button
              type="button"
              onClick={addImageSlot}
              className="text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center gap-1 cursor-pointer"
            >
              + Add another image
            </button>
          </div>
        </form>

        {/* Submit Button - Sticky */}
        <div className="border-t border-gray-200 p-4 sm:p-6 flex-shrink-0 bg-white">
          <button
            type="submit"
            onClick={handleFormSubmit}
            style={{ backgroundColor: '#6C3BFF' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a2dd1'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6C3BFF'}
            className="w-full text-white py-3 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListingModal;
