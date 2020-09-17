var categoryBtns = document.querySelector(".category-btns");
var complete = document.querySelector(".complete");
var completedView = document.querySelector(".inner-new-activity");
var goalForm = document.querySelector(".main-panel");
var inputBox = document.querySelector(".time-input");
var logBtn = document.querySelector(".log-btn");
var newActivityBtn = document.querySelector(".new-activity-btn");
var start = document.querySelector(".start");
var startActivityBtn = document.querySelector(".start-activity-btn");
var timerView = document.querySelector(".timer-view");

var currentActivity;
var pastActivities = [];

logBtn.addEventListener("click", function() {
  createCard();
  hideTimer();
});

start.addEventListener("click", function() {
  updateTimer(currentActivity.startTimer());
});

startActivityBtn.addEventListener("click", startActivity);

newActivityBtn.addEventListener("click", returnHome);
window.onload = retrieveKeys();

inputBox.addEventListener("keydown", function startActivity(event) {
  var invalidChars = ["-", "+", "e"];
  if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
});

categoryBtns.addEventListener("click", function(event) {
  if (event.target.id.includes("study")) {
    activateBtn("study");
  }
  if (event.target.id.includes("meditate")) {
    activateBtn("meditate");
  }
  if (event.target.id.includes("exercise")) {
    activateBtn("exercise");
  }
});

function activateBtn(category) {
  removeActiveBtnState();
  var imgId = `${category}-graphic`;
  document.getElementById(imgId).src = `./assets/${category}-active.svg`
};

function removeActiveBtnState() {
  var categories = ["study", "meditate", "exercise"];
  for (var i = 0; i < categories.length; i++) {
    document.getElementById(`${categories[i]}-graphic`).src = `./assets/${categories[i]}.svg`
  }
};

function startActivity() {
  var catValue = document.querySelector(".category-btns").elements["user-choice"].value;
  var goal = document.querySelector("#goal").value;
  var min = document.querySelector("#min").value;
  var sec = document.querySelector("#sec").value;

  if (validateInput(catValue, goal, min, sec)) {
    createInstance(catValue, goal, min, sec);
  }
};

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
};

function createInstance(catValue, goal, min, sec) {
  currentActivity = new Activity(catValue, goal, parseInt(min), parseInt(sec));
  switchView();
};

function triggerAlert(alertNeeded) {
  if (alertNeeded === "goal") {
    document.querySelector(".need-goal").classList.toggle("hidden");
  }
  if (alertNeeded === "time") {
    document.querySelector(".need-duration").classList.toggle("hidden");
  }
  if (alertNeeded === "tooLarge") {
    document.querySelector(".limit-duration").classList.toggle("hidden");
  }
};

function switchView() {
  if (currentActivity.category === "Study") {
    document.querySelector(".timer-btn").classList.add("study-ring")
  }
  if (currentActivity.category === "Meditate") {
    document.querySelector(".timer-btn").classList.add("meditate-ring")
  }
  if (currentActivity.category === "Exercise") {
    document.querySelector(".timer-btn").classList.add("exercise-ring")
  }
  goalForm.classList.add("hidden");
  timerView.classList.remove("hidden");
  var currentSeconds = (currentActivity.minutes * 60) + currentActivity.seconds;
  formatRemainingTime(currentSeconds);
};

function displayInput(time) {
  document.querySelector(".goal-phrase").innerText = `${currentActivity.description}`;
  document.querySelector(".goal-duration").innerText = `${time}`;
};

function formatRemainingTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  if (seconds < 10 && seconds > 0) {
    seconds = `0${seconds}`;
  }
  if (seconds < 1) {
    seconds = "00";
  }
  if (minutes < 10 && minutes > 0) {
    minutes = `0${minutes}`;
  }
  if (minutes === 0) {
    minutes = "00"
  }
  displayInput(`${minutes}:${seconds}`);
};

function updateTimer(currentSeconds) {
  currentActivity.startTimer();
  formatRemainingTime(currentSeconds);

  var interval = setInterval(function() {
    currentSeconds--;
    formatRemainingTime(currentSeconds);
    if (!currentSeconds) {
      clearInterval(interval);
      triggerCompleteView();
      currentActivity.markComplete();
      pastActivities.push(currentActivity.saveToStorage(currentActivity));
      if (currentActivity.completed === true) {
        alert("You\'ve completed the activity!");
      }
    }
  }, 1000);
};

function triggerCompleteView() {
  start.classList.toggle("hidden");
  complete.classList.toggle("hidden");
  document.querySelector(".log-btn").classList.toggle("hidden")
};

function createCard() {
  document.querySelector(".default-message").classList.add("hidden");

  var htmlBlock = `
        <article class="past-activities">
          <box class="activity-card">
            <p id="card-category">${currentActivity.category}</p>
            <p id="card-time">${currentActivity.minutes} MIN ${currentActivity.seconds} SECONDS</p>
            <p id="card-task">${currentActivity.description}</p>
          </box>
          <div class="marker"></div>
        </article>`;
  document.querySelector(".card-box").insertAdjacentHTML("afterbegin", htmlBlock)
  if (currentActivity.category === "Study") {
    document.querySelector(".marker").classList.add("study-card")
  }
  if (currentActivity.category === "Meditate") {
    document.querySelector(".marker").classList.add("meditate-card")
  }
  if (currentActivity.category === "Exercise") {
    document.querySelector(".marker").classList.add("exercise-card")
  }
};

function hideTimer() {
  document.querySelector(".left-title").innerText = "Completed Activity";
  document.querySelector(".inner-timer-elements").classList.add("hidden");
  document.querySelector(".inner-new-activity").classList.remove("hidden");
};

function returnHome() {
  document.getElementById("user-choice").reset();
  document.getElementById("goal-form").reset();
  document.getElementById("mins").reset();
  document.getElementById("secs").reset();
  document.querySelector(".left-title").innerText = "Current Activity";
  document.querySelector(".inner-timer-elements").classList.remove("hidden");
  document.querySelector(".inner-new-activity").classList.add("hidden");
  goalForm.classList.toggle("hidden");
  timerView.classList.toggle("hidden");
  removeActiveBtnState();
  triggerCompleteView();
};

function retrieveCards() {
  for (var i = 0; i < pastActivities.length; i++) {
    var retrievedPastAct = localStorage.getItem(pastActivities[i]);
    currentActivity = JSON.parse(retrievedPastAct);
    createCard();
  }
};

function retrieveKeys() {
  var ids = Object.keys(localStorage);

  for (var i = 0; i < ids.length; i++) {
    pastActivities.push(ids[i]);
  }
  retrieveCards();
};
