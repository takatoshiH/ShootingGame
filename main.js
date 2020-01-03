field = document.getElementById("field");
console.log(window.getComputedStyle(field).width);

function createTarget() {
  var target = document.createElement('div');
  target.id = "target";
  field.appendChild(target);
  console.log("できた?");
}

createTarget();

// target = document.getElementById("target");
// setInterval(() => {
//   target.style.marginLeft = "20%";
// }, 1000);