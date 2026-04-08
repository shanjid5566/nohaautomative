import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, ChevronDown, Home, LogOut } from 'lucide-react';
import { selectUser } from '../../../store/slices/authSlice';
import Sidebar from './adminSidebar/Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className='flex h-dvh overflow-hidden bg-gray-50'>
      <div
        className={`fixed inset-0 z-20 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          sidebarOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden='true'
      />

      <aside
        id='sidebar'
        aria-label='Sidebar navigation'
        className={`
          fixed inset-y-0 left-0 z-30 w-72 transform transition-all duration-300 ease-in-out
          lg:relative lg:z-auto lg:shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${desktopOpen ? 'lg:translate-x-0 lg:w-72' : 'lg:translate-x-0 lg:w-16'}
        `}
      >
        <Sidebar
          onClose={() => setSidebarOpen(false)}
          onDesktopClose={() => setDesktopOpen(false)}
          onAutoCollapse={() => setDesktopOpen(false)}
          isCollapsed={!desktopOpen}
          onExpand={() => setDesktopOpen(true)}
        />
      </aside>

      <main className='flex-1 flex flex-col min-w-0 overflow-hidden'>
        <header className='lg:hidden flex items-center gap-3 h-14 px-4 bg-white border-b border-gray-100 shrink-0'>
          <button
            type='button'
            onClick={() => setSidebarOpen(true)}
            aria-expanded={sidebarOpen}
            aria-controls='sidebar'
            aria-label='Open navigation'
            className='p-2 -ml-1 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors'
          >
            <Menu size={20} aria-hidden='true' />
          </button>
        </header>

        {/* Desktop Header with User Dropdown */}
        <header className='hidden lg:flex items-center justify-end h-18 px-10 bg-white border-b border-[#E2E2E2] shrink-0'>
          <div className='relative'>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
              className='flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer'
            >

              <ChevronDown size={18} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div
                className='absolute top-full right-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <button
                  onClick={() => {
                    navigate('/');
                    setUserMenuOpen(false);
                  }}
                  className='flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100'
                >
                  <Home size={18} />
                  <span>Home</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Scrollable page area — data-lenis-prevent stops Lenis hijacking this scroll container */}
        <div className='flex-1 min-h-0 overflow-y-auto' data-lenis-prevent>
          <div className='w-full px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-8'>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
