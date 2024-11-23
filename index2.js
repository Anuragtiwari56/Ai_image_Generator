import express from "express";
const app = express();
const port = 3000;
app.use(express.json());
app.get('/api/user', (req, res) => {
    res.json({
        user1: {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            age: 30
        },
        user2: {
            id: 2,
            name: "Jane Doe",
            email: "jane@example.com",
            age: 30
        }


    });
});
app.post('/api/user',(req,res)=>{
const {name,email,age}=req.body;
if(name && email && age ){
    return res.status(201).json({
        message:"User created successfully",
        user:{
            id:3,
            name:name,
            email:email,
            age:age
            },
            status:true
    });
}
return res.status(400).json({
message:'all feilds are required',
status:false

});

});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
