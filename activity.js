class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.id = Date.now();
    this.completed = false;
  }

  startTimer() {
    var currentSeconds = (this.minutes * 60) + this.seconds;
    return currentSeconds;
  }

  markComplete() {
    alert("TIMER COMPLETE");
  }

  saveToStorage() {

  }
}
