import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex items-center justify-center gap-2 mt-8">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      <ChevronLeft size={20} />
    </button>

    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        style={currentPage === page ? { backgroundColor: '#6C3BFF' } : {}}
        className={`w-8 h-8 flex items-center justify-center rounded font-medium transition-colors cursor-pointer ${
          currentPage === page
            ? 'text-white'
            : 'hover:bg-gray-100 text-gray-600'
        }`}
      >
        {page}
      </button>
    ))}

    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      <ChevronRight size={20} />
    </button>
  </div>
);

export default Pagination;
