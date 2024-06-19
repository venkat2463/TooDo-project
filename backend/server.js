const express = require("express")
const app = express()
const port = 8000
const mongoose = require("mongoose")
const cors = require('cors')
//the above is used to fix the cors bef that install cors in cmd npm install cors


//middleware
app.use(express.json())
app.use(cors())

app.get('/crud',(req,res)=>{
res.send("hello world")
})



//sample in memory storage
// let detail=[];

//connecting mongodb
mongoose.connect('mongodb://localhost:27017/Reactcrud')
//then method is a promise
.then(()=>{
    console.log('DB connected')
    //the above code allow us to check whether the db is connected or not
})
.catch((err)=>{
    console.log(err)
})


//creating schema
const schema = new mongoose.Schema({
    title: {
        required:true,
        type:String
        //the above line make sure tat title is required without title it cant store the data in mongodb
    },
    description:String
})


//creating model
const user = mongoose.model('user',schema);


//in ven uri used in post method and get method bt in post it acts to create a new data whereas in ven app.get it is used to get data
app.post('/ven',async(req,res)=>{
const {title,description} =req.body;


// const newdetails={
//     id: detail.length + 1,
//     //above line explaination oru oru detail la value agum pothu existing value plus 1 eg 0+1 and so on
//     title,
//     description
// }
// detail.push(newdetails)
// //above are req
// console.log(detail);
//res send pananum

try{
    //to insert data
    const userdata=new user({title,description})
    await userdata.save();
    res.status(201).json(userdata)
}catch(error){
console.log(error)
res.status(500).json({message:error.message})
//the above line starting from json make sure tat error msg is send when error occurs 
}


})

//get all req
//in ven uri used in post method and get method bt in post it acts to create a new data whereas in ven app.get it is used to get data
// app.get('/ven',(req,res)=>{
//     res.json(detail)
// //the above code is usde to rend the res in json format
// })

//to get all items  from the mongodb
app.get('/ven',async(req,res)=>{
    try {
      const user2= await user.find()
      res.json(user2)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
})


//update user items
app.put('/ven/:id',async (req,res)=>{
    try {
         //in the above line id means tat a parameter is used
    const {title,description} =req.body;
    const id=req.params.id;
     //in the above line we are getting the id from the uri line as parameter
   const updatedata = await user.findByIdAndUpdate(
        id,{title,description },
        {new: true}
        //the above new line is used bec it send the new updated details illana ethu database mattum dhan update agum updated data show panathu so adhan new tru use pandrom
    )
    if(!updatedata){
        return res.status(404).json({message:"user not found please check"})
    }
   //here we are using  if statement  bec if there is no user data found then it shud return this condition
   res.json(updatedata)
   //suppose data match ayuruchina it shud updated data

    } catch (error) {
        res.status(500).json({message:error.message})
    }

   })


//delete item pana porom   
app.delete('/ven/:del',async(req,res)=>{
try {
    const del = req.params.del;
    await user.findByIdAndDelete(del)
    res.status(204).end();
} catch (error) {
    res.status(500).json({message:error.message})
}

   
})


app.listen(8000,()=>{
    console.log("the port is running on " + port)
})