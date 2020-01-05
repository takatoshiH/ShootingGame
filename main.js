class Target {

  constructor() {
    this.left = 0;
    this.top = Math.random() * 300;
    this.speed = Math.random() * 2000;
    this.target = document.getElementById("field").appendChild(document.createElement('div'));
    this.target.classList.add('target');
    this.target.style.left = String(this.left) + "px";
    this.target.style.top = String(this.top) + "px";

    this.interval_id = setInterval(() => {
      var new_margin = parseInt(window.getComputedStyle(field).width) / this.speed + this.left;
      if (new_margin > window.parent.screen.width * 1.1) {
        clearInterval(this.interval_id);
      } else {
        this.left = new_margin;
        this.target.style.left = String(this.left) + "px";
      }
    }, 10);
  }

  hidden() {
    this.target.style.display = "none";
  }
}

class bullet {
  constructor() {
    this.bullet = document.getElementById("field").appendChild(document.createElement('div'));
    this.bullet.classList.add('bullet');
    this.left = parseInt(window.getComputedStyle(field).width)/2;
    this.top = parseInt(window.getComputedStyle(field).height) * 0.95;
    this.bullet.style.left = String(this.left) + "px";
    this.bullet.style.top = String(this.top) + "px";

    this.interval_id = setInterval(() => {
      this.top -= 1;
      this.bullet.style.top = String(this.top) + "px";
    }, 10);
  }
}

target = new Target();
target = new Target();
target = new Target();
target = new Target();
bullet = new bullet();


