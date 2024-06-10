import React from "react";
import serviceImage from '../../components/assets/Nayum.jpg'; // Update import
import Navbar from "../Navbar/Navbar";
import './services.css'

const services = [
  { title: "Tour Packages", description: "Comprehensive tour packages to various destinations across India." },
  { title: "Hotel Booking", description: "Affordable and luxurious hotel booking services." },
  { title: "Flight Booking", description: "Convenient and cost-effective flight booking options." },
  { title: "Travel Insurance", description: "Reliable travel insurance plans for a worry-free trip." },
  { title: "Guided Tours", description: "Professional guides for city tours and excursions." },
  { title: "Car Rentals", description: "Comfortable and budget-friendly car rental services." },
  { title: "Visa Assistance", description: "Hassle-free visa assistance for international travelers." },
  { title: "Adventure Activities", description: "Exciting adventure activities for thrill-seekers." }

];

function Services() {
  const serviceImages = [
    // Use the imported image
    // serviceImage,
    // serviceImage,
    // Add more images as needed
  ];

  return (
    <div className="bg-white z-[9999] container mx-auto px-8 py-8">
      <Navbar />
      <h2 className="text-3xl font-bold mb-4 text-center">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="w-full p-4">
            <div className="service-outer">
              <div className="service-dot"></div>
              <div className="service-card">
                <div className="service-ray"></div>
                <div className="service-text text-lg sm:text-xl md:text-2xl lg:text-3xl">{service.title}</div>
                <div className="service-description text-sm sm:text-base md:text-lg lg:text-xl">{service.description}</div>
                <div className="service-line service-top-line"></div>
                <div className="service-line service-left-line"></div>
                <div className="service-line service-bottom-line"></div>
                <div className="service-line service-right-line"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
