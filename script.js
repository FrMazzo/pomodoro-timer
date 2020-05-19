//Asigns inputs
const sessionInput = document.querySelector("#session");
const sbreakInput = document.querySelector("#sbreak");
const checkInput = document.querySelector("#checks");
const lbreakInput = document.querySelector("#lbreak");
//Sets initial values
sessionInput.value = 3;
sbreakInput.value = 1;
lbreakInput.value = 4;
checkInput.value = 4;

//Asigns displays
const sessionDisplay = document.querySelector("#sessionClock");
const breakDisplay = document.querySelector("#breakClock");
const checkDisplay = document.querySelector("#checkCount");

//all values in seconds
let settedSessionTime;
let settedShortBreakTime;
let settedLongBreakTime;
let settedCheckLimit;

//values modified by function
let sessionTime;
let breakTime;
let checks;

//switch between clocks
let session;
//controls clock
let play;


//Play/pause functionality
const playButton = document.querySelector("#playPause");
    playButton.addEventListener("click", e => playPause());

//Sets new custom timer
const newClock = document.querySelector("#newClock");
    newClock.addEventListener("click", e => setup());



//Functions

//Sets values
function setup(){
    play = false;
    session = true;
    
    settedSessionTime = sessionInput.value * 60;
    settedShortBreakTime = sbreakInput.value * 60;
    settedLongBreakTime = lbreakInput.value * 60;
    settedCheckLimit = Number(checkInput.value);
    
    sessionDisplay.textContent = formatTime(settedSessionTime);
    sessionDisplay.classList.add("running");
    breakDisplay.textContent = formatTime(settedShortBreakTime);
    breakDisplay.classList.remove("running");
    checkDisplay.innerHTML = "";
    playButton.innerHTML = "&#9658;";
    
    sessionTime = settedSessionTime;
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

//Display checks, if checks > 4 displays short version
function displayChecks(){
    checkDisplay.innerHTML = checks > 4 ? checks + "&check;" : "&check;".repeat(checks);
    return;
}

//Swaps running class, plays sound
function swapRunning(){
    sessionDisplay.classList.toggle("running");
    breakDisplay.classList.toggle("running");

    let notification = new Notification("A");
    return;
}

//Clock, always running. It only runs down the clock if both play and w or b are true
const countDown = setInterval(()=>{

    if(!play) return;

    if (session){
        sessionTime--;
        
        if (sessionTime === 0){
            session = false;
            sessionTime = settedSessionTime;

            checks++;

            displayChecks();

            swapRunning();
        }

        sessionDisplay.textContent = formatTime(sessionTime);

    } else {
        breakTime--;
        
        if (breakTime === 0){
            session = true;

            if (checks === settedCheckLimit - 1){
                breakTime = settedLongBreakTime;
            } else {
                breakTime = settedShortBreakTime;
            }

            if (checks === settedCheckLimit) {
                checks = 0;
                displayChecks();
            }

            swapRunning();    
        }
        
        breakDisplay.textContent = formatTime(breakTime);
    }
    
    return;

}, 1000);

setup();
