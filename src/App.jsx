import { Suspense, lazy, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, selectToken } from './redux/users/selectors.js';
import {
  clearToken,
  fetchUserFullInfo,
  setToken,
} from './redux/users/operations.js';
import { getTokenExpiration } from './utils.js';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const MainPage = lazy(() => import('./pages/MainPage/MainPage.jsx'));
const MainLayout = lazy(() => import('./components/MainLayout/MainLayout.jsx'));
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage.jsx'));
const NoticesPage = lazy(() => import('./pages/NoticesPage/NoticesPage.jsx'));
const OurFriendsPage = lazy(() =>
  import('./pages/OurFriendsPage/OurFriendsPage.jsx')
);
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage.jsx')
);
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage.jsx'));
const AddPetPage = lazy(() => import('./pages/AddPetPage/AddPetPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'));

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!token) return;

    const exp = getTokenExpiration(token);
    if (exp && Date.now() > exp) {
      dispatch(clearToken());
      return;
    }

    if (isLoggedIn) {
      setToken(token);
      dispatch(fetchUserFullInfo());
    }
  }, [dispatch, token, isLoggedIn]);
  return (
    <>
      <ToastContainer />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/friends" element={<OurFriendsPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/add-pet" element={<AddPetPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
