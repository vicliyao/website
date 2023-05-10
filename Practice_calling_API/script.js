const express = require('express');
const request = require("request");

const app = express();

const API_KEY = "44410596c1e0b580b79b3679c28c51f8";

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log("welcome to the root!");
  var lat = "37.77493";
  var lon = "-122.41942";
  
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  
	request(url, (error, response, body)=>{
		
		// Printing the error if occurred
		if(error) console.log(error)
	   
		// Printing status code
		console.log(response.statusCode);
		
        
		// Printing TEMP
        const data = JSON.parse(body);
		console.log(data.main.temp);
	});
});


// Extra credit: 5 Day
app.get('/5day', (req, res) => {
    res.send('Hello World!');
    console.log("5-day forecast(In Fahrenheit)");
    var lat = "37.77493";
    var lon = "-122.41942";
    
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    
      request(url, (error, response, body)=>{
          
          // Printing the error if occurred
          if(error) console.log(error)
         
          // Printing status code
          console.log('StatusCode:',response.statusCode);
          
          
          // Printing TEMP for each day at 12pm noon
          const data = JSON.parse(body);
          for(var i=2;i<data.list.length;i+=8){// Observe that 12pm temp for the first day is the 2nd, each one after is + 8
          console.log(data.list[i].main.temp);
        }
      });
  });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});