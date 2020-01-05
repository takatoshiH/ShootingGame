class Target {

  constructor() {
    this.marginLeft = 0;
    this.marginTop = Math.random() * 10;
    this.speed = Math.random() * 2000;
    this.target = document.getElementById("field").appendChild(document.createElement('div'));
    this.target.classList.add('target');
    this.target.style.marginLeft = String(this.marginLeft) + "px";
    this.target.style.marginTop = String(this.marginTop) + "px";

    this.interval_id = setInterval(() => {
      var new_margin = parseInt(window.getComputedStyle(field).width) / this.speed + this.marginLeft;
      if (new_margin > window.parent.screen.width * 1.1) {
        clearInterval(this.interval_id);
      } else {
        this.marginLeft = new_margin;
        this.target.style.marginLeft = String(this.marginLeft) + "px";
      }
    }, 10);
  }

  hidden() {
    this.target.style.display = "none"; 
  }
}

target = new Target();
cnt = 0;
id = setInterval(() => {
  cnt++;
  if (cnt == 10) {
    clearInterval(id);
    target.hidden();
  }
}, 100);
