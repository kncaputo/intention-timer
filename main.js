var startActivityBtn = document.querySelector('.start-activity-btn')
var inputBox = document.querySelector(".time-input");
var categoryBtns = document.querySelector('.category-btns');
var timerBtn = document.querySelector(".timer-btn");

var currentActivity;

startActivityBtn.addEventListener('click', startActivity);
timerBtn.addEventListener('click', function() {
  currentActivity.startTimer();
});
//TO-Do: Refactor HERE
inputBox.addEventListener("keydown", function startActivity(event) {
  var invalidChars = ["-", "+", "e"];
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
})

categoryBtns.addEventListener('click', function(event) {
  if (event.target.id.includes('study')) {
    activateBtn('study');
  }
  if (event.target.id.includes('meditate')) {
    activateBtn('meditate');
  }
  if (event.target.id.includes('exercise')) {
    activateBtn('exercise');
  }
})

function activateBtn(category) {
  removeActiveBtnState();
  var imgId = `${category}-graphic`;
  document.getElementById(imgId).src = `./assets/${category}-active.svg`
}

function removeActiveBtnState() {
  var categories = ['study', 'meditate', 'exercise'];
  for (var i = 0; i < categories.length; i++) {
    document.getElementById(`${categories[i]}-graphic`).src = `./assets/${categories[i]}.svg`
  }
}

function startActivity() {
  var catValue = document.querySelector(".category-btns").elements["user-choice"].value;
  var goal = document.querySelector("#goal").value;
  var min = document.querySelector("#min").value;
  var sec = document.querySelector("#sec").value;

  if (validateInput(catValue, goal, min, sec)) {
    createInstance(catValue, goal, min, sec);
  };
}

function validateInput(catValue, goal, min, sec) {
  if (!goal) {
    triggerAlert("goal");
  } else if (!min || !sec) {
    triggerAlert("time");
  } else if (parseInt(min) > 59 || parseInt(sec) > 59) {
    triggerAlert("tooLarge");
  } else {
    return true;
  }
}

function createInstance(catValue, goal, min, sec) {
  currentActivity = new Activity(catValue, goal, parseInt(min), parseInt(sec));
  switchView();
}

function triggerAlert(alertNeeded) {
  if (alertNeeded === "goal") {
    document.querySelector('.need-goal').classList.toggle('hidden');
  }
  if (alertNeeded === "time") {
    document.querySelector('.need-duration').classList.toggle('hidden');
  }
  if (alertNeeded === "tooLarge") {
    document.querySelector('.limit-duration').classList.toggle('hidden');
  }
}

function switchView() {
  var goalForm = document.querySelector(".main-panel");
  var timerView = document.querySelector(".timer-view");
  if (currentActivity.category === "study") {
    document.querySelector(".timer-btn").classList.add("study-ring")
  }
  if (currentActivity.category === "meditate") {
    document.querySelector(".timer-btn").classList.add("meditate-ring")
  }
  if (currentActivity.category === "exercise") {
    document.querySelector(".timer-btn").classList.add("exercise-ring")
  }
  goalForm.classList.toggle("hidden");
  timerView.classList.toggle("hidden");
  formatTime();
}

function displayInput(time) {
  document.querySelector(".goal-phrase").innerText = `${currentActivity.description}`;
  document.querySelector(".goal-duration").innerText = `${time}`;
}

function formatTime() {
  var seconds = currentActivity.seconds;
  var minutes = currentActivity.minutes;
  if (currentActivity.seconds < 10) {
    seconds = `0${currentActivity.seconds}`;
  }
  if (currentActivity.minutes < 10) {
    minutes = `0${currentActivity.minutes}`;
  }
  displayInput(`${minutes}:${seconds}`);
}

function formatRemainingTime(time) {
  currentActivity.minutes = Math.floor(time / 60);
  currentActivity.seconds = time % 60;
  var seconds = currentActivity.seconds;
  var minutes = currentActivity.minutes;

  if (currentActivity.seconds < 10 && currentActivity.seconds > 0) {
    seconds = `0${currentActivity.seconds}`;
  }
  if (currentActivity.seconds < 1) {
    seconds = '00';
  }
  if (currentActivity.minutes < 10 && currentActivity.minutes > 0) {
    minutes = `0${currentActivity.minutes}`;
  }
  if (currentActivity.minutes === 0) {
    minutes = '00'
  }
  displayInput(`${minutes}:${seconds}`);
  // if (currentSeconds === 0) {stopTimer();}
}

// function beginCountdown() {
//
//
// }

function updateTimer() {
  currentActivity.startTimer();
}

// function giveTimerValues(min, sec) {
//   var interval;
//   var totalSeconds = min*60 + sec
//   interval = setInterval(function() {
//     totalSeconds--;
//     displayTime(totalSeconds)
//     if(!totalSeconds){
//       clearInterval(interval);
//     }
//   },1000)
// }
