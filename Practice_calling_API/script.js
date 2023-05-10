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
          
          // Calculate Average TEMP for each day
          const data = JSON.parse(body);
          var temp = []; //Store all temp from response
          var averages = []; //Store Average temp after calculation
          
          //Get all temps from response
          for (let i=0;i<data.list.length;i++){
            temp.push(data.list[i].main.temp) 
          }
          
          // --------------
          // For first day
          var A1 =0; //Initialize Average value for day1
          for (let i=0; i<6; i++){
            A1 += temp[i]
          }
          averages.push(A1/6); //Store in list
          
          //---------------
          // For Day 2 - 5
          let sum = 0;
          let count = 0;
          for (let i=6; i<temp.length-2; i+=8){   //Start at index 6. Last 2 elements are for day 6(we dont need it)
            for (let j=i;  j< i + 8; j++){    //Loop through next 8 elements starting at index i
              sum += temp[j];
              count++;
            }
            const avg = sum/count;        //Calculate the average by dividing by 8
            averages.push(avg);     //append
            sum = 0;               //Reset sum and count for next iteration
            count = 0;
          }

          console.log(averages)
      
      });
  });

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});