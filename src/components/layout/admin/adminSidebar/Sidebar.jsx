import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { ROUTES } from '../../../../config';
import { selectUser, logout } from '../../../../store/slices/authSlice';
import {
  LayoutDashboard,
  Mail,
  Users,
  ShoppingCart,
  Store,
  Briefcase,
  FileText,
  ClipboardList,
  DollarSign,
  Car,
  BarChart2,
  MessageCircle,
  Heart,
  User,
  LogOut,
  X,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
  Package,
  MessageSquare,
  Settings,
} from 'lucide-react';

const ROLE_NAV = {
  admin: [
    {
      name: 'Requested Listings',
      path: ROUTES.ADMIN_DASHBOARD,
      icon: LayoutDashboard,
      end: true,
    },
    
    { name: 'Vendor', path: ROUTES.ADMIN_VENDOR, icon: Users },
    { name: 'User Information', path: ROUTES.ADMIN_USER_INFORMATION, icon: Mail },
    { name: 'Settings', path: ROUTES.ADMIN_SETTINGS, icon: ShoppingCart },
  ],
  seller: [
    {
      name: 'Dashboard',
      path: ROUTES.SELLER_DASHBOARD,
      icon: LayoutDashboard,
      end: true,
    },
    { name: 'My Listings', path: ROUTES.SELLER_LISTINGS, icon: Car },
    { name: 'Message', path: ROUTES.SELLER_MESSAGE, icon: MessageCircle },
    { name: 'Settings', path: ROUTES.SELLER_SETTINGS, icon: Settings },
  ],
  user: [
    { name: 'Profile', path: ROUTES.USER_PROFILE, icon: User, end: true },
    { name: 'Message', path: ROUTES.USER_MESSAGE, icon: MessageCircle },
  ],
};

const ROLE_LABELS = {
  admin: 'Admin',
  seller: 'Seller',
  user: 'User',
};

const Sidebar = ({
  onClose,
  onDesktopClose,
  onAutoCollapse,
  isCollapsed,
  onExpand,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navItems = ROLE_NAV[user?.role] ?? ROLE_NAV.user;
  const dashboardLabel = ROLE_LABELS[user?.role] ?? 'Dashboard';

  // Check if user is on car detail page (/admin/cars/:id)
  const isOnCarDetailPage = location.pathname.startsWith('/admin/cars/');

  const handleLogout = () => {
    toast.success('Signed out successfully');
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setTimeout(() => navigate(ROUTES.LOGIN), 900);
  };

  if (isCollapsed) {
    return (
      <div className='h-full w-full bg-white flex flex-col items-center border-r border-[#E2E2E2] py-3 gap-1 shadow-[0px_3px_4px_rgba(0,0,0,0.12)]'>
        <button
          type='button'
          onClick={onExpand}
          title='Expand sidebar'
          aria-label='Expand sidebar'
          className='w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-200 mb-2 shrink-0'
        >
          <ChevronsRight size={20} aria-hidden='true' />
        </button>

        <nav
          className='flex-1 flex flex-col items-center gap-1 w-full px-2 overflow-y-auto'
          aria-label='Main navigation'
        >
          {navItems.map(({ name, path, icon: Icon, end, autoCollapse }) => (
            <NavLink
              key={path}
              to={path}
              end={!!end}
              title={name}
              onClick={() => {
                onClose();
                if (autoCollapse && onAutoCollapse) onAutoCollapse();
              }}
              className={({ isActive }) => {
                // Mark dashboard as active if on car detail page
                const shouldBeActive = isActive || (path === ROUTES.ADMIN_DASHBOARD && isOnCarDetailPage);
                return `w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                  shouldBeActive
                    ? 'bg-[#6C3BFF] text-white'
                    : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                }`;
              }}
            >
              <Icon size={20} aria-hidden='true' />
            </NavLink>
          ))}
        </nav>

        <button
          type='button'
          onClick={handleLogout}
          title='Sign Out'
          aria-label='Sign Out'
          className='mt-1 w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#DE0000] hover:bg-red-50 transition-colors duration-200 shrink-0'
        >
          <LogOut size={20} aria-hidden='true' />
        </button>
      </div>
    );
  }

  return (
    <div className='h-full w-full bg-white flex flex-col border-r border-gray-200 shadow-[0px_3px_4px_rgba(0,0,0,0.12)]'>
      {/* Header with Logo */}
      <div className='flex items-start justify-between px-5 pt-5 pb-4 border-b border-[#E2E2E2] shrink-0'>
        <Link to='/'>
          <img
            src='/Logo.png'
            alt='Maktech'
            width={200}
            height={36}
            className='h-9 w-auto object-contain'
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </Link>
        <button
          type='button'
          onClick={onClose}
          className='lg:hidden mt-0.5 p-1.5 -mr-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
          aria-label='Close navigation'
        >
          <X size={20} aria-hidden='true' />
        </button>
        <button
          type='button'
          onClick={onDesktopClose}
          className='hidden lg:flex items-center justify-center mt-0.5 p-1.5 -mr-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-orange-50/40 transition-colors'
          aria-label='Collapse sidebar'
        >
          <ChevronsLeft size={20} aria-hidden='true' />
        </button>
      </div>

      {/* Main Menu Label */}
      <div className='px-6 py-2 mt-1 flex items-center'>
        <p className='text-xs font-semibold text-[#707070] uppercase tracking-[0.08em]'>
          Main menu
        </p>
      </div>

      {/* Navigation Items */}
      <nav className='flex-1 overflow-y-auto px-3 py-0' aria-label='Main navigation'>
        <ul className='space-y-1' role='list'>
          {navItems.map(({ name, path, icon: Icon, end, autoCollapse }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={!!end}
                onClick={() => {
                  onClose();
                  if (autoCollapse && onAutoCollapse) onAutoCollapse();
                }}
                className={({ isActive }) => {
                  // Mark dashboard as active if on car detail page
                  const shouldBeActive = isActive || (path === ROUTES.ADMIN_DASHBOARD && isOnCarDetailPage);
                  return `flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 ${
                    shouldBeActive
                      ? 'bg-[#6C3BFF] text-white'
                      : 'text-[#373737] hover:bg-gray-50'
                  }`;
                }}
              >
                {({ isActive }) => {
                  // Mark dashboard as active if on car detail page
                  const shouldBeActive = isActive || (path === ROUTES.ADMIN_DASHBOARD && isOnCarDetailPage);
                  return (
                    <>
                      <Icon
                        size={20}
                        aria-hidden='true'
                        className={`shrink-0 ${
                          shouldBeActive ? 'text-white' : 'text-[#373737]'
                        }`}
                      />
                      <span className='truncate flex-1 font-normal'>{name}</span>
                    </>
                  );
                }}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer with Logout */}
      <div className='shrink-0 border-t border-[#E2E2E2] px-4 py-3'>
        <button
          type='button'
          onClick={handleLogout}
          className='w-full flex items-center justify-center gap-2 py-3 text-[#DE0000] font-medium text-base border border-[#f07a7a41] hover:bg-red-50/30 transition-colors rounded'
        >
          Log Out
          <LogOut size={20} aria-hidden='true' />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
