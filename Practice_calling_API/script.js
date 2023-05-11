const express = require('express');
const request = require("request");

const app = express();

const API_KEY = "44410596c1e0b580b79b3679c28c51f8";

app.get('/weather/:lat/:lon', (req, res) => {
  res.send('Hello World!');
  console.log("welcome to the root!");
  var lat = req.params.lat;
  var lon = req.params.lon;
  
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log(error)
	   
		// Printing status code
		console.log(response.statusCode);
		
        
		// Printing TEMP
        const body = JSON.parse(body);
        
        res.send({"temperature": body.main.temp, "WeatherStatus":body.weather[0].main});
		console.log(body.main.temp);
	});
});


// Extra credit: 5 Day
app.get('/5day/:lat/:lon', (req, res) => {
    res.send('Hello World!');
    console.log("5-day forecast(In Fahrenheit)");
    var lat = "req.params.lat";
    var lon = "req.params.lon";
    
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    
      request(url, (error, response, body)=>{
          
          // Printing the error if occurred
          if(error) console.log(error)
         
          // Printing status code
          console.log('StatusCode:',response.statusCode);
          
          // Calculate Average TEMP for each day
          const data = JSON.parse(body);
          const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          const forecast = [];
          let todaysDate = new Date().getDay()

          for (let i=0;i<5;i++){
            let tempSum = 0
            let count = 0
            for (let dataPoint of data.list){
              const date = new Date(dataPoint.dt*1000)
              if (date.getDay() == todaysDate){
                count++;
                tempSum += dataPoint.main.temp;
              }
            }
            const day={"dayName": week[todaysDate], "temp": Math.round(tempSum / count) }
            forecast.push(day)
            todaysDate = (todaysDate + 1) % 7
          }
          res.send({forecast})

          
      });
  });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});