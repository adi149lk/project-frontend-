

let c = document.querySelector("button");
let d = "white";
c.addEventListener("click", () => {

    if (d == "white") {
        document.body.style.backgroundColor = 'black';
        d = "black";
        console.log(d);


    } else {
        document.body.style.backgroundColor = 'white';
        d = "white";
        console.log(d);
    }

});



// let a = prompt("do you wnt change the back ground color");
// if (a == "yes") {
//     let b = prompt("please enter the color");
//     switch (b) {
//         case "red":
//             document.body.style.backgroundColor = 'red';
//             break;
//         case "green":
//             document.body.style.backgroundColor = 'green';
//             break;
//         default:
//             document.body.style.backgroundColor = 'aqua';

//     }
// }
let boxes = document.querySelectorAll(".btn");
let res = document.querySelector("#reset");
let turn = true;
const arr = [
    [0, 1, 2], [0, 4, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]];
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box  was clicked");
        if (turn) {
            box.innerText = "O";
            turn = false;

        }
        else {
            box.innerText = "X";
            turn = true;

        }
        box.disabled = true;
        checkwiiner();
    })

})
const checkwiiner = () => {
    for (let h of arr) {
        let pos1 = boxes[h[0]].innerText;
        let pos2 = boxes[h[1]].innerText;
        let pos3 = boxes[h[2]].innerText;
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3)
                document.body.innerText = "winner  is " + pos1;

        }


    }


}
res.addEventListener("click", () => {
    boxes.forEach(val => {
        val.innerText = "";
        val.disabled = false;

    });
})