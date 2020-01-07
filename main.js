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
        this.target.style.display = "none";
        delete this;
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
    this.top = parseInt(window.getComputedStyle(field).height);
    this.bullet.style.left = String(this.left) + "px";
    this.bullet.style.top = String(this.top) + "px";

    this.interval_id = setInterval(() => {
      if (this.top >= -10) {
        this.top -= 4;
        this.bullet.style.top = String(this.top) + "px";
      } else {
        clearInterval(this.interval_id);
        delete this;
      }
      
    }, 10);
  }

  hidden() {
    this.bullet.style.display = "none";
  }
}

targets = [];
bullets = [];
var hit_count = 0;

setInterval(() => {
  targets.push(new Target());
}, 2000);

setInterval(() => {
  targets.forEach((target) => {
    if (target.left > window.parent.screen.width) {
      var index = targets.indexOf(target);
      targets.splice(index, 1);
    }
    var window_width = parseInt(window.getComputedStyle(field).width);
    var window_height = parseInt(window.getComputedStyle(field).height);
    bullets.forEach((bullet) => {
      if (bullet.top < -10) {
        var index = bullets.indexOf(bullet);
        bullets.splice(index, 1);
      }
      if (target.left >= window_width * 0.47 && target.left <= window_width * 0.53 && bullet.top + window_height * 0.02 > target.top && target.top + window_height * 0.02 >= bullet.top) {
        target.hidden();
        bullet.hidden();
        hit_count++;
        document.getElementById("hitsCount").innerText = String(hit_count) + "Hits!";
      }
    })
  });
}, 1);

document.addEventListener('keydown', (event) => {
  var keyName = event.key;
  if (keyName == "h" || keyName == "g") {
    bullets.push(new bullet());
  } else if(keyName == "f") {

  } else {

  }
});
