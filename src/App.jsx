import { Suspense, lazy, useEffect } from 'react';
import './App.css';
import Loader from './components/Loader/Loader.jsx';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectLoading,
  selectToken,
} from './redux/users/selectors.js';
import { fetchUserFullInfo, setToken } from './redux/users/operations.js';
import { selectLoadingNotices } from './redux/notices/selectors.js';
import { selectNewsLoading } from './redux/news/selectors.js';
import { selectLoadingFriends } from './redux/friends/selectors.js';

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
  const loadingUser = useSelector(selectLoading);
  const loadingNotices = useSelector(selectLoadingNotices);
  const loadingNews = useSelector(selectNewsLoading);
  const loadingFriends = useSelector(selectLoadingFriends);
  const loading =
    loadingUser || loadingNotices || loadingNews || loadingFriends;
  useEffect(() => {
    if (token && isLoggedIn) {
      setToken(token);
      dispatch(fetchUserFullInfo());
    }
  }, [dispatch, token, isLoggedIn]);
  return (
    <>
      <Loader loading={loading} />
      <ToastContainer />
      <Suspense fallback={<Loader loading={loading} />}>
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
