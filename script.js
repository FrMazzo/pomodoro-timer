// all values in seconds
let settedWorkTime = 1500;
let settedShortBreakTime = 300;
let settedLongBreakTime = 1200;
let settedCheckLimit = 4;

//values modified by function
let workTime = settedWorkTime;
let breakTime = settedShortBreakTime;
let checks = 0;

//switch between clocks
let w = true;
let b = false;
//controls clock
let play = false;


//Display initial values
const workDisplay = document.querySelector("#workClock");
    workDisplay.textContent = format(settedWorkTime);

const breakDisplay = document.querySelector("#breakClock");
    breakDisplay.textContent = format(settedShortBreakTime);

const checkDisplay = document.querySelector("#checkCount");


//Adds play/pause functionality
const playButton = document.querySelector("#playPause");
    playButton.innerHTML = "&#9658;";
    playButton.addEventListener("click", e => {
        play = !play;
        if (play) {
            playButton.innerHTML = "&#9208;";
        } else {
            playButton.innerHTML = "&#9658;";
        }
    });

//Shows starting values
const workInput = document.querySelector("#work");
    workInput.value = settedWorkTime/60;

const sbreakInput = document.querySelector("#sbreak");
    sbreakInput.value = settedShortBreakTime/60;

const checkInput = document.querySelector("#checks");
    checkInput.value = settedCheckLimit;

const lbreakInput = document.querySelector("#lbreak");
    lbreakInput.value = settedLongBreakTime/60;

//Sets new custom timer
const newClock = document.querySelector("#newClock");
    newClock.addEventListener("click", e => {
        play = false;
        
        settedWorkTime = workInput.value * 60;
        settedShortBreakTime = sbreakInput.value * 60;
        settedLongBreakTime = lbreakInput.value * 60;
        settedCheckLimit = checkInput.value;
        
        workDisplay.textContent = format(settedWorkTime);
        breakDisplay.textContent = format(settedShortBreakTime);
        checkDisplay.innerHTML = "";
        
        workTime = settedWorkTime;
        breakTime = settedShortBreakTime;
        checks = 0;
    });

//Formats seconds into "00:00"
function format(n){
    let min = String(Math.floor(n/60)).padStart(2, "0");
    let sec = String(n%60).padStart(2, "0");

    return `${min}:${sec}`;
}


//Clock, always running. It only runs down the clock if both play and w or b are true
const countDown = setInterval(()=>{

    if (w && play){
        workTime--;
        workDisplay.textContent = format(workTime);

        if (workTime === 0){
            w = false;
            b = true;
            checks++;
            console.log("pomo");


            if (checks === settedCheckLimit){
                breakTime = settedLongBreakTime;
            } else {
                breakTime = settedShortBreakTime;
            }
        }

    } else if (b && play) {
        breakTime--;
        breakDisplay.textContent = format(breakTime);

        if (breakTime === 0){
            b = false;
            w = true;


            workTime = settedWorkTime;
            if (checks === settedCheckLimit){
                checks = 0;
            }
        }

    }
    
    checkDisplay.innerHTML = checks > 4 ? checks + "&check;" : "&check;".repeat(checks);

},1000);