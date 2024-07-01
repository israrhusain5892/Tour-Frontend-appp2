import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Navbar/Navbar";
import Select from 'react-select';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import Footer from "../Footer/Footer";
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai'; // Import close icon
import HotelCarousel from './HotelCarousel';
import { color } from 'framer-motion';
import { FaSearch } from "react-icons/fa";
import apiUrl from '../../Axios';

const Hotels = ({ setFavourites }) => {
    const [hotels, setHotels] = useState([]);
    const [allHotels, setAllHotels] = useState([]);
    const [states, setStates] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        roomType: 'Standard',
        numberOfRooms: 1,
        totalPrice: 0,
    });
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const hotelsResponse = await axios.get(`${apiUrl}/public/hotel/`);
                const statesResponse = await axios.get(`${apiUrl}/public/state/`);

                setAllHotels(hotelsResponse.data);
                setHotels(hotelsResponse.data.slice(0, itemsPerPage));
                setStates(statesResponse.data.map(state => ({ value: state.stateName, label: state.stateName })));

                const typesArray = [...new Set(hotelsResponse.data.map(hotel => hotel.type.trim().toLowerCase()))];
                setTypes(typesArray.map(type => ({ value: type, label: type.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') })));
            } catch (error) {
                console.error("Error fetching data", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleStateChange = (selectedOption) => {
        const state = selectedOption ? selectedOption.value : '';
        setSelectedState(state);
        setCurrentPage(1);
        filterHotels(state, selectedType, 1, searchQuery);
    };

    const handleTypeClick = (type) => {
        const newType = type.value === selectedType ? '' : type.value;
        setSelectedType(newType);
        setCurrentPage(1);
        filterHotels(selectedState, newType, 1, searchQuery);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        setCurrentPage(1);
        filterHotels(selectedState, selectedType, 1, query);
    };

    const filterHotels = (state, type, page, query) => {
        setLoading(true);
        let filtered = allHotels;

        if (state) {
            filtered = filtered.filter(hotel => hotel.state === state);
        }

        if (type) {
            filtered = filtered.filter(hotel => hotel.type.trim().toLowerCase() === type);
        }

        if (query) {
            filtered = filtered.filter(hotel =>
                hotel.name.toLowerCase().includes(query.toLowerCase()) ||
                hotel.address.toLowerCase().includes(query.toLowerCase()) ||
                hotel.city.toLowerCase().includes(query.toLowerCase()) ||
                hotel.state.toLowerCase().includes(query.toLowerCase()) ||
                hotel.type.trim().toLowerCase().includes(query.toLowerCase())
            );
        }

        const startIndex = (page - 1) * itemsPerPage;
        setTimeout(() => {
            setHotels(filtered.slice(startIndex, startIndex + itemsPerPage));
            setLoading(false);
        }, 500);
    };

    const handlePageChange = (direction) => {
        setLoading(true);
        const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        setCurrentPage(newPage);
        setTimeout(() => {
            filterHotels(selectedState, selectedType, newPage, searchQuery);
        }, 500);
    };

    const handleBookNow = (hotel) => {
        setSelectedHotel(hotel);
        setFormData({
            name: '',
            mobileNumber: '',
            roomType: 'Standard',
            numberOfRooms: 1,
            totalPrice: hotel.price,
        });
        setModalIsOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
            totalPrice: calculateTotalPrice(prevFormData.roomType, prevFormData.numberOfRooms, selectedHotel.price)
        }));
    };

    const handleRoomTypeChange = (selectedOption) => {
        const roomType = selectedOption ? selectedOption.value : 'Standard';
        setFormData(prevFormData => ({
            ...prevFormData,
            roomType: roomType,
            totalPrice: calculateTotalPrice(roomType, prevFormData.numberOfRooms, selectedHotel.price)
        }));
    };

    const handleRoomsChange = (e) => {
        const numberOfRooms = parseInt(e.target.value);
        setFormData(prevFormData => ({
            ...prevFormData,
            numberOfRooms: numberOfRooms,
            totalPrice: calculateTotalPrice(prevFormData.roomType, numberOfRooms, selectedHotel.price)
        }));
    };

    const calculateTotalPrice = (roomType, numberOfRooms, price) => {
        let roomPrice = price;
        if (roomType === 'Executive') roomPrice = 1.5 * price;
        if (roomType === 'Deluxe') roomPrice = 2 * price;
        if (roomType === 'Executive Suite') roomPrice = 2.5 * price;
        return roomPrice * numberOfRooms;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setModalIsOpen(false);
        alert("Hotel booked successfully!");
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
                color: 'black',
                boxShadow: '0 4px 6px -1px rgba(96, 1, 128, 0.5)',
                borderColor: '#600180',
                borderRadius: '20px',
                transform: 'scale(1.0)',
            },
        }),
    };

    return (
        <>
            <Navbar />
            <HotelCarousel />
            <h2 className="text-5xl mt-8 font-bold text-center text-[#600180] mb-8">Our Exclusive Hotels</h2>

            <div className="flex items-center p-6 bg-gray-100 min-h-screen">
                <div className="mr-12 -mt-[416px]">
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
                    <div className="flex flex-col gap-2">
                        {types.map(type => (
                            <button
                                key={type.value}
                                className={`px-4 py-2 border rounded-md transition-colors text-[#600180] duration-200 ${selectedType === type.value ? 'bg-[#600180] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                onClick={() => handleTypeClick(type)}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex mt-8 flex-col flex-1">
                <div className="flex  justify-end mb-6">
                        <FaSearch className=' absolute text-lg mt-3 mr-3' />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:border-[#600180] bg-gray-200 hover:bg-gray-300"
                        />
                    </div>
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
                            hotels.map(hotel => (
                                <div key={hotel.id} className="w-64 shadow-[#000000] rounded-lg overflow-hidden bg-white transition-transform duration-300 shadow-lg hover:shadow-[#600180] hover:scale-105 cursor-pointer">
                                    <div className="relative w-full h-40">
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                            <div className="flex-col gap-4 w-full flex items-center justify-center">
                                                <div className="w-20 h-20 border-8 text-[#600180] text-4xl animate-spin border-[#600180] border-opacity-50 flex items-center justify-center border-t-gray-300 rounded-full">
                                                    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping">
                                                        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="overflow-hidden">
                                                <img
                                                    src={hotel.url}
                                                    alt={hotel.name}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                                    onLoad={(e) => e.target.style.display = 'block'}
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg text-[#600180] font-bold mb-2">{hotel.name}</h3>
                                        <p className="text-[#600180] text-opacity-70 mb-2">{hotel.address}</p>
                                        <p className="text-[#600180] text-opacity-70 mb-2">Standard Room: <strong>₹{hotel.price}</strong></p>
                                        <button
                                            onClick={() => handleBookNow(hotel)}
                                            className="mt-2 px-4 py-2 border rounded-md transition-colors duration-200 bg-[#600180] text-white hover:bg-gray-300 hover:text-black text-black"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <button
                            onClick={() => handlePageChange('prev')}
                            className="px-4 py-2 border rounded-md bg-[#600180] text-white hover:bg-gray-300 text-black disabled:opacity-30"
                            disabled={currentPage === 1}
                        >
                            <FaArrowAltCircleLeft style={{ color: 'white', fontSize: '24px' }} />
                        </button>
                        <span className='font-bold text-[#600180]'>Page {currentPage} of {Math.ceil(allHotels.length / itemsPerPage)}</span>
                        <button
                            onClick={() => handlePageChange('next')}
                            className="px-4 py-2 border rounded-md bg-[#600180] text-white hover:bg-gray-300 text-black"
                            disabled={currentPage === Math.ceil(allHotels.length / itemsPerPage)}
                        >
                            <FaArrowAltCircleRight style={{ color: 'white', fontSize: '24px' }} />
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Booking Modal"
                className="flex items-center mt-8 justify-center min-h-screen bg-gray-100 bg-opacity-80"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
                    <button onClick={() => setModalIsOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
                        <AiOutlineClose size={24} />
                    </button>
                    <h2 className="text-2xl font-bold text-[#600180] mb-4">Book Hotel</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[#600180] mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#600180]"
                            />
                        </div>
                        <div>
                            <label className="block text-[#600180] mb-1">Mobile Number</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#600180]"
                            />
                        </div>
                        <div>
                            <label className="block text-[#600180] mb-1">Type of Room</label>
                            <Select className='text-black bg-gray-300'
                                value={{ value: formData.roomType, label: formData.roomType }}
                                onChange={handleRoomTypeChange}
                                options={[
                                    { value: 'Standard', label: 'Standard ' },
                                    { value: 'Executive', label: 'Executive' },
                                    { value: 'Deluxe', label: 'Deluxe' },
                                    { value: 'Executive Suite', label: 'Executive Suite' },
                                ]}
                                styles={customStyles}
                            />
                        </div>
                        <div>
                            <label className="block text-[#600180] mb-1">Number of Rooms</label>
                            <input
                                type="number"
                                name="numberOfRooms"
                                value={formData.numberOfRooms}
                                onChange={handleRoomsChange}
                                min="1"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#600180]"
                            />
                        </div>
                        <div>
                            <label className="block text-[#600180] mb-1">Total Price</label>
                            <input
                                type="text"
                                name="totalPrice"
                                value={formData.totalPrice}
                                readOnly
                                className="w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 mt-4 bg-[#600180] text-white rounded-md hover:bg-gray-300 text-black"
                        >
                            Book Now
                        </button>
                    </form>
                </div>
            </Modal>

            <Footer />
        </>
    );
};

export default Hotels;
