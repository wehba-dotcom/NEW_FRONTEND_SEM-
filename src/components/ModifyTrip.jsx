
import React,{useEffect,useState} from 'react';

export default function ModifyTrip({facade , setErrorMessage}){

  const [trips,setTrips] = useState([])
 
  const deleteTrip = (e) =>{
    e.preventDefault()
    facade.deleteTrip(e.target.id)
    trips.pop(e.target.id)
}
  
  
  const updateList = (data) => {
    setTrips(data)
    
  };
  
  useEffect(()=> {
      facade.fetchData("trip/all", updateList);
  },[]);
  












//const handleInput = (event) => {
  //    setBoat({ ...boat, [event.target.id]: event.target.value })
  //}
  
  return(
      
      <div>
      <table className="table table-striped">
      <thead>
          <tr>
             <th>Id</th>
              <th>Date</th>
              <th>Duration</th>
              <th>Location</th>
              <th>name</th>
              <th>PackingList</th>
              <th>Time</th>
              
          </tr>
      </thead>
      <tbody>
  {trips.map((trip) => (<tr key={trip.id}>
      <td>{trip.id}</td>
      <td>{trip.date}</td>
      <td>{trip.duration}</td>
      <td>{trip.location}</td>
      <td>{trip.name}</td>
      <td>{trip.packingList}</td>
      <td>{trip.time} <button id={trip.id} onClick={deleteTrip} variant="secondary">Delete</button> </td>
     
     
      </tr>))}
      </tbody>
  </table>

  </div>
  
  );
  }
  