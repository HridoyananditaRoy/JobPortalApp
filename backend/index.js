require("dotenv").config();
require('./db/db.js');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes'); 
const companyRoutes = require('./routes/company.routes'); 
const jobRoutes = require('./routes/job.routes.js'); 
const applicantRoutes  =require('./routes/applicant.routes.js');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser()); // ✅ must be before any routes

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true // if you're using cookies, tokens, or sessions
}));


const PORT = process.env.PORT || 3000

//api routes'

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/company',companyRoutes);
app.use('/api/v1/jobs',jobRoutes);
app.use('/api/v1/applicants',applicantRoutes);

app.listen(PORT, ()=>{
    console.log(`Server listening on PORT ${PORT}`);
})
