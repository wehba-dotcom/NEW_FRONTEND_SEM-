import { useState } from "react";


export default function AddTrip({ facade })
{

    const init = { date: "", location: "" , duration : "" , name:"" , packingList:"", time:"" };
    const [addstrip, setAddstrip] = useState(init);

    const performSubmit = (evt) =>
    {
        evt.preventDefault();
       
const options = facade.makeoptions("post",true , addstrip)

     fetch(URL+ "/api/harbour/add", options)
     
     setAddstrip({date: "", location: "" , duration : "" , name:"" , packingList:"", time:"" })
    }

    const onChange = (evt) =>
    {
        const target = evt.target
        const id = target.id
        const value = target.value
        setAddstrip({ ...addstrip, [id]: value })
    }



    return (
        <div style={{textAlign:"center"}}>

            <h2>Add new trip </h2>
           <form onSubmit={performSubmit}>
            <table>
              <colgroup>
               <col width={70} />
               <col/>
              </colgroup>
              <tbody>
                  <tr>
                      <td>Date :</td>
                      <td> <input type="text" required value={addstrip.date} onChange={onChange} id = "date" /></td>
                  </tr>
                  <tr>
                      <td>Location :</td>
                      <td> <input type="text" required value={addstrip.location} onChange={onChange} id = "location" /></td>
                  </tr>
                  <tr>
                      <td>Duration :</td>
                      <td> <input type="text" required value={addstrip.duration} onChange={onChange} id = "duration" /></td>
                  </tr>
                  <tr>
                      <td>Name :</td>
                      <td> <input type="text" required value={addstrip.name} onChange={onChange} id = "name" /></td>
                  </tr>
                  <tr>
                      <td>PackingList:</td>
                      <td> <input type="text" required value={addstrip.packingList} onChange={onChange} id = "packingList" /></td>
                  </tr>
                  <tr>
                      <td>Time :</td>
                      <td> <input type="text" required value={addstrip.time} onChange={onChange} id = "time" /></td>
                  </tr>
                  <tr>
                      <td>Guide_Id :</td>
                      <td> <input type="text" required  onChange={onChange} id = "time" /></td>
                  </tr>
              </tbody>
              </table>
              <button   >Add Boat</button>
               </form> 
           
            
        </div>
    )

}