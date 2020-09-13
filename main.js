var startActivityBtn = document.querySelector('.start-activity-btn')
var inputBox = document.querySelector(".time-input");
var categoryBtns = document.querySelector('.category-btns');

var currentActivity;

startActivityBtn.addEventListener('click', startActivity);

inputBox.addEventListener("keydown", function startActivity(event){
  var invalidChars = ["-", "+", "e"];
    if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
})

categoryBtns.addEventListener('click', function(event) {
  if (event.target.id.includes('study')) {activateBtn('study');}
  if (event.target.id.includes('meditate')) {activateBtn('meditate');}
  if (event.target.id.includes('exercise')) {activateBtn('exercise');}
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
  var catValue = document.querySelector('.category-btns').elements['user-choice'].value;
  var goal = document.querySelector('#goal').value;
  var min = document.querySelector('#min').value;
  var sec = document.querySelector('#sec').value;
  alert(goal, min, sec);
  currentActivity = new Activity (catValue, goal, min, sec);
}

function alert(goal, min, sec){
  
  if (goal === "") {triggerAlert("goal")};
  if (min === "") {triggerAlert("time")};
  if (sec === "") {triggerAlert("time")};
}


function triggerAlert(alertNeeded) {
  if (alertNeeded === "goal") {document.querySelector('.need-goal').classList.toggle('hidden');}
  // The code below is not working and I don't know why
  //
  // if (alertNeeded === "time") {document.querySelector('.need-duration').classList.toggle('hidden');}
}
