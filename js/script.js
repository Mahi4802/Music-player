console.log("hello");

const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img__area img"),
musicName = wrapper.querySelector(".song_details .names"),
musicArtist = wrapper.querySelector(".song_details .artist"),
mainAudio = wrapper.querySelector(" #main-audio"),
playpauseBtn = wrapper.querySelector(".play-puase"),
nextbtn = wrapper.querySelector("#next"),
prevbtn = wrapper.querySelector("#prev"),
progressArea = wrapper.querySelector(".progress_area"),
progressBar = wrapper.querySelector(".progress_bar"),
musiclist = wrapper.querySelector(".music-list"),
showmorebtn = wrapper.querySelector("#more_musics"),
hidemusicbtn = musiclist.querySelector("#close");




let musicIndex= 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingNow();
  })
  function loadMusic(indexNumb){
    musicName.innerText = allmusic[indexNumb - 1].name;
    musicArtist.innerText = allmusic[indexNumb - 1].artist;
    musicImg.src = `images/${allmusic[indexNumb-1].img}.jpg`;
    mainAudio.src = `audios/${allmusic[indexNumb-1].src}.mp3`;
}
function playMusic() {
  wrapper.classList.add("paused");
  playpauseBtn.querySelector("span").innerText="pause"
  mainAudio.play();
}

//pause function
function pauseMusic() {
  wrapper.classList.remove("paused");
  playpauseBtn.querySelector("span").innerText="play_arrow"
  mainAudio.pause();
}

//next music function 
function nextmusic() {
  musicIndex++;
  //if   musicIndex is greater than array.length then   musicIndex will play fst song
  musicIndex > allmusic.length?   musicIndex = 1 :  musicIndex =  musicIndex
  loadMusic(musicIndex);
  playMusic() ;
  playingNow()
}

//prev music function
function prevmusic() {
  musicIndex--;
  //if musicindex is less than 1 then musicindex will be array length so lst song will play
  musicIndex < 1?   musicIndex = allmusic.length:  musicIndex =  musicIndex
  loadMusic(musicIndex);
  playMusic() ;
  playingNow()
}

playpauseBtn.addEventListener("click",()=>{
 const ismusicpaused = wrapper.classList.contains("paused");

  //if ismusicpaused is true then it calls pausemusic() else playmusic
  ismusicpaused ? pauseMusic() : playMusic(); 
  playingNow()

})
nextbtn.addEventListener('click',()=>{
  nextmusic();
});
prevbtn.addEventListener('click',()=>{
  prevmusic();
});
mainAudio.addEventListener("timeupdate",(e)=>{
const currentTime = e.target.currentTime;
const duration= e.target.duration;
let progressWidth =(currentTime / duration)*100;
progressBar.style.width = `${progressWidth}%`;
let musicCurrentTime = wrapper.querySelector('.currentTime'),
musicDuration = wrapper.querySelector('.duration');
   
mainAudio.addEventListener('loadeddata',()=>{


let audioDuration = mainAudio.duration;
let totalmin = Math.floor(audioDuration/60);
let totalsec =Math.floor (audioDuration%60);
if(totalsec < 0){
  totalsec = `0${totalsec}`
}
musicDuration.innerText = `${totalmin}:${totalsec}`;

})
let currentMin =  Math.floor(currentTime/60);
let currentsec =  Math.floor(currentTime%60);
if(currentsec < 10){
  currentsec = `0${currentsec}`
}
musicCurrentTime.innerText=`${currentMin}:${currentsec}`
})
progressArea.addEventListener('click',(e)=>{

let progressbarWidthval = progressArea.clientWidth; //getting width of progress bar
let clickedoffsetX = e.offsetX;  //getting offset x value
let songDuration = mainAudio.duration;// getting song total duration

mainAudio.currentTime = (clickedoffsetX / progressbarWidthval)*songDuration;
playMusic()

})
//change loop, shuffle, repeat icon onclick
const repeatbtn = wrapper.querySelector("#repeat-plist");
repeatbtn.addEventListener("click", ()=>{
  let getText = repeatbtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      repeatbtn.innerText = "repeat_one";
      repeatbtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatbtn.innerText = "shuffle";
      repeatbtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatbtn.innerText = "repeat";
      repeatbtn.setAttribute("title", "Playlist looped");
      break;
  }
});
mainAudio.addEventListener("ended", ()=>{
  // we'll do according to the icon means if user has set icon to
  // loop song then we'll repeat the current song and will do accordingly
  let getText = repeatbtn.innerText; //getting this tag innerText
  switch(getText){
    case "repeat":
      nextmusic(); //calling nextMusic function
      break;
    case "repeat_one":
      mainAudio.currentTime = 0; //setting audio current time to 0
      loadMusic(musicIndex); //calling loadMusic function with argument, in the argument there is a index of current song
      playMusic(); //calling playMusic function
      break;
    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1); //genereting random index/numb with max range of array length
      do{
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      }while(musicIndex == randIndex); //this loop run until the next random number won't be the same of current musicIndex
      musicIndex = randIndex; //passing randomIndex to musicIndex
      loadMusic(musicIndex);
      playMusic();
      // playingSong();
      playingNow()
      break;
  }
});
showmorebtn.addEventListener("click",()=>{
  musiclist.classList.toggle("show");
});
hidemusicbtn.addEventListener('click',()=>{
  showmorebtn.click()
})
  
const ultag = wrapper.querySelector("ul");
for (let i = 0; i < allmusic.length; i++) {
  let liTag = `<li li-index="${i + 1}">
  <div class="row">
      <span>${allmusic[i].name}</span>
  <p>${allmusic[i].artist}</p>
  </div>
  <span id="${allmusic[i].src}"class="audio-duration">3:40 </span>
  <audio class="${allmusic[i].src}" src="audios/${allmusic[i].src}.mp3"></audio>
  
</li>`;
ultag.insertAdjacentHTML('beforeend', liTag )


let liAudioTag = ultag.querySelector(`.${allmusic[i].src}`);
let liAudioDuration = ultag.querySelector(`#${allmusic[i].src}`);


liAudioTag.addEventListener("loadeddata",()=>{

  let aduration = liAudioTag.duration;
  let totalmin = Math.floor(aduration / 60);
  let totalsec =Math.floor (aduration % 60);
  if(totalsec < 10){
    totalsec = `0${totalsec}`
  }
  liAudioDuration.innerText = `${totalmin}:${totalsec}`;
  liAudioDuration.setAttribute("t-duration", `${totalmin}:${totalsec}`)
  })
}

const allLiTags = ultag.querySelectorAll('li')


function playingNow() {
  for (let j = 0; j < allmusic.length; j++) {
    let audioTag = allLiTags[j].querySelector(".audio-duration")
   
 if(allLiTags[j].classList.contains("playing")){
      allLiTags[j].classList.remove("playing")
      let adDuration = audioTag.getAttribute("t-duration")

      audioTag.innerHTML= adDuration;
    }

    if(allLiTags[j].getAttribute("li-index")==musicIndex){
      allLiTags[j].classList.add("playing");
      audioTag.innerText="playing";
    }

allLiTags[j].setAttribute('onclick', 'clicked(this)')

  } 
}
function clicked(element) {
  let getLiIndex = element.getAttribute("li-index")
  musicIndex =  getLiIndex ;
  loadMusic(  musicIndex);
  playMusic();
  playingNow();
}