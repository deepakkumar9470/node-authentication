require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5001
const authRoute = require('./routes/auth');
const eventRoute = require('./routes/events');


app.use(express.json())
app.use('/api', authRoute);
app.use('/events', eventRoute);



mongoose
  .connect(process.env.Mongo_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
  })
  .then(console.log("Connected to MongoDB.."))
  .catch((err) => console.log(err));





app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`)
});