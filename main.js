var studyButton = document.querySelector(".study-btn");
var meditateButton = document.querySelector(".meditate-btn");
var exerciseButton = document.querySelector(".exercise-btn");
var studyGraphic = document.querySelector("#study-graphic");
var activeStudy = document.querySelector("#active-study")
var meditateGraphic = document.querySelector("#meditate-graphic");
var activeMeditate = document.querySelector("#active-meditate");
var exerciseGraphic = document.querySelector("#exercise-graphic");
var activeExercise = document.querySelector("#active-exercise");

studyButton.addEventListener('click', selectStudy);

meditateButton.addEventListener('click', selectMeditate);

exerciseButton.addEventListener('click', selectExercise);



// TO-DO Potential refactoring

function selectStudy() {
  studyButton.classList.toggle("study-click");
  studyGraphic.classList.toggle("hidden");
  activeStudy.classList.toggle("hidden");
}

function selectMeditate() {
  meditateButton.classList.toggle("meditate-click");
  meditateGraphic.classList.toggle("hidden");
  activeMeditate.classList.toggle("hidden");
}

function selectExercise() {
  exerciseButton.classList.toggle("exercise-click");
  exerciseGraphic.classList.toggle("hidden");
  activeExercise.classList.toggle("hidden");
}
