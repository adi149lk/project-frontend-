let s=document.querySelector(".playbutton").children[1];
let pre=document.querySelector(".playbutton").children[0];
let post=document.querySelector(".playbutton").children[2];
let c=[];
let currentSong=new Audio();
let turn=true,p; 
let currFolder;
let fd=[];
let cd=document.querySelector(".cardContainer");

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


const playSong=(au)=>{
currentSong.src=`/${currFolder}/`+au;
currentSong.play();
s.src="img/pause.svg";
// img.src="img/pause.svg";
document.querySelector(".songinfo").innerHTML=au;
document.querySelector(".songtime").innerHTML="00:00/00:00";

if(turn){
backgroundColor();
turn=false;
}
}
let getSongs=async (folder)=>{
    let a =await fetch(`http://127.0.0.1:5500/${folder}/`);
    currFolder=folder;
    // console.log(a);
    let response=await a.text();
    // console.log (response);
    let div = document.createElement("div");
    div.innerHTML=response;
    let lis= div.getElementsByTagName("a");
    // console.log(lis); 
//    console.log( lis[2].children[0]);
let songnm=[]           
for (let index = 0; index < lis.length; index++) {
    const element = lis[index];
    if(element.href.endsWith(".mp3")){
        songnm.push(element.href.split(`/${folder}/`)[1]);
    }
    
}
 let ul=document.querySelector(".songlist").getElementsByTagName("ul")[0];
        ul.innerHTML="";
    for (const el of songnm) {
    
          ul.innerHTML=ul.innerHTML+` <li>
                    <img src="img/music.svg" class="invert" alt="music">
                    <div class="info">
                    
                        <div> ${decodeURI(el)} </div>
                        <div>aditya</div>
                    </div>
                    <div class="playnow flex items-center justify-content">
                        <span>play now</span>
                        <img src="img/play.svg" class="invert" alt="play">
                    </div>
                    
                  </li>` 
    }
     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=> {
            e.addEventListener("click", ()=>{
                // console.log(e.querySelector(".info").children[0].innerHTML);
                playSong(e.querySelector(".info").children[0].innerHTML.trim());

            });
          });


return songnm;
};




(async function display() {
    let a =await fetch(`http://127.0.0.1:5500/songs/`);
    // currFolder=folder;
    
    let response=await a.text();
    // console.log (response);
    let div = document.createElement("div");
    div.innerHTML=response;
    // console.log(div);
    let lis= div.getElementsByTagName("a");
    
    for (let index = 0; index < lis.length; index++) {
    const element = lis[index];
    if(element.href.includes("/songs")){
        fd.push(element.href.split("/").slice(-2)[1]);
    }
    
}
fd.shift();
// console.log(fd);
for (let index = 0; index < fd.length; index++) {
    
    
    // console.log(fd[index]);
     let a =await fetch(`http://127.0.0.1:5500/songs/${fd[index]}/info.json`);
     let response=await a.json();
    // console.log(response);
    cd.innerHTML=cd.innerHTML+`<div data-folder=${fd[index]} class="card">
                        <div class="play">
                            <i>P</i>
                        </div>
                        <img src="songs/${fd[index]}/cover.jpg" alt="happy">
                        <h2>${response["title"]}</h2>
                        <p>${response["description"]}</p>

                    </div>`

    
}
    
Array.from(document.getElementsByClassName("card")).forEach(e=>{
e.addEventListener("click",async (el)=>{  
//    console.log(el.currentTarget.dataset.folder); 
c=await getSongs(`songs/${el.currentTarget.dataset.folder}`);
document.querySelector(".playbar").style.backgroundColor="#afafaf";
  s.src="img/play.svg";
  currentSong.src=`${currFolder}`+c[0];
  if(currentSong.paused){
    playSong(c[0]);
  }
  else{

      currentSong.pause();
  }
  document.querySelector(".songinfo").innerHTML=c[0].replaceAll("%20"," ");
        document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
});
});

})();



let main=async()=>{

        // c=await getSongs("songs/cs");
        
        


      //   decodeURI()covert the url to simple readable text form for ex: it remove the %20 i.e automated by browser when send request to server using the text word as keyword  it replace  space of  that text to %20 instaed of using this function we can all use el.replaceAll("%20"," ")
    
     
       
        s.addEventListener("click",()=>{
            if(currentSong.paused){
                currentSong.play();
                 s.src="img/pause.svg"
                
              backgroundColor();
             

            }
            else{
                currentSong.pause();
                clearInterval(backgroundColor);
                s.src="img/play.svg"
                clearInterval(t);
            }
        });
        currentSong.addEventListener("timeupdate",()=>{
            // console.log(currentSong.currentTime ,currentSong.duration);
            document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
            document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100+"%"
        });
    
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left=percent+"%";
        currentSong.currentTime=(currentSong.duration*percent)/100;

    });

    document.querySelector(".humbuger").addEventListener("click",()=>{
      document.querySelector(".left").style.left="0%";
    });

   document.querySelector(".close").addEventListener("click",()=>{
   document.querySelector(".left").style.left="-120%";
   });


    pre.addEventListener("click",()=>{
         let index=c.indexOf(currentSong.src.split("/").slice(-1)[0])
         if(index==0){
            index=c.length-1;
            playSong(decodeURI(c[index]));
           
        
         }
        // currentSong.src="/{folder}/"c[index+1];
        // currentSong.play();
        // s.src="img/pause.svg"  or
        else{

            playSong(decodeURI(c[index-1]));
        }
        
        
     });

    post.addEventListener("click",()=>{
       
         let index=c.indexOf(currentSong.src.split("/").slice(-1)[0])
         if(index==c.length-1){
            index=0;
             playSong(decodeURI(c[index]));
         }
        // currentSong.src="/{folder}/"+c[index+1];
        // currentSong.play();
        // s.src="img/pause.svg" or
        else{

            playSong(decodeURI(c[index+1]));
        }

     });
     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
           currentSong.volume=parseInt(e.target.value)/100;
     });

    }

main() ;






 

        
    
    // 
    
    // audio.addEventListener("loadeddata",()=>{
    //     let duration=audio.duration;
    //     console.log(duration,audio.duration,audio.currentSrc,audio.currentTime);
        
    // });
 



// }


// s.addEventListener("click",playSong);