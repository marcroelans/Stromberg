let lFollowX = 0;
let lFollowY = 0;
let x = 0;
let y = 0;
let friction = 1 / 30;

let pupilOne = document.querySelector('.pupilone');
let pupilTwo = document.querySelector('.pupiltwo');

function moveEyes() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  x = x <= -18 ? -18 : x;
  x = x >= 9 ? 9 : x;

  y = y <= -9 ? -9 : y;
  y = y >= 2 ? 2 : y;


  var translate = 'translate(' + x + 'px, ' + y + 'px)';

  pupilOne.style.WebkitTransform = translate;
  pupilOne.style.MozTransform = translate;
  pupilOne.style.Transform = translate;

  pupilTwo.style.WebkitTransform = translate;
  pupilTwo.style.MozTransform = translate;
  pupilTwo.style.Transform = translate;

  window.requestAnimationFrame(moveEyes);
}

document.body.addEventListener('mousemove', function (e) {
  let lMouseX = Math.max(-100, Math.min(100, document.body.offsetWidth / 2 - e.clientX));
  let lMouseY = Math.max(-100, Math.min(100, document.body.offsetHeight / 2 - e.clientY));
  lFollowX = (30 * lMouseX / 100)*-1;
  lFollowY = (20 * lMouseY / 100)*-1;
});

moveEyes();
