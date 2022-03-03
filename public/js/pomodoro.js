// Required variables
var session_seconds = "00";
var session_minutes = 25;
var timer_running = false;

// Audio files
var click_sound = new Audio("sounds/click.wav");
var bell = new Audio("sounds/alarm.wav");

// Starting template for the timer
function template() {
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;
}

//placeholders for the intervals, so the clearinterval can access them
var minutes_interval;
var seconds_interval;

// Functions

// Function for minute counter
function minutesTimer() {
    session_minutes = session_minutes - 1;
    document.getElementById("minutes").innerHTML = session_minutes;
}

// Function for second counter
function secondsTimer() {

    session_seconds = session_seconds - 1;
    document.getElementById("seconds").innerHTML = session_seconds;

    // Check if the seconds and minutes counter has reached 0
    // If reached 0 then end the session
    if (session_seconds <= 0) {
    if (session_minutes <= 0) {
        // Clears the interval i.e. stops the counter
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);
        

        //set the timer status back to false
        timer_running = false;
        // Add the message to the html
        document.getElementById("done").innerHTML =
        "Session Completed!! Take a Break";

        // Make the html message div visible
        document.getElementById("done").classList.add("show_message");

        // PLay the bell sound to tell the end of session
        bell.play();
    }

    // Reset the session seconds to 60
    session_seconds = 60;
    }
}

function start_timer() {
    
    //pause icon = fas fa-pause fa-2x

    if(timer_running == false && session_minutes == 25 && session_seconds == "00"){ //if the timer starts for the first time
        document.getElementById("btnicon").className = 'fas fa-pause fa-2x';

        timer_running = true;
        click_sound.play();
        console.log("timer has started");

        // Change the minutes and seconds to starting time
        session_minutes = 24;
        session_seconds = 59;

        // Add the seconds and minutes to the page
        document.getElementById("minutes").innerHTML = session_minutes;
        document.getElementById("seconds").innerHTML = session_seconds;

        // Start the countdown
        minutes_interval = setInterval(minutesTimer, 60000);
        seconds_interval = setInterval(secondsTimer, 1000);


        //FUNCTION here
    }
    else if(timer_running == true) { //the timer is running and wants to be paused
        click_sound.play();

        //set the status
        timer_running = false;

        //stop the countdown (again)
        clearInterval(seconds_interval);
        clearInterval(minutes_interval);
        console.log("timer has been paused");

        //changing the icon
        document.getElementById("btnicon").className = 'fas fa-play fa-2x';
    }
    else if(timer_running == false) { //the timer is paused and wants to be started again
        click_sound.play();

        //set the status
        timer_running = true;

        //starting the countdown (again)
        minutes_interval = setInterval(minutesTimer, 60000);
        seconds_interval = setInterval(secondsTimer, 1000);

        console.log("timer has started");

        //change the pause icon to a play icon
        document.getElementById("btnicon").className = 'fas fa-pause fa-2x';
    }
}

function reload_page(){
    //reloads the page
    location.reload(true);
}