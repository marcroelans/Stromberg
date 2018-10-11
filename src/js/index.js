let lFollowX = 0;
let lFollowY = 0;
let x = 0;
let y = 0;
let friction = 1 / 30;

let pupilOne = document.querySelector('.pupilone');
let pupilTwo = document.querySelector('.pupiltwo');
let pupil = document.querySelector('.pupil');
let eye = document.querySelector('.eye');

// for the onPageLoad check
// holds till mousemove
let onPageLoad = true;

// get width and height of the eye
let eyeWidth = eye.offsetWidth;
let eyeHeight = eye.offsetHeight;

// get width and height of the pupil
let pupilWidth = pupil.offsetWidth;
let pupilHeight = pupil.offsetHeight;

let xMin = 0;
let xMax = eyeWidth - pupilWidth;
let yMin = 0;
let yMax = eyeHeight - pupilHeight;

// centering the eye
let eyeCenterX = (eyeWidth / 2) - (pupilWidth / 2);
let eyeCenterY = (eyeHeight / 2) - (pupilHeight / 2);



function moveEyes() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  // because of eyes are aligned to 0 on the axis
  // the min width and height is 0
  // max width and height is eye width and height minus  pupil width and height
  // so the pupil is every time in view
  x = x <= xMin ? xMin : x;
  x = x >= xMax ? xMax : x;

  y = y <= yMin ? yMin : y;
  y = y >= yMax ? yMax : y;

  if (onPageLoad) {
    // centering the eyes onPageLoad
    x = eyeCenterX;
    y = eyeCenterY;
  }


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
  onPageLoad = false;
  let lMouseX = Math.max(-100, Math.min(100, document.body.offsetWidth / 2 - e.clientX));
  let lMouseY = Math.max(-100, Math.min(100, document.body.offsetHeight / 2 - e.clientY));
  // minus pupil.offsetWidth and pupil.offsetHeight because of the axis is top=0 and left=0
  lFollowX = ((lMouseX / 2) - pupil.offsetWidth) * -1;
  lFollowY = ((lMouseY / 2) - pupil.offsetHeight) * -1;
});

moveEyes();
