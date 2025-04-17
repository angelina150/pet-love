import { Suspense, lazy } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader.jsx";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const MainLayout = lazy(() => import("./pages/MainLayout/MainLayout.jsx"));
const NewsPage = lazy(() => import("./pages/NewsPage/NewsPage.jsx"));
const NoticesPage = lazy(() => import("./pages/NoticesPage/NoticesPage.jsx"));
const OurFriendsPage = lazy(() =>
  import("./pages/OurFriendsPage/OurFriendsPage.jsx")
);
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage.jsx")
);
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage.jsx"));
const AddPetPage = lazy(() => import("./pages/AddPetPage/AddPetPage.jsx"));
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/friends" element={<OurFriendsPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/add-pet" element={<AddPetPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
