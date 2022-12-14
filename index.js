// dislay curent time function
var currTime = document.getElementById("current-time");

// take time from js
function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    //AM/PM 
    ampm = "AM";
    if (hh >= 12) {
        hh = hh - 12;
        ampm = "PM";
    }
  
    hh = hh == 0 ? hh = 12 : hh;
    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;
 

   
// display time
    let time = hh + ":" + mm + ":" + ss +" "+ampm;
    

    currTime.innerText = time;
    let t = setTimeout(function () {
        currentTime()
        if (alarm_List.includes(time)) {
            ringing(time);
        }
    }, 1000);
}

currentTime();



// taking input from user for alarm
let alarm_List = [];
const userInput = document.querySelector(".user-input");
userInput.addEventListener("submit", function (e) {
    e.preventDefault();
    const hour = userInput.hour.value;
    const min = userInput.min.value;
    const sec = userInput.sec.value;
    const ampm= userInput.ampm.value;
    let new_h = formatTime(hour);
    if (new_h === "0") {
        new_h = "00";
    }
    let new_m = formatTime(min);
    if (new_m === "0") {
        new_m = "00";
    }
    let new_s = formatTime(sec);
    if (new_s === "0") {
        new_s = "00";
    }


    // set new alarm
    const new_Alarm = `${new_h}:${new_m}:${new_s} ${ampm}`;
    if (isNaN(new_Alarm)) {
        if (!alarm_List.includes(new_Alarm)) {
            alarm_List.push(new_Alarm);
            shownew_Alarm(new_Alarm);

        } else {
            alert(`Alarm for ${new_Alarm} already set.`);
        }
    } else {
        alert("Invalid Time Entered");
    }
});

//set 0 before digit
function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return "0" + time;
    }
    return time;
}
const myList = document.querySelector(".set-alarms-list");

// display set alarm list
function shownew_Alarm(new_Alarm) {
    var al = (alarm_List.length == 0) ? "No Alarms Left" : "Alarms";
    document.getElementById("alarms").innerText = al;
    const html = `
    <li class = "time-list">        
        <span class="time">${new_Alarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${new_Alarm}>Delete</button>       
    </li>`;
    myList.innerHTML += html;


}

//audio for alarm
const audio = new Audio('./alarm ring.mp3');
//ADDING LOOP TO CONTINUE ALARM
audio.loop = true;

// RINGS THE AUDIO  AT THE CORRECT TIME 
function ringing(time) {
    audio.play();
    
    setTimeout(() => {
        alert("Alarm Ringing...")
      }, 1000)
    audio.play();
}



//stop the alram
const clearAlarm = () => {
    audio.pause();
    alert("Alarm cleared");
};

//FUNCTION FOR STOP THE ALARM
const mylist = document.getElementsByClassName("set-alarms-list");
myList.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
});


// this function for remove the alarm from list 
const remove = (value) => {
    audio.pause();
    let newList = alarm_List.filter((time) => time != value);
    alarm_List.length = 0; // Clear contents
    alert("Are You  Want to delete this alarm");
    alarm_List.push.apply(alarm_List, newList);
    if(alarm_List.length==1){
        document.getElementById("alarms").innerText = "No Alarm set";
    }
};
