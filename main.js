var startActivityBtn = document.querySelector('.start-activity-btn')
var inputBox = document.querySelector(".time-input");
var categoryBtns = document.querySelector('.category-btns');
var timerBtn = document.querySelector(".timer-btn");
var logBtn = document.querySelector(".log-btn");

var currentActivity;

startActivityBtn.addEventListener('click', startActivity);
timerBtn.addEventListener('click', function() {
  updateTimer(currentActivity.startTimer());
});
logBtn.addEventListener('click', createCard);

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
  var currentSeconds = (currentActivity.minutes * 60) + currentActivity.seconds;
  formatRemainingTime(currentSeconds);
}

function displayInput(time) {
  document.querySelector(".goal-phrase").innerText = `${currentActivity.description}`;
  document.querySelector(".goal-duration").innerText = `${time}`;
}
//
// function formatTime() {
//   var seconds = currentActivity.seconds;
//   var minutes = currentActivity.minutes;
//   if (currentActivity.seconds < 10) {
//     seconds = `0${currentActivity.seconds}`;
//   }
//   if (currentActivity.minutes < 10) {
//     minutes = `0${currentActivity.minutes}`;
//   }
//   displayInput(`${minutes}:${seconds}`);
// }

function formatRemainingTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  if (seconds < 10 && seconds > 0) {seconds = `0${seconds}`;}
  if (seconds < 1) {seconds = '00';}
  if (minutes < 10 && minutes > 0) {minutes = `0${minutes}`;}
  if (minutes === 0) {minutes = '00'}
  displayInput(`${minutes}:${seconds}`);
}


function updateTimer(currentSeconds) {
  currentActivity.startTimer();
  formatRemainingTime(currentSeconds);

  var interval = setInterval(function () {
    currentSeconds--;
    formatRemainingTime(currentSeconds);
    if (!currentSeconds) {
      clearInterval(interval);
      triggerCompleteView();
      currentActivity.markComplete();
      if (currentActivity.completed === true) {
        alert("You've completed the activity!")
      }
    }
  }, 1000);
}

function triggerCompleteView() {
  timerBtn.innerText = "COMPLETE!";
  document.querySelector('.log-btn').classList.toggle('hidden')
}

function createCard() {
  document.querySelector('.default-message').classList.add("hidden");
  var htmlBlock = `
        <div class='activity-card'>
          <p id='card-category'>${currentActivity.category}</p>
          <p id='card-time'>${currentActivity.minutes} MIN ${currentActivity.seconds} SECONDS</p>
          <p id='card-task'>${currentActivity.description}</p>
          <div></div>
        </div>`;
document.querySelector('.card-box').insertAdjacentHTML('afterbegin', htmlBlock)
}
