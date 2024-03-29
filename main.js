class Target {
    constructor() {
        this.left = 0;
        this.top = Math.random() * 300;
        this.speed = Math.random() * 1000;
        let target = document.createElement('div');
        let ufo = document.createElement('img');
        ufo.classList.add('ufo');
        ufo.setAttribute('src', 'alien_ufo.png');
        target.appendChild(ufo);
        this.target = document.getElementById("field").appendChild(target);
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
        this.target.firstElementChild.setAttribute('src', 'bakuhatsu1.png');
        const hidden = () => {
            this.target.style.display = "none";
        }
        setTimeout(hidden, 50);

    }
}

class Bullet {
    constructor(position) {
        let bullet = document.createElement('div');
        let bulletImage = document.createElement('img');
        bulletImage.classList.add('bullet');
        bulletImage.setAttribute('src', 'bullet.png');
        bullet.appendChild(bulletImage);
        this.bullet = document.getElementById("field").appendChild(bullet);
        this.bullet.classList.add('bullet');
        this.left = position;
        this.top = parseInt(window.getComputedStyle(field).height) * 0.85;
        this.bullet.style.left = String(this.left) + "px";
        this.bullet.style.top = String(this.top) + "px";

        this.interval_id = setInterval(() => {
            if (this.top >= -15) {
                this.top -= 10;
                this.bullet.style.top = String(this.top) + "px";
            } else {
                clearInterval(this.interval_id);
            }
        }, 10);
    }
    hidden() {
        this.bullet.parentNode.removeChild(this.bullet);
    }
}

class Battery {
    constructor() {
        let battery = document.createElement('div');
        let ship = document.createElement('img');
        ship.classList.add('ship');
        ship.setAttribute('src', 'senkan.png');
        battery.appendChild(ship);
        this.battery = document.getElementById("field").appendChild(battery);
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
let bullet_counter = 300;
let target_interval = 1000;
const flame_rate = 5;
let position = parseInt(window.getComputedStyle(field).width) / 2;
let window_width = parseInt(window.getComputedStyle(field).width);
let window_height = parseInt(window.getComputedStyle(field).height);

// 発射台の設置
battery = new Battery();

// 弾丸の発射
document.addEventListener('keydown', (event) => {
    // 左右移動
    if (event.key === "f" && position >= 100) {
        position -= 50;
        battery.left -= 50;
    }

    // 左右移動
    if (event.key === "j" && position <= parseInt(window.getComputedStyle(field).width) - 100) {
        position += 50;
        battery.left += 50;
    }

    // 発射
    if (event.key === " " && bullet_counter > 0) {
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
        if (target.left > window.parent.screen.width) targets.splice(targets.indexOf(target), 1);

        bullets.forEach((bullet) => {
            if (bullet.top < -30)  {
                bullets.splice(bullets.indexOf(bullet), 1);
                bullet.hidden();
            }
            if (hitJudge(target, bullet)) {
                target.hidden();
                bullet.hidden();
            }
        });
    });
}, flame_rate);

setInterval(() => {
    timer--;
    if (timer === 0) window.location.href = "end.html";
    document.getElementById("timer").innerText = String(timer) + "秒";
}, 1000);

function hitJudge(target, bullet) {
    return target.left <= bullet.left
        && target.left + window_width * 0.03 >= bullet.left
        && bullet.top + window_height * 0.02 > target.top
        && target.top + window_height * 0.02 >= bullet.top;
}
