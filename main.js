class Target {

  constructor() {
    this.marginLeft = 0;
    this.marginTop = Math.random() * 100 + 10;
    this.target = document.getElementById("field").appendChild(document.createElement('div'));
    this.target.classList.add('target');
    this.target.style.marginLeft = String(this.marginLeft) + "px";
    this.target.style.marginTop = String(this.marginTop) + "px";
    this.speed = Math.random() * 2000;

    this.interval_id = setInterval(() => {
      var new_margin = parseInt(window.getComputedStyle(field).width) / this.speed + this.marginLeft;
      console.log("exsist");
      if (new_margin > window.parent.screen.width * 1.2) {
        clearInterval(this.interval_id);
      } else {
        this.marginLeft = new_margin;
        this.target.style.marginLeft = String(this.marginLeft) + "px";
      }
    }, 10);
  }
}

target = new Target();
