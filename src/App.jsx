import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import Footer from "./components/Footer/Footer";
import Hotels from "./components/pages/Hotels";
import Transportation from "./components/pages/Transportation";
import Budget from "./components/pages/Budget";
import Favourites from "./components/pages/Favourites";
import Rentals from "./components/pages/Rentals";
import Login from "./components/login-singin/Login";
import Register from "./components/login-singin/Register";
import Home from "./components/home/home";
import Packages from "./components/pages/Packages";
import Admin from "./components/Admin/Admin";
import TripForm from "./components/Admin/TripForm";
import TripViewPage from "./components/Admin/TripViewPage";
import HotelForm from "./components/Admin/HotelForm";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Adminmain from "./components/Admin/Adminmain";
import 'remixicon/fonts/remixicon.css';

const queryClient = new QueryClient();

function App() {
  const [favourites, setFavourites] = useState([]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          {/* <NavBar /> */}
          <div className="bg-[#f8fafc] w-full min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packages" element={<Packages setFavourites={setFavourites} />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/transportation" element={<Transportation />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/favourites" element={<Favourites favourites={favourites} />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin">
                <Route path="tripform" element={<TripForm />} />
                <Route path="tripview" element={<TripViewPage />} />
                <Route path="dashboard" element={<Adminmain />} />
                <Route path="hotelform" element={<HotelForm />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
