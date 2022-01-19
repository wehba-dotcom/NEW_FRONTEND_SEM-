import React,{useState,useEffect} from 'react';




function Trips({facade, errorMessage, setErrorMessage }) {
const [trips,setTrips] = useState([])


const updateList = (data) => {
    setTrips(data)
    console.log(data)
};

useEffect(()=> {
    facade.fetchData("trip/all", updateList, setErrorMessage);
},[facade,setErrorMessage]);




return(
    <div>
    <table className="table table-striped">
    <thead>
        <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Duration</th>
            <th>Location</th>
            <th>Name</th>
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
    <td>{trip.time}</td>
    </tr>))}
    </tbody>
</table>
</div>

);
}
export default Trips;