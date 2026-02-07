console.log("adi");
let c,b,z;
let i ="aditya";
for(let val of i){
    console.log(val);
}
let s={
    name:"aditya",
    age:34,
    roll:23
};
for (let r in s){
    console.log(s[r]);
    console.log(r);
}
console.log("name of the student is", s.name, "age and roll is " ,s.age ,s.roll,"respectedly");
let st = `name of the student is ${s.name} age and roll is ${s.age} ${s.roll} respectedly`;
console.log(st);
console.log(window.document);
console.dir(window.document);
let a = prompt("do you want to change the theme");
if(a=="yes"){
     b= prompt("set the color of background");
     document.body.style.background=b;
     c= prompt("set the color of body text");
     document.body.style.color=c;

// switch(b){
//     case "red":
//         document.body.style.background=b;
//         break;
//         case "blue":
//         document.body.style.background=b;
//         break;
//         case "black":
//         document.body.style.background=b;
//         break;
//         case "green":
//         document.body.style.background=b;
//         break;
//         case "aqua":
//         document.body.style.background=b;
//         break;
//         case "azure":
//         document.body.style.background=b;
//         break;
//         default:
//             document.body.style.background=b;
// }

// switch(c){
//     case "red":
//         document.body.style.color=c;
//         break;
//         case "blue":
//         document.body.style.color=c;
//         break;
//         case "black":
//         document.body.style.color=c;
//         break;
//         case "green":
//         document.body.style.color=c;
//         break;
//         case "aqua":
//         document.body.style.color=c;
//         break;
//         case "azure":
//         document.body.style.colord=c;
//         break;
//         default:
//             document.body.style.color=c;
// }


}
let btn = document.querySelector("button");

    btn.onclick = function() {
        btn.innerText="clicked";
        btn.style.cssText='background:blue;color:red';

        let el = document.createElement("div");
el.innerText="chat gpt opened ";
el.style.cssText = ' height:50px;padding: 10px; border: 1px solid black;';
el.style.width="50px";
el.style.backgroundColor=c;

let p =document.querySelector("p");
p.prepend(el);
    };



// In JavaScript, the classList property of an HTML element provides a convenient way to manage the CSS classes applied to that element. It returns a live DOMTokenList collection, which is similar to an array of strings, where each string represents a class name.
// The classList property offers several methods for manipulating an element's classes:
// add(class1, class2, ...): Adds one or more specified classes to the element. If a class already exists, it is ignored

const title={
print() 
{
    console.log("panda");
},
nick:"adi",

};
const ma ={
Name:"aditya",
};
ma.__proto__=title;



class person{
    constructor()
    {
        console.log("called");
    }
    
}
class engineer extends person{
    // constructor(){
    //     // super();
    //     console.log("calleddd");

    // }
print(){
    console.log("adadd");
}
}
let obj=new engineer();


let bt = document.querySelector("button");
bt.onmouseover=(evt)=>{
    console.log(evt);
    z=evt;
    

}




















    




    
