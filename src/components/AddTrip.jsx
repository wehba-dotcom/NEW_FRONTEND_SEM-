import { useEffect, useState } from 'react'
import URL1 from '../setting.js'


function AddTrip  ({ facade ,setErrorMessage}) {
    const [createBoat, setCreateBoat] = useState({ date: "", location: "" , duration : "" , name:"" , packingList:"", time:"" })
    const [trips,setTrips] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    


    
    const handleChange = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setCreateBoat({ ...createBoat, [id]: value })
    }
     const updateData=(data)=>{
        setCreateBoat(data)
     }
    const handleSubmit =  
         (date, location, duration  , name, packingList, time, setErrorMessage) =>
        {
            const options = facade.makeOptions("POST", true, {date: date, location: location , duration :duration , name:name , packingList:packingList, time:time });
            return fetch(URL1+ "/api/trip/add", options)
                
                .then((data) =>
                
                updateData(data)
                )
                .catch((err) =>
                {
                    if (err.status)
                    {
                        err.fullError.then((e) => setErrorMessage(e.code + ': ' + e.message));
                    } else
                    {
                        setErrorMessage('Network error');
                    }
                });
        }


    



    return (
        <div>
            <br />
 add a new trip
            <hr />
            <form onSubmit={handleSubmit}>
                <table>
                    <colgroup>
                        <col width={70} />
                        <col />
                    </colgroup>
                    <tbody>
                    <tr>
                      <td>Date :</td>
                      <td> <input type="text" required value={createBoat.date} onChange={handleChange} id = "date" /></td>
                  </tr>
                  <tr>
                      <td>Location :</td>
                      <td> <input type="text" required value={createBoat.location} onChange={handleChange} id = "location" /></td>
                  </tr>
                  <tr>
                      <td>Duration :</td>
                      <td> <input type="text" required value={createBoat.duration} onChange={handleChange} id = "duration" /></td>
                  </tr>
                  <tr>
                      <td>Name :</td>
                      <td> <input type="text" required value={createBoat.name} onChange={handleChange} id = "name" /></td>
                  </tr>
                  <tr>
                      <td>PackingList:</td>
                      <td> <input type="text" required value={createBoat.packingList} onChange={handleChange} id = "packingList" /></td>
                  </tr>
                  <tr>
                      <td>Time :</td>
                      <td> <input type="text" required value={createBoat.time} onChange={handleChange} id = "time" /></td>
                  </tr>
                  <tr>
                      <td>Guide_Id :</td>
                      <td> <input type="text" required  onChange={handleChange} id = "time" /></td>
                  </tr>
                  <tr>
                            <td></td>
                            <td align='right'><input type='submit' value='Add' /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
    
        </div >
    )
}

export default AddTrip
