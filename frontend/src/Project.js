import React, { useState } from "react";
import { useEffect} from "react";

function Project(){
const [title,setTitle]= useState("");
const [description,setDescription]= useState("");
//hook function above
const[venkat,setVenkat] = useState([]);
const [error,setError] = useState("");
const [success,setSuccess] = useState("");
const [editId,setEditId] = useState("-1");
//always in -1
//edit button
const [editTitle,setEditTitle]= useState("");
const [editDescription,setEditDescription]= useState("");


const apiUrl = "http://localhost:8000"


const handleSubmit= () =>{
    setError("")
    //submit panum pothu error msg ethuvum iruka kudathu tats y tha above line for reference last 40min
    if(title.trim() !=='' && description.trim() !==''){
//trim is used to remove the unwanted space and if condition is used for the box shud not be empty
  fetch(apiUrl+"/ven",{
    method: "POST",
    //bec item create panum pothu post dhan kudukanum
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({title,description})
}).then((res)=>{
if (res.ok){
//toadd item to the list
setVenkat([...venkat,{title,description}])
setTitle("")
setDescription("")
setSuccess("Item added successfully")
//for success items add msg
setTimeout(()=>{
    setSuccess("");
},3000)
//the above line makes type pana text 3 sec aparam poirum

}else{
    //set error
    setError("unable to create item sry please try again later")
}
}).catch(()=>{
    setError("unable to create item sry please try again later")
})
    }

}

//to get the items from backend
useEffect(()=>{
    getItems()
},[])
//the above code is used once the page get refreshed 

const getItems = ()=>{
    fetch(apiUrl+"/ven")
    .then((res)=> res.json())
    .then((res)=>{
        setVenkat(res)
    })
}
const handleEdit = (item)=>{
    setEditId(item._id);
    setEditTitle(item.title);
     setEditDescription(item.description)
}

const handleUpdate=()=>{
    setError("")
    //submit panum pothu error msg ethuvum iruka kudathu tats y tha above line for reference last 40min
    if(editTitle.trim() !=='' && editDescription.trim() !==''){
//trim is used to remove the unwanted space and if condition is used for the box shud not be empty
  fetch(apiUrl+"/ven/"+editId,{
    method: "PUT",
    //bec item create panum pothu post dhan kudukanum
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify({title:editTitle,description:editDescription})
}).then((res)=>{
if (res.ok){
//to update item to the list
const updatedVenkat = venkat.map((item)=>{
    if(item._id == editId){
item.title = editTitle;
item.description = editDescription
    }
    return item;
})
setVenkat(updatedVenkat)
setEditTitle("")
setEditDescription("")
setSuccess("Item updated successfully")
//for success items add msg
setTimeout(()=>{
    setSuccess("");
},3000)
//the above line makes type pana text 3 sec aparam poirum
setEditId(-1)

}else{
    //set error
    setError("unable to create item sry please try again later")
}
}).catch(()=>{
    setError("unable to create item sry please try again later")
})
    }
}
const handleEditCancel = () =>{
    setEditId(-1)
}
const handleDelete = (id) =>{
if(window.confirm('Are you sure you want me to delete')){
    fetch(apiUrl+'/ven/'+id,{
        method:"DELETE"
    })
    .then(()=>{
       const updatedDel = venkat.filter((item)=> item._id !== id)
       setVenkat(updatedDel)
    })

}
}

    return<>
        <div className="row p-3 bg-danger text-light">
            <h1>React frontend project</h1>
        </div>
        <div className="row">
            <h3>Add item</h3>
           {success &&  <p className="text-success">{success}</p>}
            <div className="form-group d-flex gap-2">
            <input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} value={title} className="form-control" type="text"/>
            <input placeholder="Description" onChange={(e)=>setDescription(e.target.value)} value={description} className="form-control" type="text"/>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
            {/* for failure msg */}
            {error && <p className="text-danger">{error}</p>}
        </div>
        <div className="row mt-3">
            <h3>Tasks</h3>
            <div className="col-md-6">
            <ul className="list-group">
                {
                    venkat.map((item)=>
                    <li className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                    <div className="d-flex flex-column">
                        {
                            editId == -1 || editId !== item._id ? <>
                            <span className="fw-bold">{item.title}</span>
                <span> {item.description}</span>
                            </>:<>
                            <div className="form-group d-flex gap-2">
            <input placeholder="Title" onChange={(e)=>setEditTitle(e.target.value)} value={editTitle} className="form-control" type="text"/>
            <input placeholder="Description" onChange={(e)=>setEditDescription(e.target.value)} value={editDescription} className="form-control" type="text"/>
           
            </div>
                            </>
                        }
                
                
                </div>
                <div className="d-flex gap-2">
             { editId == -1 || editId !== item._id ?   <button className="btn btn-warning" onClick={()=>handleEdit(item)}>Edit</button>:<button onClick={handleUpdate}>Update</button>}
                 {/* _id used  usually it come in underscore in mongodb */}
               {editId == -1 ? <button className="btn btn-danger" onClick={()=> handleDelete(item._id)}>Delete</button>:
                <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>}
                </div>
                </li>

                )
                }
            </ul>
            </div>
        </div>

        </>
}

export default Project