class Target {
  constructor() {
    this.left = 0;
    this.top = Math.random() * 300;
    this.speed = Math.random() * 1000;
    this.target = document.getElementById("field").appendChild(document.createElement('div'));
    this.target.classList.add('target');
    this.target.style.left = String(this.left) + "px";
    this.target.style.top = String(this.top) + "px";

    this.interval_id = setInterval(() => {
      let new_margin = parseInt(window.getComputedStyle(field).width) / this.speed + this.left;
      if (new_margin > window.parent.screen.width * 1.1) {
        clearInterval(this.interval_id);
        this.target.style.display = "none";
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

class Bullet {
  constructor(position) {
    this.bullet = document.getElementById("field").appendChild(document.createElement('div'));
    this.bullet.classList.add('bullet');
    this.left = position;
    this.top = parseInt(window.getComputedStyle(field).height) * 0.85;
    this.bullet.style.left = String(this.left) + "px";
    this.bullet.style.top = String(this.top) + "px";

    this.interval_id = setInterval(() => {
      if (this.top >= -10) {
        this.top -= 10;
        this.bullet.style.top = String(this.top) + "px";
      } else {
        clearInterval(this.interval_id);
      }
    }, 10);
  }
}

class Battery {
  constructor() {
    this.battery = document.getElementById("field").appendChild(document.createElement('div'));
    this.battery.classList.add('battery');
    this.left = parseInt(window.getComputedStyle(field).width) * 0.49;
    this.top = parseInt(window.getComputedStyle(field).height) * 0.9;
    this.battery.style.left = String(this.left) + "px";
    this.battery.style.top = String(this.top) + "px";
  }
}

targets = [];
bullets = [];
let timer = 30;
let bullet_counter = 100;
let target_interval = 1000;
const flame_rate = 10;
let position = parseInt(window.getComputedStyle(field).width) / 2;
let window_width = parseInt(window.getComputedStyle(field).width);
let window_height = parseInt(window.getComputedStyle(field).height);
battery = new Battery();

document.addEventListener('keydown', (event) => {
  if (event.key === "f" && position >= 100) {
    position -= 50;
    battery.left -= 50;
  }
  if (event.key === "j" && position <= parseInt(window.getComputedStyle(field).width) - 100) {
    position += 50;
    battery.left += 50;
  }
  if (event.key === " "　&& bullet_counter > 0) {
    bullets.push(new Bullet(position));
    bullet_counter--;
    document.getElementById("bullet_counter").innerText = String(bullet_counter) + "Bullets";
  }
  battery.battery.style.left = String(battery.left) + "px";
});

setInterval(() => {
  targets.push(new Target());
}, target_interval);

setInterval(() => {
  targets.forEach((target) => {
    if (target.left > window.parent.screen.width) {
      targets.splice(targets.indexOf(target), 1);
    }

    bullets.forEach((bullet) => {
      if (bullet.top < -10) {
        bullets.splice(bullets.indexOf(bullet), 1);
      }
      
      if (hitJudge(target, bullet)) {
        target.hidden();
      }
    })
  });
}, flame_rate);

setInterval(() => {
  timer--;
  if (timer === 0) {
    window.location.href = "end.html";
  }
  document.getElementById("timer").innerText = String(timer) + "秒";
}, 1000);

function hitJudge(target, bullet) {
  return target.left <= bullet.left && target.left + window_width * 0.03 >= bullet.left && bullet.top + window_height * 0.02 > target.top && target.top + window_height * 0.02 >= bullet.top;
}