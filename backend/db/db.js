const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI,{
     useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
     console.log('MongoDB Connected');
}).catch((error)=>{
    console.error(' MongoDB connection error:', error);
})