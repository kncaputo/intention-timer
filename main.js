var startActivityBtn = document.querySelector('.start-activity-btn')
var inputBox = document.querySelector(".time-input");
var categoryBtns = document.querySelector('.category-btns');
var timerBtn = document.querySelector(".timer-btn");

var currentActivity;

startActivityBtn.addEventListener('click', startActivity);
timerBtn.addEventListener('click', startTimer);
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
  if (!goal) {triggerAlert("goal");}
  else if (!min || !sec) {triggerAlert("time");}
  else if (min > 59 || sec > 59) {triggerAlert("tooLarge");}
  return true;
}

function createInstance(catValue, goal, min, sec) {
  currentActivity = new Activity(catValue, goal, parseInt(min), parseInt(sec));
  switchView();
}

function triggerAlert(alertNeeded) {
  if (alertNeeded === "goal") {document.querySelector('.need-goal').classList.toggle('hidden');}
  if (alertNeeded === "time") {document.querySelector('.need-duration').classList.toggle('hidden');}
  if (alertNeeded === "tooLarge") {document.querySelector('.limit-duration').classList.toggle('hidden');}
}

function switchView() {
  var goalForm = document.querySelector(".main-panel");
  var timerView = document.querySelector(".timer-view");
  goalForm.classList.toggle("hidden");
  timerView.classList.toggle("hidden");
  formatTime();
}

function displayInput(time) {
  document.querySelector(".goal-phrase").innerText = `${currentActivity.description}`;
  document.querySelector(".goal-duration").innerText = `${time}`;
}

function formatTime() {
  if (currentActivity.seconds < 10) {
    var seconds = `0${currentActivity.seconds}`;
  }
  if (currentActivity.minutes < 10) {
    var minutes = `0${currentActivity.minutes}`;
  }
  displayInput(`${minutes}:${seconds}`);
}
functi
