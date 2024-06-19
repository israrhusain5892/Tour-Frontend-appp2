import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";
import Select from 'react-select';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Packages = ({ setFavourites }) => {
    const [trips, setTrips] = useState([]);
    const [allTrips, setAllTrips] = useState([]);
    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // Loading state
    const [searchQuery, setSearchQuery] = useState(''); // Search query state
    const [favourites, setLocalFavourites] = useState([]); // Local state for favourites
    const itemsPerPage = 8; // 2 rows with 4 items each

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const tripsResponse = await axios.get('https://indian-tourism-1.onrender.com/public/trip/');
                const statesResponse = await axios.get('https://indian-tourism-1.onrender.com/public/state/');
                const categoriesResponse = await axios.get('https://indian-tourism-1.onrender.com/public/tripCategory/');

                setAllTrips(tripsResponse.data); // Store all trips for filtering
                setTrips(tripsResponse.data.slice(0, itemsPerPage)); // Load only initial trips
                setStates(statesResponse.data.map(state => ({ value: state.stateName, label: state.stateName })));
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
            setLoading(false);
        };

        const loadFavourites = () => {
            const savedFavourites = localStorage.getItem('favourites');
            if (savedFavourites) {
                setLocalFavourites(JSON.parse(savedFavourites));
            }
        };

        fetchData();
        loadFavourites();
    }, []);

    const handleStateChange = (selectedOption) => {
        const state = selectedOption ? selectedOption.value : '';
        setSelectedState(state);
        setCurrentPage(1); // Reset to first page
        filterTrips(state, selectedCategory, 1, searchQuery);
    };

    const handleCategoryClick = (category) => {
        const newCategory = category.categoryName === selectedCategory ? '' : category.categoryName;
        setSelectedCategory(newCategory);
        setCurrentPage(1); // Reset to first page
        filterTrips(selectedState, newCategory, 1, searchQuery);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page
        filterTrips(selectedState, selectedCategory, 1, query);
    };

    const filterTrips = (state, category, page, query) => {
        setLoading(true);
        let filtered = allTrips;

        if (state) {
            filtered = filtered.filter(trip => trip.stateName === state);
        }

        if (category) {
            filtered = filtered.filter(trip => trip.categoryName === category);
        }

        if (query) {
            filtered = filtered.filter(trip =>
                trip.tripName.toLowerCase().includes(query.toLowerCase()) ||
                trip.tripAddress.toLowerCase().includes(query.toLowerCase()) ||
                trip.stateName.toLowerCase().includes(query.toLowerCase()) ||
                trip.categoryName.toLowerCase().includes(query.toLowerCase())
            );
        }

        const startIndex = (page - 1) * itemsPerPage;
        setTimeout(() => {
            setTrips(filtered.slice(startIndex, startIndex + itemsPerPage));
            setLoading(false);
        }, 500); // Simulate loading time
    };

    const handlePageChange = (direction) => {
        setLoading(true);
        const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        setCurrentPage(newPage);
        setTimeout(() => {
            filterTrips(selectedState, selectedCategory, newPage, searchQuery);
        }, 500); // Simulate loading time
    };

    const handleAddToFavourites = (trip) => {
        setLocalFavourites(prevFavourites => {
            const updatedFavourites = prevFavourites.some(fav => fav.tripId === trip.tripId)
                ? prevFavourites.filter(fav => fav.tripId !== trip.tripId)
                : [...prevFavourites, trip];
            setFavourites(updatedFavourites); // Update the favourites in parent component
            localStorage.setItem('favourites', JSON.stringify(updatedFavourites)); // Save to local storage
            return updatedFavourites;
        });
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            borderColor: '#600180',
            boxShadow: 'none',
            cursor: 'pointer',
            '&:hover': {
                borderColor: '#600180',
            },
        }),
        option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? 'white' : '#600180',
            backgroundColor: state.isSelected ? '#600180' : 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
                backgroundColor: '#f0e4f7',
                boxShadow: '0 4px 6px -1px rgba(96, 1, 128, 0.5)',
                borderColor: '#600180',
                borderRadius: '20px',
                transform: 'scale(1.1)',
            },
        }),
    };

    return (
        <>
            <Navbar />
            <h2 className="text-5xl mt-28 font-bold text-center text-[#600180] mb-8">Our Exclusive Tour Packages</h2>

            <div className="flex items-center p-6 bg-gray-100 min-h-screen">
                {/* Left Side (Dashboard Menu) */}
                <div className="mr-12 -mt-28">
                    {/* State Dropdown */}
                    <div className="mb-6">
                        <Select
                            value={states.find(option => option.value === selectedState)}
                            onChange={handleStateChange}
                            options={states}
                            isClearable
                            placeholder="All States"
                            styles={customStyles}
                        />
                    </div>
                    {/* Category Buttons */}
                    <div className="flex flex-col gap-2">
                        {categories.map(category => (
                            <button
                                key={category.tripCategoryId}
                                className={`px-4 py-2 border rounded-md transition-colors text-[#600180] duration-200 ${selectedCategory === category.categoryName ? 'bg-[#600180] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category.categoryName}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Right Side (Results and Filtering Options) */}
                <div className="flex mt-8 flex-col flex-1">
                    {/* Search Bar */}
                    <div className="flex justify-center mb-6">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="w-2/3 max-w-md px-4 py-2 border rounded-md focus:outline-none focus:border-[#600180] bg-gray-200 hover:bg-gray-300"
                        />
                    </div>
                    {/* Results */}
                    <div className="flex flex-wrap gap-6">
                        {loading ? (
                            Array.from({ length: itemsPerPage }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col bg-neutral-300 w-64 h-64 animate-pulse rounded-xl p-4 gap-4"
                                >
                                    <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
                                    <div className="flex flex-col gap-2">
                                        <div className="bg-[#600180] bg-opacity-50 w-full h-4 animate-pulse rounded-md"></div>
                                        <div className="bg-[#600180] bg-opacity-50 w-4/5 h-4 animate-pulse rounded-md"></div>
                                        <div className="bg-[#600180] bg-opacity-50 w-full h-4 animate-pulse rounded-md"></div>
                                        <div className="bg-[#600180] bg-opacity-50 w-2/4 h-4 animate-pulse rounded-md"></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            trips.map(trip => (
                                <div key={trip.tripId} className="w-64 shadow-[#000000] rounded-lg overflow-hidden bg-white transition-transform duration-300 shadow-lg hover:shadow-[#600180]   hover:scale-110 cursor-pointer">
                                    <div className="relative w-full h-40">
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                            <div className="flex-col gap-4 w-full flex items-center justify-center">
                                                <div className="w-20 h-20 border-8 text-[#600180] text-4xl animate-spin border-[#600180] border-opacity-50 flex items-center justify-center border-t-gray-300 rounded-full">
                                                    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping">
                                                        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <img
                                                src={trip.url}
                                                alt={trip.tripName}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-120"
                                                onLoad={(e) => e.target.style.display = 'block'}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg text-[#600180] font-bold mb-2">{trip.tripName}</h3>
                                        <p className="text-[#600180] text-opacity-70 mb-2">{trip.tripAddress}</p>
                                        <p className="text-[#600180] font-semibold">Price: ₹{trip.tripPrice}</p>
                                        <button
                                            onClick={() => handleAddToFavourites(trip)}
                                            className={`mt-2 px-4 py-2 border rounded-md transition-colors duration-200 ${favourites.some(fav => fav.tripId === trip.tripId) ? 'bg-[#600180] text-white' : 'bg-gray-200 text-[#600180] hover:bg-gray-300'}`}
                                        >
                                            {favourites.some(fav => fav.tripId === trip.tripId) ? 'Added to Wish List' : 'Add to Wish List'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {/* Filtering Options */}
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <button
                            onClick={() => handlePageChange('prev')}
                            className="px-4 py-2 border rounded-md bg-[#600180] text-white hover:bg-gray-300 text-black disabled:opacity-30"
                            disabled={currentPage === 1}
                        >
                            <FaArrowAltCircleLeft style={{ color: 'white', fontSize: '24px' }} />

                        </button>
                        <span className='font-bold text-[#600180]'>Page {currentPage} of {Math.ceil(allTrips.length / itemsPerPage)}</span>
                        <button
                            onClick={() => handlePageChange('next')}
                            className="px-4 py-2 border rounded-md bg-[#600180] text-white hover:bg-gray-300 text-black"
                            disabled={currentPage === Math.ceil(allTrips.length / itemsPerPage)}
                        >
                            <FaArrowAltCircleRight style={{ color: 'white', fontSize: '24px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Packages;
