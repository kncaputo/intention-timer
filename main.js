var studyButton = document.querySelector(".study-btn");
var meditateButton = document.querySelector(".meditate-btn");
var exerciseButton = document.querySelector(".exercise-btn");
var studyGraphic = document.querySelector("#study-graphic");
var activeStudy = document.querySelector("#active-study")
var meditateGraphic = document.querySelector("#meditate-graphic");
var activeMeditate = document.querySelector("#active-meditate");
var exerciseGraphic = document.querySelector("#exercise-graphic");
var activeExercise = document.querySelector("#active-exercise");
var startActivityBtn = document.querySelector('.start-activity-btn')
var inputBox = document.querySelector(".time-input");
var categoryBtn = document.querySelector('.category-btns');
var goal = document.querySelector('.goal');
var min = document.querySelector('.min');
var sec = document.querySelector('.sec');

var currentActivity = new Activity;

startActivityBtn.addEventListener('click', startActivity);

inputBox.addEventListener("keydown", function startActivity(event){
  var invalidChars = ["-", "+", "e"];
    if (invalidChars.includes(event.key)) {
    event.preventDefault();
  }
})

// categoryBtn.addEventListener('click', function selectActivity(event){
//   event.preventDefault();
// })
//
// categoryBtn.addEventListener('click', function(event) {
//     if (event.target.className === 'study-btn') {
//       this.category = "Study";
//       console.log(this.category)
//     }
//     if (event.target.className === 'meditate-btn') {
//       this.category = "Meditate";
//     }
//     if (event.target.className === 'exercise-btn') {
//       this.category = "Exercise";
//     }
// })

// TO-DO Potential refactoring

// function selectStudy() {
//   studyButton.classList.toggle("study-click");
//   studyGraphic.classList.toggle("hidden");
//   activeStudy.classList.toggle("hidden");
// }
//
// function selectMeditate() {
//   meditateButton.classList.toggle("meditate-click");
//   meditateGraphic.classList.toggle("hidden");
//   activeMeditate.classList.toggle("hidden");
// }
//
// function selectExercise() {
//   exerciseButton.classList.toggle("exercise-click");
//   exerciseGraphic.classList.toggle("hidden");
//   activeExercise.classList.toggle("hidden");
// }

function startActivity(){
  var catValue = document.querySelector('.category-btns').elements['user-choice'].value;

  if (isNaN(min.value) === true || isNaN(sec.value) === true){
    this.minutes = min.value
    this.seconds = sec.value
  } else if(goal.value !== undefined) {
    this.description = goal.value
    console.log(currentActivity)
  } else if(catValue !== undefined) {
    this.category = catValue;
    console.log(currentActivity)
  }
 }
