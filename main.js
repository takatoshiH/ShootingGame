var field = document.getElementById("field");
createTarget();
console.log(window.parent.screen.width);

function createTarget() {
  var target = document.createElement('div');
  field.appendChild(target);
  target.id = "target";
  target.style.marginLeft = "0px";
  target.style.marginTop = "10px";
  console.log("できた?");
}

target = document.getElementById("target");
interval_id = setInterval(() => {
  var new_margin = parseInt(target.style.marginLeft.split("px")[0]) + parseInt(window.getComputedStyle(field).width) / 1000;
  if (new_margin >= window.parent.screen.width) {
    target.parentNode.removeChild(target);
    clearInterval(interval_id);
  } else {
    target.style.marginLeft = String(new_margin) + "px";
  }

  console.log(new_margin);
  
}, 10);