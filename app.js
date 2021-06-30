const express= require("express");
const https= require("https");
const { send } = require("process");

const bodyParser = require("body-parser");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/", function(req, res){
    
    const query=req.body.cityName;
    const apiKey="aeff6f77d101f1087f8f7eebed878865";
    const unit="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+apiKey+"&units="+unit;
https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
       const weatherData= JSON.parse(data);
       console.log(weatherData);
       const temp= weatherData.main.temp;
       const discription=weatherData.weather[0].description;
       const icon=weatherData.weather[0].icon;
       console.log(discription);
       console.log(temp);

       const image="http://openweathermap.org/img/wn/"+icon+"@2x.png";
       

        res.write("<p>the weather is currently"+discription+"</p>");
       res.write("<h1>temp in "+query+" is"+temp+"kelvin</h1>");
       res.write("<img src="+image+">");
       
       res.send();
    });
});
});



app.listen(3000,function(){
    console.log("running");
});



// // res.send("server is running");