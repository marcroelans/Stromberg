/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var lFollowX = 0;\nvar lFollowY = 0;\nvar x = 0;\nvar y = 0;\nvar friction = 1 / 30;\nvar pupilOne = document.querySelector('.pupilone');\nvar pupilTwo = document.querySelector('.pupiltwo');\nvar pupil = document.querySelector('.pupil');\nvar eye = document.querySelector('.eye'); // for the onPageLoad check\n// holds till mousemove\n\nvar onPageLoad = true; // get width and height of the eye\n\nvar eyeWidth = eye.offsetWidth;\nvar eyeHeight = eye.offsetHeight; // get width and height of the pupil\n\nvar pupilWidth = pupil.offsetWidth;\nvar pupilHeight = pupil.offsetHeight;\nvar xMin = 0;\nvar xMax = eyeWidth - pupilWidth;\nvar yMin = 0;\nvar yMax = eyeHeight - pupilHeight; // centering the eye\n\nvar eyeCenterX = eyeWidth / 2 - pupilWidth / 2;\nvar eyeCenterY = eyeHeight / 2 - pupilHeight / 2;\n\nfunction moveEyes() {\n  x += (lFollowX - x) * friction;\n  y += (lFollowY - y) * friction; // because of eyes are aligned to 0 on the axis\n  // the min width and height is 0\n  // max width and height is eye width and height minus  pupil width and height\n  // so the pupil is every time in view\n\n  x = x <= xMin ? xMin : x;\n  x = x >= xMax ? xMax : x;\n  y = y <= yMin ? yMin : y;\n  y = y >= yMax ? yMax : y;\n\n  if (onPageLoad) {\n    // centering the eyes onPageLoad\n    x = eyeCenterX;\n    y = eyeCenterY;\n  }\n\n  var translate = 'translate(' + x + 'px, ' + y + 'px)';\n  pupilOne.style.WebkitTransform = translate;\n  pupilOne.style.MozTransform = translate;\n  pupilOne.style.Transform = translate;\n  pupilTwo.style.WebkitTransform = translate;\n  pupilTwo.style.MozTransform = translate;\n  pupilTwo.style.Transform = translate;\n  window.requestAnimationFrame(moveEyes);\n}\n\ndocument.body.addEventListener('mousemove', function (e) {\n  onPageLoad = false;\n  var lMouseX = Math.max(-100, Math.min(100, document.body.offsetWidth / 2 - e.clientX));\n  var lMouseY = Math.max(-100, Math.min(100, document.body.offsetHeight / 2 - e.clientY)); // minus pupil.offsetWidth and pupil.offsetHeight because of the axis is top=0 and left=0\n\n  lFollowX = (lMouseX / 2 - pupil.offsetWidth) * -1;\n  lFollowY = (lMouseY / 2 - pupil.offsetHeight) * -1;\n});\nmoveEyes();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });