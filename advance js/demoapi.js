//  fetch("https://www.metaweather.com/api/location/search/?query=Delhi")
//   .then(res => res.json())
//   .then(data => console.log(data));
// fetch("https://catfact.ninja/fact")
//   .then(res => res.json())
//   .then(data => console.log(data.fact));
// fetch("https://official-joke-api.appspot.com/random_joke")
//   .then(res => res.json())
//   .then(data => console.log(data.setup + " - " + data.punchline));


// let url="https://www.metaweather.com/api/location/search/?query=Delhi";
let p =document.querySelector("p");
let btn=document.querySelector("button");

let url ="https://official-joke-api.appspot.com/random_joke"

// let promise = 
// console.dir(promise);
let getJokes = async ()=>{
    console.log("getting data...")
    
    let response=await fetch(url);
    console.log(response);
    let data =await response.json();
    console.log(data);
    console.log(data.setup);
    console.log(data.punchline);
    p.innerText=(data.setup)+(data.punchline);
    
};
btn.addEventListener("click", getJokes);
 console.log(getJokes);