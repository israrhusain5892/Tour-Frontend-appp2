import React from 'react';
import Admin from './Admin';

function Adminmain(props) {
    return (
        <Admin>
        <div>

            <div className="grid overflow-y-scroll md:overflow-y-scroll md:h-[400px] h-[680px] w-full md:w-full  mx-auto md:px-20 px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                {/* <!-- Trips Card --> */}
                <div class="bg-white  hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center md:space-x-4">
                    <div class="bg-blue-500 text-white p-4 rounded-full">
                        <i class="fas fa-plane-departure fa-2x"></i>
                    </div>
                    <div>
                        <h2 class="md:text-xl font-semibold">Trips</h2>
                        <p class="text-gray-600 md:text-3xl font-bold">150</p>
                    </div>
                </div>

                {/* <!-- Hotels Card --> */}
                <div class="bg-white  hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <div class="bg-green-500 text-white p-4 rounded-full">
                        <i class="fas fa-hotel fa-2x"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold">Hotels</h2>
                        <p class="text-gray-600 text-3xl font-bold">45</p>
                    </div>
                </div>

                {/* <!-- Vehicles Card --> */}
                <div class="bg-white   hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <div class="bg-yellow-500 text-white p-4 rounded-full">
                        <i class="fas fa-car fa-2x"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold">Vehicles</h2>
                        <p class="text-gray-600 text-3xl font-bold">75</p>
                    </div>
                </div>

                {/* trip booking card */}
                <div class="bg-white   hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <div class="bg-yellow-500 text-white p-4 rounded-full">
                        <i class="fas fa-car fa-2x"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold">Trip Booking</h2>
                        <p class="text-gray-600 text-3xl font-bold">75</p>
                    </div>
                </div>


                <div class="bg-white  hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <div class="bg-yellow-500 text-white p-4 rounded-full">
                        <i class="fas fa-car fa-2x"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold">Vehice Booking</h2>
                        <p class="text-gray-600 text-3xl font-bold">75</p>
                    </div>
                </div>

                <div class="bg-white  hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <div class="bg-yellow-500 text-white p-4 rounded-full">
                        <i class="fas fa-car fa-2x"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold">Hotel Booking</h2>
                        <p class="text-gray-600 text-3xl font-bold">75</p>
                    </div>
                </div>

            </div>

        </div>
        </Admin>
    );
}

export default Adminmain;