
function t()
{
console.log("connected"); 

}
setTimeout(t,3000);
setTimeout(()=>{
    console.log("2sec");
},2000); /*can define as arrow function */
console.log("hii");
function sum (a,b){
    return a+b;
    // console.log(a+b);
}

function calculate(a,b,ssum){
    console.log(ssum(a,b));
    // ssum(a,b);
}
calculate(1,2,sum);
 /*don't pass function as function with paranyhesis */
//  or we can pass function as parameter

    
calculate(3,4,(a,b)=>{
    console.log(a+b);
});
function getDataa(dataId){
    setTimeout(() => {
        console.log("data",dataId);
        
        
    }, 5000);
}
getDataa(123);
getDataa(1);
getDataa(2);
getDataa(3);


function getData(dataId,getNxtData){
    setTimeout(() => {
        console.log("data",dataId);
        if(getNxtData){
        getNxtData();
        }
    }, 5000);
}
getData(123);
getData(1,()=>{
    console.log("getting data 2.....");
    getData(2,()=>{
        console.log("getting data 3.....");
        getData(3,()=>{
            console.log("processed complted");
            
        });
    }); 
});
// above codes are knowns as callback hell
 
    function getDataaa(dataId){
       return new Promise((resolve,reject)=>{
             setTimeout(() => {
        console.log("data",dataId);
        resolve("success");
        
        
    }, 15000);
        });
   


    }

 console.log("getting data5 from getdataa...");
let dau = getDataaa(5);
dau.then((res)=>{
    console.log("getting data6 from getdataa...");
return getDataaa(6);
}).then((res)=>{
    console.log("getting data7 from getdataa...");
return getDataaa(7);
});
function asynfan(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           console.log("somedata");
           resolve("sucess") ;
        }, 30000);
    });
}
function asynfan2(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
           console.log("somedata2");
           resolve("sucess") ;
        }, 30000);
    });
}
console.log("fetching data...");
let p=asynfan();
p.then((res)=>{
    console.log(res);
    console.log("fetching somedata2 ...");
    let p2=asynfan2();
p.then((res)=>{
    console.log(res);
});

});



function api(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
       console.log("weather data");
       resolve(200);     
        }, 3000);
    });
}
(async function getWeatherData() {
    await api();
})();
// let dai=getWeatherData();we put the async function into a paranthesis ()and use paranthesis after thet make them auto invoked as above function

function getDat(dataId){
       return new Promise((resolve,reject)=>{
             setTimeout(() => {
        console.log("data",dataId);
        resolve("success");
        
        
    }, 25000);
        });
   

    }
    async function www() {
        console.log("fetching somedata8...");
    await getDat(8);
    console.log("fetching somedata9 ...");
    await getDat(9);
    console.log("fetching somedata10 ...");
    await getDat(10);
    

}
let nara = www(); 

nara.then((res)=>{
    console.log(res);
});