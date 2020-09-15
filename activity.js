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
    formatTime();
    var currentSeconds = (this.minutes * 60) + this.seconds;
    var interval = setInterval(function () {
      currentSeconds--;
      formatRemainingTime(currentSeconds);
      if (!currentSeconds) {
        clearInterval(interval);
        alert("TIMER COMPLETE");
        markComplete();
      }
    }, 1000);
  }

  markComplete() {

  }

  saveToStorage() {

  }
}
