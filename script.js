//Asigns inputs
const workInput = document.querySelector("#work");
const sbreakInput = document.querySelector("#sbreak");
const checkInput = document.querySelector("#checks");
const lbreakInput = document.querySelector("#lbreak");
//Sets initial values
workInput.value = 3;
sbreakInput.value = 1;
lbreakInput.value = 4;
checkInput.value = 4;

//Asign displays
const workDisplay = document.querySelector("#workClock");
const breakDisplay = document.querySelector("#breakClock");
const checkDisplay = document.querySelector("#checkCount");

// all values in seconds
let settedWorkTime;
let settedShortBreakTime;
let settedLongBreakTime;
let settedCheckLimit;

//values modified by function
let workTime;
let breakTime;
let checks;

//switch between clocks
let w;
let b = false;
//controls clock
let play;


//Adds play/pause functionality
const playButton = document.querySelector("#playPause");
    playButton.addEventListener("click", e => playPause());

//Sets new custom timer
const newClock = document.querySelector("#newClock");
    newClock.addEventListener("click", e => setup());



//Functions

//Sets values
function setup(){
    play = false;
    w = true;
    
    settedWorkTime = workInput.value * 60;
    settedShortBreakTime = sbreakInput.value * 60;
    settedLongBreakTime = lbreakInput.value * 60;
    settedCheckLimit = Number(checkInput.value);
    
    workDisplay.textContent = formatTime(settedWorkTime);
    breakDisplay.textContent = formatTime(settedShortBreakTime);
    checkDisplay.innerHTML = "";
    playButton.innerHTML = "&#9658;";
    
    workTime = settedWorkTime;
    breakTime = settedShortBreakTime;
    checks = 0;

    return;
}

//Play/Pause
function playPause(){
    play = !play;

    if (play) {
        playButton.innerHTML = "&#9208;";
    } else {
        playButton.innerHTML = "&#9658;";
    }

    return;
}

//Formats seconds into "00:00"
function formatTime(n){
    let min = String(Math.floor(n/60)).padStart(2, "0");
    let sec = String(n%60).padStart(2, "0");

    return `${min}:${sec}`;
}

//Display checks, checks length to display short version
function displayChecks(){
    checkDisplay.innerHTML = checks > 4 ? checks + "&check;" : "&check;".repeat(checks);
    return;
}


//Clock, always running. It only runs down the clock if both play and w or b are true
const countDown = setInterval(()=>{

    if(!play) return;

    if (w){
        workTime--;
        
        if (workTime === 0){
            w = false;
            workTime = settedWorkTime;

            checks++;

            displayChecks();
        }

        workDisplay.textContent = formatTime(workTime);

    } else {
        breakTime--;
        
        if (breakTime === 0){
            w = true;

            if (checks === settedCheckLimit - 1){
                breakTime = settedLongBreakTime;
            } else {
                breakTime = settedShortBreakTime;
            }

            if (checks === settedCheckLimit) {
                checks = 0;
                displayChecks();
            }
        }
        
        breakDisplay.textContent = formatTime(breakTime);
    }
    
    

    return;
},20);

setup();