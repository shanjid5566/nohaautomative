const FilterTab = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    style={isActive ? { backgroundColor: '#6C3BFF' } : {}}
    className={`px-6 py-2.5 font-medium text-sm rounded-lg transition-all whitespace-nowrap cursor-pointer ${
      isActive
        ? 'text-white'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

export default FilterTab;
