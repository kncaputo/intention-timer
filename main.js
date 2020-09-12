var studyButton = document.querySelector(".study-btn");
var meditateButton = document.querySelector(".meditate-btn");
var exerciseButton = document.querySelector(".exercise-btn");
var startActivityBtn = document.querySelector('.start-activity-btn')
var inputBox = document.querySelector(".time-input");
var categoryBtns = document.querySelector('.category-btns');
// var goal = document.querySelector('.goal');
// var min = document.querySelector('.min');
// var sec = document.querySelector('.sec');

var currentActivity;

startActivityBtn.addEventListener('click', startActivity);

inputBox.addEventListener("keydown", function startActivity(event){
  var invalidChars = ["-", "+", "e"];
    if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
})

categoryBtns.addEventListener('click', function(event) {
  if (event.target.className === 'study') {activateBtn('study');}
  if (event.target.className === 'meditate') {activateBtn('meditate');}
  if (event.target.className === 'exercise') {activateBtn('exercise');}
})

function activateBtn(category) {
  removeActiveBtnState(category);
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
  var catValue = document.querySelector('.category-btns').elements['user-choice'].value;
  var goal = document.querySelector('#goal').value;
  var min = document.querySelector('#min').value;
  var sec = document.querySelector('#sec').value;

  if (goal === "") {triggerGoalAlert("goal")};
  if (min === "") {triggerTimeAlert("time")};
  // if (sec === "") {triggerTimeAlert("time")};

  currentActivity = new Activity (catValue, goal, min, sec);
}

function triggerGoalAlert(alertNeeded) {
  if (alertNeeded === "goal") {document.querySelector('.need-goal').classList.toggle('hidden');}
}
function triggerTimeAlert(timeAlert) {
  if (triggerTimeAlert === "time") {document.querySelector('#need-duration').classList.toggle('hidden');}
}
