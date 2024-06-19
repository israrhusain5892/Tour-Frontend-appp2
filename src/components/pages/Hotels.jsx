import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Select from 'react-select';

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [allHotels, setAllHotels] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedRoomType, setSelectedRoomType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 8;

    const hotelData = {
        cities: [
            {
                cityName: 'Agartala',
                hotels: [
                    {
                        hotelRating: '5 Star',
                        hotels: [
                            {
                                hotelName: 'Hotel Polo Towers',
                                hotelImage: 'https://www.hotelpolotowers.com/images/slider/home-banner.jpg',
                                hotelAddress: 'Gurkhabasti, Agartala, Tripura 799006',
                                prices: [
                                    { roomType: 'Standard', price: '8000 Rs per night' },
                                    { roomType: 'AC', price: '10000 Rs per night' },
                                    { roomType: 'Deluxe', price: '12000 per night' },
                                ],
                            },
                        ],
                    },
                    {
                        hotelRating: '4 Star',
                        hotels: [
                            {
                                hotelName: 'Hotel Sonar Tori',
                                hotelImage: 'https://lh3.googleusercontent.com/p/AF1QipOHRlzFqR3es0ITcsxc8c71NW4H_Mym5ZdET3WT=s1360-w1360-h1020',
                                hotelAddress: 'Belonia Road, Belonia, Tripura 799001',
                                prices: [
                                    { roomType: 'Standard', price: '4500 Rs per night' },
                                    { roomType: 'AC', price: '5500 Rs per night' },
                                    { roomType: 'Deluxe', price: '7500 per night' },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                cityName: 'Belonia',
                hotels: [
                    {
                        hotelRating: '3 Star',
                        hotels: [
                            {
                                hotelName: 'Hotel Blue Heaven',
                                hotelImage: 'https://gos3.ibcdn.com/5455ab8c26ec11eb858b0242ac110003.jpg',
                                hotelAddress: 'Palace Compound, Belonia, Tripura 799001',
                                prices: [
                                    { roomType: 'Standard', price: '5000 Rs per night' },
                                    { roomType: 'AC', price: '6000 Rs per night' },
                                    { roomType: 'Deluxe', price: '7000 per night' },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    };

    useEffect(() => {
        const states = hotelData.cities.map(city => ({
            value: city.cityName,
            label: city.cityName,
        }));
        setStates(states);
        setAllHotels(hotelData.cities);
        setLoading(false);
    }, []);

    useEffect(() => {
        let filteredHotels = allHotels;

        if (selectedState) {
            filteredHotels = filteredHotels.filter(city => city.cityName === selectedState);
        }

        if (selectedRating) {
            filteredHotels = filteredHotels.map(city => ({
                ...city,
                hotels: city.hotels.filter(hotel => hotel.hotelRating === selectedRating),
            }));
        }

        if (selectedRoomType) {
            filteredHotels = filteredHotels.map(city => ({
                ...city,
                hotels: city.hotels.map(rating => ({
                    ...rating,
                    hotels: rating.hotels.filter(hotel =>
                        hotel.prices.some(price => price.roomType === selectedRoomType)
                    ),
                })),
            }));
        }

        setHotels(filteredHotels);
    }, [selectedState, selectedRating, selectedRoomType, allHotels]);

    const handleStateChange = (selectedOption) => {
        setSelectedState(selectedOption ? selectedOption.value : '');
        setSelectedRating('');
        setSelectedRoomType('');
        setCurrentPage(1);
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
        setCurrentPage(1);
    };

    const handleRoomTypeChange = (roomType) => {
        setSelectedRoomType(roomType);
        setCurrentPage(1);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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
        <div className="hotels-page">
            <Navbar />
            <h2 className="text-5xl mt-28 font-bold text-center text-[#600180] mb-8">Available Hotels</h2>
            <div className="flex items-center p-6 bg-gray-100 min-h-screen">
                {/* Filter Section */}
                <div className="mr-12 -mt-28">
                    <div className="mb-6">
                        <Select
                            value={states.find(option => option.value === selectedState)}
                            onChange={handleStateChange}
                            options={states}
                            isClearable
                            placeholder="Select a state"
                            styles={customStyles}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => handleRatingChange('5 Star')}
                            className={`px-4 py-2 border rounded-md transition-colors text-[#600180] duration-200 ${selectedRating === '5 Star' ? 'bg-[#600180] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            5 Star
                        </button>
                        <button
                            onClick={() => handleRatingChange('4 Star')}
                            className={`px-4 py-2 border rounded-md transition-colors text-[#600180] duration-200 ${selectedRating === '4 Star' ? 'bg-[#600180] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            4 Star
                        </button>
                        <button
                            onClick={() => handleRatingChange('3 Star')}
                            className={`px-4 py-2 border rounded-md transition-colors text-[#600180] duration-200 ${selectedRating === '3 Star' ? 'bg-[#600180] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            3 Star
                        </button>
                        <button
                            onClick={() => handleRoomTypeChange('Standard')}
                            className={`px-4 py-2 border rounded-md transition-colors text-[#600180] duration-200 ${selectedRoomType === 'Standard' ? 'bg-[#600180] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => handleRoomTypeChange('AC')}
                            className={`px-4 py-2 border rounded-md transition-colors text-[#600180] duration-200 ${selectedRoomType === 'AC' ? 'bg-[#600180] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            AC
                        </button>
                        <button
                            onClick={() => handleRoomTypeChange('Deluxe')}
                            className={`px-4 py-2 border rounded-md transition-colors text-[#600180] duration-200 ${selectedRoomType === 'Deluxe' ? 'bg-[#600180] text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            Deluxe
                        </button>
                    </div>
                </div>
                {/* Hotel Listings */}
                <div className="flex mt-8 flex-col flex-1">
                    <div className="hotel-cards flex flex-wrap gap-6">
                        {hotels.slice(indexOfFirstItem, indexOfLastItem).map((city, cityIndex) =>
                            city.hotels.map((rating, ratingIndex) =>
                                rating.hotels.map((hotel, hotelIndex) => (
                                    <div className="hotel-card w-64 shadow-lg rounded-lg overflow-hidden bg-white transition-transform duration-300 shadow-lg hover:shadow-[#600180] hover:scale-110 cursor-pointer" key={`${cityIndex}-${ratingIndex}-${hotelIndex}`}>
                                        <div className="relative w-full h-40">
                                            <img src={hotel.hotelImage} alt={hotel.hotelName} className="absolute inset-0 w-full h-full object-cover" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg text-[#600180] font-bold mb-2">{hotel.hotelName}</h3>
                                            <p className="text-[#600180] text-opacity-70 mb-2">{hotel.hotelAddress}</p>
                                            <p className="text-[#600180] font-semibold">{hotel.prices.map(price => (
                                                <span key={price.roomType} className="block">{price.roomType}: {price.price}</span>
                                            ))}</p>
                                        </div>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            className="px-4 py-2 border rounded-md bg-[#600180] text-white hover:bg-gray-300 text-black disabled:opacity-30"
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span className='font-bold text-[#600180]'>Page {currentPage} of {Math.ceil(hotels.length / itemsPerPage)}</span>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            className="px-4 py-2 border rounded-md bg-[#600180] text-white hover:bg-gray-300 text-black"
                            disabled={currentPage === Math.ceil(hotels.length / itemsPerPage)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hotels;
