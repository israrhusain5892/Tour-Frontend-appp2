import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import Admin from './Admin';

function TripViewPage({ isPending,list }) {
     
      

      
       const tripList= [
        {
          "tripName": "Barnawapara Wildlife Sanctuary",
          "tripAddress": "Mahasamund",
           "tripPrice":2000,
          "description": "Known for its diverse flora and fauna, including leopards and tigers.",
          "url": "https://media.istockphoto.com/id/1694587222/photo/wetlands-a-view.jpg?s=612x612&w=0&k=20&c=N9fJF3o7wVSydyiSekhTcQ2-I4VUBcgyC9AFBx2DsaI="
        },
        {
          "tripName": "Sitanadi Wildlife Sanctuary",
          "tripPrice":2000,
          "tripAddress": "Dhamtari",
          "description": "Rich in wildlife with dense forests and scenic beauty.",
          "url": "https://media.istockphoto.com/id/1182308780/photo/wild-geese-and-ducks-on-the-azmak-river-from-akyaka-town-in-turkey.jpg?s=612x612&w=0&k=20&c=5a5YEGBdKzq7-Yxbxa-Y--LsJPrcxd5S6RfsrRmnys4="
        },
        {
            "tripName": "Sitanadi Wildlife Sanctuary",
            "tripPrice":2000,
            "tripAddress": "Dhamtari",
            "description": "Rich in wildlife with dense forests and scenic beauty.",
            "url": "https://media.istockphoto.com/id/1182308780/photo/wild-geese-and-ducks-on-the-azmak-river-from-akyaka-town-in-turkey.jpg?s=612x612&w=0&k=20&c=5a5YEGBdKzq7-Yxbxa-Y--LsJPrcxd5S6RfsrRmnys4="
          },
          {
            "tripName": "Sitanadi Wildlife Sanctuary",
            "tripPrice":2000,
            "tripAddress": "Dhamtari",
            "description": "Rich in wildlife with dense forests and scenic beauty.",
            "url": "https://media.istockphoto.com/id/1182308780/photo/wild-geese-and-ducks-on-the-azmak-river-from-akyaka-town-in-turkey.jpg?s=612x612&w=0&k=20&c=5a5YEGBdKzq7-Yxbxa-Y--LsJPrcxd5S6RfsrRmnys4="
          },
          {
            "tripName": "Sitanadi Wildlife Sanctuary",
            "tripPrice":2000,
            "tripAddress": "Dhamtari",
            "description": "Rich in wildlife with dense forests and scenic beauty.",
            "url": "https://media.istockphoto.com/id/1182308780/photo/wild-geese-and-ducks-on-the-azmak-river-from-akyaka-town-in-turkey.jpg?s=612x612&w=0&k=20&c=5a5YEGBdKzq7-Yxbxa-Y--LsJPrcxd5S6RfsrRmnys4="
          },
          {
            "tripName": "Sitanadi Wildlife Sanctuary",
            "tripPrice":2000,
            "tripAddress": "Dhamtari",
            "description": "Rich in wildlife with dense forests and scenic beauty.",
            "url": "https://media.istockphoto.com/id/1182308780/photo/wild-geese-and-ducks-on-the-azmak-river-from-akyaka-town-in-turkey.jpg?s=612x612&w=0&k=20&c=5a5YEGBdKzq7-Yxbxa-Y--LsJPrcxd5S6RfsrRmnys4="
          },
          {
            "tripName": "Sitanadi Wildlife Sanctuary",
            "tripPrice":2000,
            "tripAddress": "Dhamtari",
            "description": "Rich in wildlife with dense forests and scenic beauty.",
            "url": "https://media.istockphoto.com/id/1182308780/photo/wild-geese-and-ducks-on-the-azmak-river-from-akyaka-town-in-turkey.jpg?s=612x612&w=0&k=20&c=5a5YEGBdKzq7-Yxbxa-Y--LsJPrcxd5S6RfsrRmnys4="
          },
          {
            "tripName": "Sitanadi Wildlife Sanctuary",
            "tripPrice":2000,
            "tripAddress": "Dhamtari",
            "description": "Rich in wildlife with dense forests and scenic beauty.",
            "url": "https://media.istockphoto.com/id/1182308780/photo/wild-geese-and-ducks-on-the-azmak-river-from-akyaka-town-in-turkey.jpg?s=612x612&w=0&k=20&c=5a5YEGBdKzq7-Yxbxa-Y--LsJPrcxd5S6RfsrRmnys4="
          },
          {
            "tripName": "Sitanadi Wildlife Sanctuary",
            "tripPrice":2000,
            "tripAddress": "Dhamtari",
            "description": "Rich in wildlife with dense forests and scenic beauty.",
            "url": "https://media.istockphoto.com/id/1182308780/photo/wild-geese-and-ducks-on-the-azmak-river-from-akyaka-town-in-turkey.jpg?s=612x612&w=0&k=20&c=5a5YEGBdKzq7-Yxbxa-Y--LsJPrcxd5S6RfsrRmnys4="
          },
          {
            "tripName": "Sitanadi Wildlife Sanctuary",
            "tripPrice":2000,
            "tripAddress": "Dhamtari",
            "description": "Rich in wildlife with dense forests and scenic beauty.",
            "url": "https://media.istockphoto.com/id/1182308780/photo/wild-geese-and-ducks-on-the-azmak-river-from-akyaka-town-in-turkey.jpg?s=612x612&w=0&k=20&c=5a5YEGBdKzq7-Yxbxa-Y--LsJPrcxd5S6RfsrRmnys4="
          },
          {
            "tripName": "Sitanadi Wildlife Sanctuary",
            "tripPrice":2000,
            "tripAddress": "Dhamtari",
            "description": "Rich in wildlife with dense forests and scenic beauty.",
            "url": "https://media.istockphoto.com/id/1182308780/photo/wild-geese-and-ducks-on-the-azmak-river-from-akyaka-town-in-turkey.jpg?s=612x612&w=0&k=20&c=5a5YEGBdKzq7-Yxbxa-Y--LsJPrcxd5S6RfsrRmnys4="
          },
        
      ]
      const[trips,setTrips]=useState(tripList); 
      const[name,setName]=useState();
      const search=()=>{
         const filteredData=tripList.filter((e)=>e.tripName.toLowerCase()===name.toLowerCase() || e.tripName.slice(0,2).toLowerCase()===name.slice(0,2).toLowerCase());
         setTrips(filteredData)
      }
       
       const refresh=(e)=>{
          
           setTrips(tripList)
       }

    return (
        <Admin>
        <div>

            <div className="mx-auto px-4 ">
                <h1 class="text-xl mx-auto text-center font-bold mb-0">All Trips</h1>
                 <div 
                 
                  className='min-w-full mt-[-10px]'
                  style={{
                    display:'flex',
                    justifyContent:'space-between'
               }}
                  
                  >
                    
                      <div >
                         <button className='bg-blue-500 px-2 py-1 text-white' onClick={refresh} >Refresh</button>
                     </div>
                    <div>
                    <input className='px-5 py-1 border'
                        onChange={e=>setName(e.target.value)}
                    /> 
                    <button onClick={search} className='bg-blue-400 px-2 py-1 text-white'>Search</button></div>
                    </div>
                <div class="overflow-y-scroll bg-white  h-[480px]  rounded-lg shadow">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-blue-200">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                     ID
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
                        <tbody class="bg-white divide-y divide-gray-200 ">
                             {
                                isPending && <Loader/>
                             }
                            { 
                                
                                trips.map((element, index) => {

                                  return  <tr className='overflow-scroll'>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {index + 1}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            {element.tripName}
                                        </td>
                                        {/* <td class="px-6 py-4 whitespace-nowrap">
                                        {trip.tripAddress}
                                        </td> */}
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            ₹{element.tripPrice}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <img src={element.url} alt="Trip Photo" class="w-12 h-12 object-cover rounded" />
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
        </Admin>
    );
}

export default TripViewPage;