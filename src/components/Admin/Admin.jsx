
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Admin.css';
import Navbar from '../Navbar/Navbar';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

// import Base from './components/Base';


function Admin() {



  const [stateNamee, setStateNamee] = useState('');
  const [tripName, setTripName] = useState('');
  const [tripAddress, setTripAddress] = useState('');
  const [tripPrice, setTripPrice] = useState('');
  const [tripPhoto, setTripPhoto] = useState(null);
  const [stateNam, setStateName] = useState();
  const [toggleState, setToggleState] = useState(false)
  const [city, setCity] = useState();
  // console.log(stateName);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [tripResponse, setTripResponse] = useState([]);

  // const { isOpen, onOpen, onClose } = useDisclosure()

  // const initialRef = React.useRef(null)
  // const finalRef = React.useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const bgColor = useColorModeValue('white','gray');
  // const color = useColorModeValue('black', 'gray');


  const [categories, setCategories] = useState([]);

  const [cityName, setCityName] = useState();
  const [categoryName, setCategoryName] = useState();

  const [stateForm, setSateForm] = useState(false);

  const [cityForm, setCityForm] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://tourism-and-travel-management-system.onrender.com/public/state/").then((res) => {
      console.log(res.data);
      setStates(res.data);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  useEffect(() => {

    axios.get('https://tourism-and-travel-management-system.onrender.com/public/city/').then((res) => {
      // console.log(res.data)
      setCityList(res.data);
    }).catch(error => {
      console.log(error);
    })


  }, [])

  const handleStateChange = (stateName) => {
    const filterCity = cityList.filter((x) => x.stateName === stateName);
    console.log(filterCity);
    setCities(filterCity)

  }

  // useEffect(()=>{

  //      axios.get("http://localhost:3001/").then(res=>{
  //            setData(res.data)
  //      })
  // },[])

  useEffect(() => {
    const res = axios.get('https://tourism-and-travel-management-system.onrender.com/public/trip/').
      then(res => {
        setTripResponse(res.data)
        console.log(res);
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  const tripData = JSON.stringify({
    tripName: tripName,
    tripAddress: tripAddress,
    tripPrice: tripPrice,

  });

  // Handle changes in input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {

      case 'tripName':
        setTripName(value);
        break;
      case 'tripAddress':
        setTripAddress(value);
        break;
      case 'tripPrice':
        setTripPrice(value);
        break;
      default:
        break;
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setTripPhoto(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('tripData', tripData);
    // formDataToSend.append('tripAddress', formData.tripAddress);
    // formDataToSend.append('tripPrice', formData.tripPrice);
    formDataToSend.append('tripPhoto', tripPhoto);

    console.log(formDataToSend);
    const state = "Uttar Pradesh";

    try {
      const response = await axios.post(`https://tourism-and-travel-management-system.onrender.com/public/trip/${stateNam}/${cityName}/${categoryName}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("submit data successfully");
      console.log(response.data);
    } catch (error) {
      alert("some thing went wrong");
      console.error('Error submitting form:', error);
    }
  };


  useEffect(() => {
    axios.get("https://tourism-and-travel-management-system.onrender.com/public/tripCategory/").then((res => {
      console.log(res.data);
      setCategories(res.data)
    }))
  }, [])



  //  useEffect(()=>{

  //   var axios = require('axios');

  //   var config = {
  //     method: 'get',
  //     url: 'https://api.countrystatecity.in/v1/countries/IN/states',
  //     headers: {
  //       'X-CSCAPI-KEY': 'API_KEY'
  //     }
  //   };

  //   axios(config)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //  },[])

  const handleStateForm = async (e) => {
    e.preventDefault();
    await axios.post("https://tourism-and-travel-management-system.onrender.com/public/state/", {
      stateName: stateNam
    })

    alert("saved succesfully!");

    setSateForm(false);
  }

  const handleCityForm = async (e) => {
    e.preventDefault();
    console.log(stateNamee)
    if (stateNamee != null) {
      await axios.post(`https://tourism-and-travel-management-system.onrender.com/public/city/${stateNamee}`,

        {
          cityName: cityName
        }

      )
      alert("saved successfully !");
      setCityForm(false)
    }
    else {
      alert("cityName cannot be null")
    }


  }


  return (

    <>
      <Navbar />
       {/* modal */}

      
       
       
         
       {/* modal */}
      <div style={{ marginTop: "80px" }}>
        {/* <h1 style={{textAlign:"center",background:"rgb(225, 188, 77)", fontSize:22, marginLeft:"260px", height:"35px", width:"1000px", color:"white"}}>ADMIN DASHBOARD</h1> */}
        {/* side bar */}

        {/* <!-- Sidebar --> */}
        <div className='flex space-between'>
          <div id="sidebar" className="sidebar ZIndex-10  bg-[#e1bc4d] w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
            {/* <!-- Branding & Profile Info --> */}
            <div class="flex items-center space-x-2 px-4">
              <i class="fas fa-user-circle fa-3x text-blue-500"></i>
              <span class="text-2xl font-extrabold text-blue-500">Admin</span>
            </div>

           

            {/* <!-- Navigation Links --> */}
            <nav>
              <a href="#" onClick={(e) => setSateForm(!stateForm)} class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                Add States
              </a>
              {stateForm &&


                <form className='stateForm'
                  style={{
                    marginTop: 10,
                    marginInline: 0,
                  }}
                  onSubmit={handleStateForm}
                >
                  <input

                    value={stateNam}
                    onChange={(e) => setStateName(e.target.value)}
                    style={{
                      padding: 6,
                      width: 240,
                      borderRadius: 5,
                      outline: 'none',
                      border: '1px solid gray',
                      marginTop: '-10PX'
                    }}

                    type="text" placeholder='enter state' />
                  <button

                    style={{
                      padding: 4,
                      width: 240,
                      background: 'blue',
                      border: 'none',
                      color: 'white',
                      borderRadius: 5,
                      marginTop: 2
                    }}

                    type="submit">Add State</button>
                </form>
              }
              <a href="#" onClick={(e) => setCityForm(!cityForm)} class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                Add City
              </a>
              {/* city from */}

              {cityForm &&

                <div> <select className='selectItem' name="stateName"
                  value={stateNamee}
                  onChange={e => setStateNamee(e.target.value)}
                  style={{ width: 240, borderRadius: '!important none', marginTop: 2, marginBottom: 1, padding: 7 }}
                >
                  <option selected disabled>Select state</option>
                  {
                    states.map((ele, i) => {
                      return <option key={i} name="stateName" value={ele.stateName}>{ele.stateName}</option>
                    })
                  }

                </select>
                  <form className='stateForm'
                    style={{
                      marginTop: 2,
                      marginInline: 0
                    }}
                    onSubmit={handleCityForm}
                  >
                    <input
                      value={cityName}
                      onChange={(e) => setCityName(e.target.value)}
                      style={{
                        padding: 7,
                        borderRadius: 5,
                        width: 240,
                        outline: 'none',
                        border: '1px solid gray',
                        marginRight: 0,
                      }}

                      tyep="text" placeholder='enter city' />
                    <button

                      style={{
                        padding: 7,
                        background: 'blue',
                        width: 240,
                        border: 'none',
                        color: 'white',
                        marginTop: 3,
                        borderRadius: 5
                      }}

                      type="submit">add city</button>
                  </form>
                </div>
              }
              {/* city form */}
              
              <a  onClick={onOpen} class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                Add Trip
              </a>
             -m
              <a href="#" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                Add Hotel
              </a>
              <a href="#" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                Add Vehicle
              </a>
              <a href="#" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                View Trips
              </a>
              <a href="#" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                View Hotels
              </a>
              <a href="#" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                View Vehicles
              </a>
              <a href="#" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-500 hover:text-white">
                View Bookings
              </a>
            </nav>
          </div>
          {/* side bar */}

          <div class="grid w-[1000px]  px-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

            {/* <!-- Trips Card --> */}
            <div class="bg-white  hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
              <div class="bg-blue-500 text-white p-4 rounded-full">
                <i class="fas fa-plane-departure fa-2x"></i>
              </div>
              <div>
                <h2 class="text-xl font-semibold">Trips</h2>
                <p class="text-gray-600 text-3xl font-bold">150</p>
              </div>
            </div>

            {/* <!-- Hotels Card --> */}
            <div class="bg-white hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
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
            <div class="bg-white  hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
              <div class="bg-yellow-500 text-white p-4 rounded-full">
                <i class="fas fa-car fa-2x"></i>
              </div>
              <div>
                <h2 class="text-xl font-semibold">Trip Booking</h2>
                <p class="text-gray-600 text-3xl font-bold">75</p>
              </div>
            </div>


            <div class="bg-white hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
              <div class="bg-yellow-500 text-white p-4 rounded-full">
                <i class="fas fa-car fa-2x"></i>
              </div>
              <div>
                <h2 class="text-xl font-semibold">Vehice Booking</h2>
                <p class="text-gray-600 text-3xl font-bold">75</p>
              </div>
            </div>

            <div class="bg-white hover:bg-gray-200 p-6 rounded-lg shadow-lg flex items-center space-x-4">
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
        {/* <!-- Additional Content --> */}
        <div class="mt-12">
          <h2 class="text-2xl font-semibold mb-4">Overview</h2>
          <p class="text-gray-700">
            Here you can view the summary of your trips, hotels, and vehicles. Use the navigation above to manage each category or add new entries. The dashboard is designed to give you a quick snapshot of your operations.
          </p>
        </div>



        <div className='container-div'>
          <div>



            {/* city form */}

            <br></br>



            {/* end city form */}
          </div>


          <div className='tripForm'>


            <form

              className="tripForm1"
              onSubmit={handleSubmit}>
              <select className='selectItem' name="stateName"

                value={stateNam}

                onChange={e => handleStateChange(e.target.value)}
                required
              >
                <option selected disabled>Select state</option>
                {
                  states.map((ele, i) => {
                    return <option key={i} name="stateName" value={ele.stateName}>{ele.stateName}</option>
                  })
                }

              </select>
              <select className='selectItem'


                value={cityName}

                onChange={e => setCityName(e.target.value)}
                required
              >
                <option selected disabled>Select City</option>
                {
                  cities.map((cityElement, i) => {
                    return <option key={i} value={cityElement.cityName}>{cityElement.cityName}</option>
                  })
                }
              </select>


              <select className='selectItem'
                value={categoryName}

                onChange={e => setCategoryName(e.target.value)}
                required
              >
                <option selected disabled>Select Category</option>
                {
                  categories.map((category, i) => {
                    return <option required key={i} value={category.categoryName}>{category.categoryName}</option>
                  })
                }
              </select>


              <input type="text" required name="tripName" placeholder="Enter trip Name" value={tripName} onChange={handleChange} /><br></br>
              <input type="text" required name="tripAddress" placeholder="Enter trip Address" value={tripAddress} onChange={handleChange} /><br></br>
              <input type="number" required name="tripPrice" placeholder="Enter trip Price" value={tripPrice} onChange={handleChange} /><br></br>
              <input type="file" required placeholder="choose file" name="tripPhoto" onChange={handleFileChange} /><br></br>
              <button type="submit">Add Trip</button>
            </form>
          </div>
        </div>
        <br></br>



        <div class="max-w-6xl mx-auto">
          <h1 class="text-3xl font-bold mb-4">Responsive Trip Table</h1>

          <div class="overflow-x-auto bg-white rounded-lg shadow">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Container ID
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trip Name
                  </th>
                  {/* <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trip Address
                        </th> */}
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trip Price
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trip Photo
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {
                  tripResponse.map((trip, index) => {

                    return <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        {trip.tripName}
                      </td>
                      {/* <td class="px-6 py-4 whitespace-nowrap">
                          {trip.tripAddress}
                      </td> */}
                      <td class="px-6 py-4 whitespace-nowrap">
                        ₹{trip.tripPrice}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <img src={trip.url} alt="Trip Photo" class="w-12 h-12 object-cover rounded" />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <button class="px-2 py-1 bg-red-500 text-white rounded hover:bg-blue-700">
                          Delete
                        </button>
                        <button class="px-2 ml-5 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
                          Edit
                        </button>

                      </td>


                    </tr>
                  })

                }
                {/* <!-- Add more rows as needed --> */}
              </tbody>
            </table>
          </div>
        </div>

     



      </div>
    </>
  );

}




export default Admin;