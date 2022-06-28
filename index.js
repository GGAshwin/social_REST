const express=require('express')
const app=express()
const mongoose=require('mongoose')
const helmet=require('helmet')
const morgan=require('morgan')
const userRoute=require('./routes/users')
const authRoute=require('./routes/auth')

const uri="mongodb+srv://ashwin:1234@cluster0.cjcyr.mongodb.net/socialMedia?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

//middlesware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(3000,()=>{
    console.log("Server running on port 3000");
})