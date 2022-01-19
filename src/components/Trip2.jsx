import { useState } from 'react';

function Trip2({ facade, setErrorMessage}) {

    const init = {  date: "", duration: "", location: "",name: "", packingList: "",time:""};
    const [trip,setTrip] = useState(init);
    const [trips,setTrips] = useState([]);

    const handleClick = (evt) =>{
        evt.preventDefault();
        facade.fetchData('trip/all', updateList, setErrorMessage);
    }

    const updateList = (data) => {
        console.log(data)
        setTrips(data)
    }

    const performCreateTrip = (evt) =>{
        evt.preventDefault();
        facade.addTrip( trip.date,  trip.duration, trip.location,trip.name, trip.packingList,trip.time, setErrorMessage)
    }


    const onChange = (evt) =>
    {
        setTrip({ ...trip, [evt.target.id]: evt.target.value })
    }


return (

    <div className='row' style={{textAlign:"center"}}>



   <div className='col-md-6 border'>
    <h1>All trips</h1>
    <div >
        <table class="table table-striped">
            <thead>
                <tr>
                 <th>Id</th>   
                <th >Date</th>
                <th >Duration</th>
                <th >Location</th>
                <th >Name</th>
                <th >PackingList</th>
                <th >Time</th>
                </tr>
            </thead>
        <tbody>
        {trips.map((trip =><tr class="active-row"><td key={trip.id}>{trip.id}</td> <td key={trip.id}>{trip.date}</td><td key={trip.id}>{trip.duration}</td><td key={trip.id}>{trip.location}</td><td key={trip.id}>{trip.name}</td><td key={trip.id}>{trip.packingList}</td><td key={trip.id}>{trip.time}</td></tr>))}
        </tbody>
        </table>
    </div>
    <button onClick={handleClick}> Get All  Trips</button>
    </div>


    
    <div className='col-md-6 border'>
    <div style={{textAlign:"center"}}>
<form onChange={onChange} >
        <h2> Here you can add trip</h2>
        <hr/>
        <input  placeholder="date" id="date" /><br/><br/>
        <input  placeholder="duration" id="duration" /><br/><br/>
        <input  placeholder="location" id="location" /><br/><br/>
        <input  placeholder="name" id="name" /><br/><br/>
        <input  placeholder="packingList" id="packingList" /><br/><br/>
        <input  placeholder="time" id="time" /><br/><br/>
        <button onClick={performCreateTrip}>Add New Trip</button>

    </form>
    </div>
    </div>
    </div>

  );
}
export default Trip2;