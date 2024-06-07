import React from "react";
import serviceImage from '../../components/assets/Nayum.jpg'; // Update import
import Navbar from "../Navbar/Navbar";

const services = [
  { title: "Tour Packages", description: "Comprehensive tour packages to various destinations across India." },
  { title: "Hotel Booking", description: "Affordable and luxurious hotel booking services." },
  // { title: "Flight Booking", description: "Convenient and cost-effective flight booking options." },
  // { title: "Travel Insurance", description: "Reliable travel insurance plans for a worry-free trip." },
  { title: "Guided Tours", description: "Professional guides for city tours and excursions." },
  { title: "Car Rentals", description: "Comfortable and budget-friendly car rental services." },
  // { title: "Visa Assistance", description: "Hassle-free visa assistance for international travelers." },
];

function Services() {
  const serviceImages = [
     // Use the imported image
    // serviceImage,
    // serviceImage,
    // Add more images as needed
  ];

  return (
    <div className="container mx-auto px-8 py-8">
       <Navbar/>
      <h2 className="text-3xl font-bold mb-4 text-center">Our Services</h2>
      <div className="flex flex-wrap justify-center">
        {services.map((service, index) => (
          <div key={index} className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div
              className="rounded-lg overflow-hidden shadow-lg bg-white flex flex-col h-full transition-transform transform hover:scale-105 hover:shadow-2xl"
              style={{ backgroundImage: `url(${serviceImages[index % serviceImages.length]})` }}
            >
              <div className="p-4 flex flex-col flex-grow">
                <div className="font-bold text-xl mb-2">{service.title}</div>
                <p className="text-gray-700 text-base mb-4">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
