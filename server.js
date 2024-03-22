/*********************************************************************************
* WEB700 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: Krutika Latkar       Student ID: krlatkar       Date: 22-03-2024
*
* Online (Cyclic) Link: ________________________________________________________
*
********************************************************************************/ 

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const data = require("./modules/officeData.js");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;


app.engine(".hbs", exphbs.engine({ extname: ".hbs",defaultLayout:"main" }));
app.set("view engine", ".hbs");

app.use(
    express.urlencoded({extended: true})
)

app.get("/employees",(req,res)=>{
    data.getAllEmployees().then((data)=>{
        res.render('employees',{employees:data ,title:'Employees',active:{employees:true}})
    }).catch((data)=>{
        res.render("employees",{message:"no results", title:'Employees',active:{employees:true}})
    })
})

app.get(["/","/home"], (req,res) => {
    res.render("home",{title:'Home',active:{home:true}})
})


app.get('/employees/add', (req,res) => {
    res.sendFile(path.join(__dirname, "/views/addEmployee.html"))
})

app.post('/employees/add', (req,res)=>{
    data.addEmployee(req.body).then((data) =>{
      res.redirect('/employees')   
    })
  })

app.get('/description', (req,res) => {
    res.render('description',{title:'Description',active:{des:true}})
});  

app.get("/PartTimer", (req,res) => {
    data.getPartTimers().then((data)=>{
        res.json(data);
    })
});

app.use((req,res)=>{
    res.status(404).send("Page Not Found");
});


data.initialize().then(function(){
    app.listen(HTTP_PORT, function(){
        console.log("app listening on: " + HTTP_PORT)
    });
}).catch(function(err){
    console.log("unable to start server: " + err);
});

