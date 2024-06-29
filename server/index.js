const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const sequelize = require('./config/database')

let PORT = process.env.PORT || 4000;

app.use(express.json());

sequelize.sync().then(()=>{
    console.log('Database connected');
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log(`Server is not running on port ${PORT}`);
})