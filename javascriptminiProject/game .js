let usercore = 0;
let computer = 0;
let msg = document.querySelector("#mssg");
let l = document.querySelector("#user");
let k = document.querySelector("#comp");

const generate = () => {
    //r,p,s
    let a = ["r", "p", "s"];
    let o = Math.floor(Math.random() * 3);
    return a[o];
}
const playgamw = (u) => {
    //generate cop choice
    let w = generate();
    if (w == u) {
        msg.innerText = "draw";
        l.innerText = "0";
        k.innerText = "0";


    }
    else {
        let t = true;
        if (u == "r") {
            t = w == "p" ? false : true;



        }
        else if (u == "p") {
            t = w == "s" ? false : true;
        }
        else {
            t = w == "r" ? false : true;
        }
        if (t == true) {
            msg.style.color = 'green';
            msg.innerText = "user won";
            usercore++;
            l.innerText = usercore;


        } else {
            msg.style.color = 'red';
            msg.innerText = "comp won";
            computer++;
            k.innerText = computer;
        }

    }



}
const e = document.querySelectorAll(".u");
e.forEach((val) => {
    val.addEventListener("click", () => {
        const userc = val.getAttribute("id");
        console.log(userc);
        playgamw(userc);
    })

});