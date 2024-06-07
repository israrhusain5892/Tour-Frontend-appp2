import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import  img from '/16231558095-star-rating.svg';
// import Navbar from '../Navbar';


function Favourites() {

      const[data,setData]=useState([]);

      useEffect(()=>{
             
             axios.get("https://tourism-and-travel-management-system.onrender.com/public/trip/").then(res=>{
                   
                     setData(res.data);
                     console.log(res.data);
             }).catch(error=>{
                  console.log(error);
             })
      },[])


  return (
//     <Base>
    
    <div className="container  mx-auto flex justify-center flex-col align-center">
        {/* <Navbar></Navbar> */}
        <h1 className=" bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-1 text-center text-2xl">FavouritePlaces</h1>
         <div className="fluid-container mt-10">
                 <div className='w-1000 flex-wrap flex gap-10 justify-center'>
                         {     data.map((element,index)=>{

                               return <div className='w-1/4 h-[370px] rounded shadow-md border border-gray-300 pb-24 pt-4 hover:scale-105'>

                                      <div className='flex flex-wrap  mx-auto mt-2 justify-center align-center w-72 h-48' key={index}>
                                    
                                          <img  className=" object-cover text-center w-72 h-48"src={element.url}/>
                                       </div>
                                       
                                       <div className='ml-2 mt-3 flex justify-between'>
                                        <div>
                                                <h3>{element.tripName}</h3>
                                                <h4 className='text-green-600'>₹ {element.tripPrice}</h4>
                                                <p className='w-[200px]'>{element.tripAddress}</p>
                                         </div>

                                         <div><div className='mr-4'> <img  className="w-32 mb-4 mr-8" src={img}></img></div>
                                          
                                          <div className='w-20 mt-16 '><button className='hover:bg-gray-600 rounded text-white py-1 w-24 bg-blue-600'>Book Now</button></div> </div>
                                        
                                        
                                       </div>
                                </div>
                              })
                                 
                         }
                         
                         
                         
                 </div>
         </div>
    </div>

   
   
  )
  
}

export default Favourites
