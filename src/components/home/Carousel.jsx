import React, { useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import car1 from '../../components/assets/car1.jpg';
import car2 from '../../components/assets/car2.jpg';
import car3 from '../../components/assets/car3.jpg';
import car4 from '../../components/assets/car4.jpg';
import car5 from '../../components/assets/car5.jpg';
import car6 from '../../components/assets/car6.jpg';
import car7 from '../../components/assets/car7.jpg';

const slides = [
  { img: car1, title: "Explore the Himalayas", desc: "Discover the stunning landscapes of the Himalayas." },
  { img: car2, title: "The Taj Mahal", desc: "Witness the grandeur of the Taj Mahal." },
  { img: car3, title: "Kerala Backwaters", desc: "Relax in Kerala's serene backwaters and houseboats." },
  { img: car4, title: "Jama Masjid", desc: "Marvel at Delhi's grand Jama Masjid mosque." },
  { img: car5, title: "Munnar Hills", desc: "Enjoy the lush green hills of Munnar." },
  { img: car6, title: "Victoria Memorial Hall", desc: "Iconic Kolkata monument with museum and gardens." },
  { img: car7, title: "Mysore Palace", desc: "Explore the majestic Mysore Palace in Karnataka." },
];

function Carousel() {
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const startCarousel = () => {
    intervalRef.current = setInterval(() => {
      const nextButton = carouselRef.current.querySelector('[data-te-carousel-control-next]');
      if (nextButton) nextButton.click();
    }, 5000);
  };

  useEffect(() => {
    startCarousel();

    const handleMouseEnter = () => clearInterval(intervalRef.current);
    const handleMouseLeave = startCarousel;

    const carouselElement = carouselRef.current;

    if (carouselElement) {
      carouselElement.addEventListener('mouseenter', handleMouseEnter);
      carouselElement.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearInterval(intervalRef.current);
      if (carouselElement) {
        carouselElement.removeEventListener('mouseenter', handleMouseEnter);
        carouselElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={carouselRef} style={{ pointerEvents: 'auto' }}>
        <Navbar/>
      <TECarousel
        className="mt-20 sm:mt-20 md:mt-22 lg:mt-20 mt-320px-64"
        showControls
        showIndicators
        crossfade
        ride="carousel"
        interval={5000}
        prevBtnIcon={
          <>
            <span className="inline-block text-black h-8 w-8 [&>svg]:h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </span>
            <span className="sr-only">Previous</span>
          </>
        }
        nextBtnIcon={
          <>
            <span className="inline-block text-black h-8 w-8 [&>svg]:h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </span>
            <span className="sr-only">Next</span>
          </>
        }
        theme={{
          indicator:
            "mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none",
        }}
      >
        <div className="relative w-full h-[150px] sm:h-[250px] md:h-[400px] lg:h-[500px] overflow-hidden after:clear-both after:block after:content-['']">
          {slides.map((slide, index) => (
           
            <TECarouselItem
              key={index}
              itemID={index + 1}
              className="relative float-left -mr-[100%] hidden w-full !transform-none transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
            >
              <img
                src={slide.img}
                className="block w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
              <div className="absolute text-center w-full top-2 left-0 sm:top-24 md:top-60 lg:top-80 py-5 text-white">
                <h5 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold pb-2">
                  {slide.title}
                </h5>
                <p className="bg-gray-900 text-xs sm:text-sm md:text-base lg:text-lg bg-opacity-60 p-1 sm:p-2 md:p-4 rounded inline-block typewriter">
                  {slide.desc}
                </p>
              </div>
            </TECarouselItem>
          ))}
        </div>
      </TECarousel>
    </div>
  );
}

export default Carousel;
