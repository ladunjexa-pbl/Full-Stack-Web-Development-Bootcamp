let c_drumButtons = document.querySelectorAll(`.drum`).length;

for (let i = 0; i < c_drumButtons; i++) {
  document.querySelectorAll(`button`)[i].addEventListener(`click`, function () {
    playSound(this.innerHTML);
    animateButton(this.innerHTML);
  });
}

document.addEventListener("keypress", function(event) {
    playSound(event.key);
    animateButton(event.key);
})

function playSound(key) {
  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom1 = new Audio("sounds/tom-2.mp3");
      tom1.play();
      break;

    case "s":
      var tom1 = new Audio("sounds/tom-3.mp3");
      tom1.play();
      break;

    case "d":
      var tom1 = new Audio("sounds/tom-4.mp3");
      tom1.play();
      break;

    case "j":
      var tom1 = new Audio("sounds/snare.mp3");
      tom1.play();
      break;

    case "k":
      var tom1 = new Audio("sounds/crash.mp3");
      tom1.play();
      break;

    case "l":
      var tom1 = new Audio("sounds/kick-bass.mp3");
      tom1.play();
      break;

    default: console.log(key);
  }
}

function animateButton(key) {
    var activeButton = document.querySelector("." + key);
    activeButton.classList.add("pressed");
    setTimeout(function() {
      activeButton.classList.remove("pressed");
    }, 100)
}
// var audio = new Audio("sounds/tom-1.mp3");
// audio.play();
