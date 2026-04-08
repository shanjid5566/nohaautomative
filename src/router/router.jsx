import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import ScrollToTop from '../components/shared/ScrollToTop';

const RootLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import AdminLayout from '../components/layout/admin/Layout';
import PublicLayout from '../components/layout/public/PublicLayout';
import { ROUTES } from '../config';
import { selectIsAuthenticated, selectUser } from '../store/slices/authSlice';

// Derive a relative segment from an absolute admin route path
const seg = (route) => route.replace(`${ROUTES.ADMIN}/`, '');

const Home = lazy(() => import('../pages/Home'));
const CarList = lazy(() => import('../pages/CarList'));
const CarDetail = lazy(() => import('../pages/CarDetail'));
const SellerProfile = lazy(() => import('../pages/SellerProfile'));
const SellerReviews = lazy(() => import('../pages/SellerReviews'));
const Chat = lazy(() => import('../pages/Chat'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Services = lazy(() => import('../pages/Services'));
const ReduxDemo = lazy(() => import('../pages/ReduxDemo'));
const Login = lazy(() => import('../pages/Login'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const OtpVerification = lazy(() => import('../pages/OtpVerification'));
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const SignUp = lazy(() => import('../pages/SignUp'));
const Profile = lazy(() => import('../pages/Profile'));
const SellerDashboard = lazy(() => import('../pages/seller/dashboard/SellerDashboard'));
const SellerListings = lazy(() => import('../pages/seller/listing/SellerListings'));
import ComingSoon from '../pages/ComingSoon';
import Dashboard from '../pages/admin/dashboard/Dashboard';

// Admin pages — each lazy-loaded so they only download when visited
const Vendor = lazy(() => import('../pages/admin/vendor/Vendor'));
const UserInformation = lazy(() => import('../pages/admin/userInformation/UserInformation'));
const AdminCarDetail = lazy(() => import('../components/shared/CarDetail'));

const Emails = lazy(() => import('../pages/admin/Emails'));
const Leads = lazy(() => import('../pages/admin/Leads'));
const Orders = lazy(() => import('../pages/admin/Orders'));
const MarketplaceOrders = lazy(
  () => import('../pages/admin/MarketplaceOrders'),
);
const CaseStudies = lazy(() => import('../pages/admin/CaseStudies'));
const Blog = lazy(() => import('../pages/admin/Blog'));
const Jobs = lazy(() => import('../pages/admin/Jobs'));
const Pricing = lazy(() => import('../pages/admin/Pricing'));

const PageLoader = () => (
  <div className='flex items-center justify-center min-h-screen'>
    <div className='w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin' />
  </div>
);

const NotFound = () => (
  <div className='flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4'>
    <h1 className='text-6xl font-bold text-gray-800'>404</h1>
    <p className='text-xl text-gray-500'>Page not found</p>
    <a
      href={ROUTES.HOME}
      className='mt-2 text-blue-600 hover:underline text-sm font-medium'
    >
      Back to Home
    </a>
  </div>
);

const DEFAULT_ROLE_ROUTE = {
  admin: ROUTES.ADMIN_DASHBOARD,
  seller: ROUTES.SELLER_DASHBOARD,
  user: ROUTES.USER_PROFILE,
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  const userRole = user?.role;
  if (allowedRoles?.length && !allowedRoles.includes(userRole)) {
    const fallbackRoute = DEFAULT_ROLE_ROUTE[userRole] || ROUTES.HOME;
    return <Navigate to={fallbackRoute} replace />;
  }

  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route element={<PublicLayout />}>
        {/* Home has its own full-page layout (Figma design with custom navbar/footer) */}
        <Route
          path={ROUTES.HOME}
          element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          }
        />

        {/* Car List has its own full-page layout (same Figma design system) */}
        <Route
          path={ROUTES.CAR_LIST}
          element={
            <Suspense fallback={<PageLoader />}>
              <CarList />
            </Suspense>
          }
        />

        {/* Car Detail page */}
        <Route
          path={ROUTES.CAR_DETAIL}
          element={
            <Suspense fallback={<PageLoader />}>
              <CarDetail />
            </Suspense>
          }
        />

        {/* Seller Profile page */}
        <Route
          path={ROUTES.SELLER_PROFILE}
          element={
            <Suspense fallback={<PageLoader />}>
              <SellerProfile />
            </Suspense>
          }
        />

        {/* Seller Reviews page */}
        <Route
          path={ROUTES.SELLER_REVIEWS}
          element={
            <Suspense fallback={<PageLoader />}>
              <SellerReviews />
            </Suspense>
          }
        />

        {/* Chat with Seller page */}
        <Route
          path={ROUTES.CHAT}
          element={
            <Suspense fallback={<PageLoader />}>
              <Chat />
            </Suspense>
          }
        />

        <Route
          element={
            <Suspense fallback={<PageLoader />}>
              <Layout />
            </Suspense>
          }
        >
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.SERVICES} element={<Services />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.REDUX_DEMO} element={<ReduxDemo />} />
        </Route>
      </Route>

      <Route
        path={ROUTES.LOGIN}
        element={
          <Suspense fallback={<PageLoader />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.FORGOT_PASSWORD}
        element={
          <Suspense fallback={<PageLoader />}>
            <ForgotPassword />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.OTP_VERIFICATION}
        element={
          <Suspense fallback={<PageLoader />}>
            <OtpVerification />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.RESET_PASSWORD}
        element={
          <Suspense fallback={<PageLoader />}>
            <ResetPassword />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SIGN_UP}
        element={
          <Suspense fallback={<PageLoader />}>
            <SignUp />
          </Suspense>
        }
      />

      {/* Seller dashboard — same layout, different sidebar nav */}
      <Route
        path={ROUTES.SELLER}
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute allowedRoles={['seller']}>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route path='dashboard' element={<SellerDashboard />} />
        <Route path='listings' element={<SellerListings />} />
        <Route path='message' element={<Chat />} />
        <Route path='settings' element={<Profile />} />
        <Route path='orders' element={<ComingSoon />} />
        <Route path='analytics' element={<ComingSoon />} />
      </Route>

      {/* User dashboard — same layout, different sidebar nav */}
      <Route
        path={ROUTES.USER}
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute allowedRoles={['user']}>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route path='profile' element={<Profile />} />
        <Route path='orders' element={<ComingSoon />} />
        <Route path='saved' element={<ComingSoon />} />
        <Route path='message' element={<Chat />} />
      </Route>

      <Route
        path={ROUTES.ADMIN}
        element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route path={seg(ROUTES.ADMIN_DASHBOARD)} element={<Dashboard />} />
        <Route path={seg(ROUTES.ADMIN_USER_INFORMATION)} element={<UserInformation />} />
        <Route path={seg(ROUTES.ADMIN_VENDOR)} element={<Vendor />} />
        <Route path={seg(ROUTES.ADMIN_LEADS)} element={<Leads />} />
        <Route path={seg(ROUTES.ADMIN_ORDERS)} element={<Orders />} />
        <Route
          path={seg(ROUTES.ADMIN_MARKETPLACE_ORDERS)}
          element={<MarketplaceOrders />}
        />
        <Route
          path={seg(ROUTES.ADMIN_CASE_STUDIES)}
          element={<CaseStudies />}
        />
        <Route path={seg(ROUTES.ADMIN_BLOG)} element={<Blog />} />
        <Route path={seg(ROUTES.ADMIN_JOBS)} element={<Jobs />} />
        <Route path={seg(ROUTES.ADMIN_PRICING)} element={<Pricing />} />
        <Route path={seg(ROUTES.ADMIN_SETTINGS)} element={<Profile />} />
        <Route path={seg(ROUTES.ADMIN_CAR_DETAIL)} element={<AdminCarDetail />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Route>,
  ),
);

export default router;
