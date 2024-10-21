const express = require('express');
   const app = express();
   const mysql = require('mysql2');
   const dotenv = require('dotenv');
   //configure environment variables
dotenv.config();

// create a connection dependencies object
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.PORT
})
//2. test the connection
   db.connect((err) => {
    // IF NOT SUCCESSFUL
    if (err){
        return console.log ("Error Connecting to db",err)}
        //IF SUccessful
        console.log("Successfully connected to db",db.threadId)
   })


   // Question 1 goes here
   app.get('/patients',(req,res) => {
    const getPatients ="SELECT patient_id, first_name, last_name,date_of_birth FROM patients"

    db.query(getPatients,(err,data) =>{
        // if error occured when fetching the data
        if(err){
            return res.status(400).send("Failed to get patient",err)
        }
        res.status(200).send(data);
    })
   })

   // Question 2 goes here retrieve all providers
   app.get('/providers',(req,res) => {
    const getProvider ="SELECT  first_name, last_name, provider_specialty FROM providers"

    db.query(getProvider,(err,data) =>{
        // if error occured when fetching the data
        if(err){
            return res.status(400).send("Failed to get providers",err)
        }
        res.status(200).send(data);
    })
   })

   // Question 3 goes here filtering by firstname
   app.get('/patients/:first_name',(req,res) => {
    const firstName = req.params.first_name;
    const getPatients ="SELECT patient_id,first_name,last_name,date_of_birth FROM patients WHERE first_name =?"

    db.query(getPatients,[firstName],(err,data) =>{
        // if error occured when fetching the data
        if(err){
            return res.status(400).send("Error retrieving patient by firstname",err)
        }
        res.status(200).send(data);
    })
   })
   // Question 4 goes here retrieve provider by specialty
   app.get('/provider/specialty/:specialty',(req,res) => {
    const specialty= req.params.specialty;
    const getProvider ="SELECT first_name,last_name,provider_specialty FROM providers WHERE specialty=?"

    db.query(getProvider,[specialty],(err,data) =>{
        // if error occured when fetching the data
        if(err){
            return res.status(400).send("Error retrieving provider by specialty",err)
        }
        res.status(200).send(data);
    })
})
   // listen to the server
   
   const PORT = 3001
   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   })
