const baseapi = " https://api.weatherapi.com/v1"
const apikey ="2e1fff8ed63a460e86984412241812 "
//https://api.weatherapi.com/v1/forecast.json?key=2e1fff8ed63a460e86984412241812&q=alexandria&days=3

const input =document.getElementById("location")
    const button =document.getElementById("find")
    getweatherdata()

input.addEventListener("input",function(){
    const type =input.value
getweatherdata(type)
})
let weatherdata ={};

async function getweatherdata(city="alexandria"){
    if(city.length===0) return getweatherdata("alexandria")
        if(city.length<3)return
  try {
   let response = await fetch(`${baseapi}/forecast.json?key=${apikey}&q=${city}&days=3`)

   if(response.ok){
    weatherdata =await response.json() 
    
    
    displaydata(weatherdata.forecast.forecastday)
   }
  } catch (error) {
   console.log("error")
  }
}


function displaydata(arr){
  let  cartona =" ";
   
   for(let i=0;i<arr.length;i++){
  const {weekday,day,month,year} =  getdatedetails(arr[i].date)
  
    cartona +=
    `
      <div class="col-md-4 d-flex flex-column">
        <div>
         <div class="first ">
          <header class="d-flex align-items-center justify-content-between p-2 m-0">
          ${i===0?`
            <div class="today">
             ${weekday}
            </div>
            <div class="date">${day}${month}</div>
            `:`
            <div class="today">
             ${weekday}
            </div>
            `}
            
          </header>
         <div class="forecast-content">
         ${i===0?`
             <div class="location">
            ${weatherdata.location.name}
          </div>
            `:``}
         
          <div class="degree">
          ${i===0?`
            <div class="num">
            ${weatherdata.current.temp_c}
              <sup>o</sup>
              C
            </div>
             <div class="forcast-icon">
              <img src="${weatherdata.current.condition.icon}" alt="logo" width="90px">
            </div>
            `:`

         <div class="text-center">
         <div class="forcast-icon mt-5 mb-3">
               <img src="${arr[i].day.condition.icon}" alt="" width="48px">
             </div>
           <div class="degree fs-3 fw-bold mb-2">
              
                 ${arr[i].day.maxtemp_c}
                 <sup>o</sup>
                 C
             </div>
           <small class="fs-5 mb-5">
           ${arr[i].day.mintemp_c}
             <sup>o</sup>
           </small>
           
          </div> 
         </div>
            
            `}
            ${i===0?`
                 <div class="custom ">${weatherdata.current.condition.text}</div>
                `:`
                 <div class="custom text-center">${arr[i].day.condition.text}</div>
                `}
          
          </div>

          ${i==0?`
             <div class="custom">sunday</div>
            
            `:``}
         
         </div>
          ${i===0?`
            <footer>
            <span class="me-4">
              <i class="fa-solid fa-umbrella"></i>
          ${arr[i].day.daily_will_it_rain}%
            </span>
            <span class="me-4">
              <i class="fa-solid fa-wind"></i>
          ${arr[i].day.maxwind_mph}km/h
            </span>
            <span class="me-4">
              <i class="fa-regular fa-compass"></i>
              ${weatherdata.current.wind_dir}
            </span>
          </footer>
            
            `:``}
         </div>
        </div>
        </div>
       
    `
   }

   document.getElementById("rowdata").innerHTML=cartona;
}


function getdatedetails(dates){
  // console.log(dates)
  const datedetails = new Date(dates)
  let weekday = datedetails.toLocaleDateString("en-us",{weekday:"long"})//friday saturday sunday
  let day =datedetails.toLocaleString("en-us",{day:"numeric"})//20 21 22
  let month =datedetails.toLocaleString("en-us",{month:"long"})//december
let year =datedetails.toLocaleString("en-us",{year:"numeric"})//2024

  return {weekday,day,month,year};

}

