/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_toc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/toc */ \"./src/js/modules/toc.js\");\n/* harmony import */ var _modules_toc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_toc__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/accordion */ \"./src/js/modules/accordion.js\");\n/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_accordion__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n\n/* ///////////////////////\ninit\n/////////////////////// */\n_modules_toc__WEBPACK_IMPORTED_MODULE_0___default()();\n_modules_accordion__WEBPACK_IMPORTED_MODULE_1___default()();\n\n//# sourceURL=webpack://roots-index/./src/js/index.js?");

/***/ }),

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ (function() {

eval("\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  console.log(\"アコーディオンスクリプトが実行されました\");\n  var tocAccordion = document.querySelector(\".toc-accordion\");\n  if (!tocAccordion) return;\n  var tocList = tocAccordion.nextElementSibling;\n  if (tocData.accordionOpen) {\n    // trueの場合開いた状態に\n    tocAccordion.classList.add(\"active\");\n    tocList.style.maxHeight = tocList.scrollHeight + \"px\";\n  }\n  tocAccordion.addEventListener(\"click\", function () {\n    tocAccordion.classList.toggle(\"active\");\n    tocList.style.maxHeight = tocList.style.maxHeight ? null : \"\".concat(tocList.scrollHeight, \"px\");\n  });\n});\n\n//# sourceURL=webpack://roots-index/./src/js/modules/accordion.js?");

/***/ }),

/***/ "./src/js/modules/toc.js":
/*!*******************************!*\
  !*** ./src/js/modules/toc.js ***!
  \*******************************/
/***/ (function() {

eval("\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  console.log(\"目次スクリプトが実行されました\");\n  var tocArea = document.querySelector(\"#roots-index-toc\");\n  if (!tocArea) {\n    console.warn(\"目次の挿入場所が見つからないため処理を中断\");\n    return;\n  }\n  var headings = tocData.headings;\n  if (headings.length === 0) {\n    console.warn(\"見出しが見つからないため目次を生成しません\");\n    return;\n  }\n  var tocList = document.createElement(\"ul\");\n  tocList.classList.add(\"toc-list\");\n  headings.forEach(function (heading, i) {\n    var id = \"toc-\".concat(i + 1);\n    var item = document.createElement(\"li\");\n    item.innerHTML = \"<a href=\\\"#\".concat(id, \"\\\">\").concat(heading.text, \"</a>\");\n    tocList.appendChild(item);\n\n    // 見出しにIDを付与\n    var targetHeading = document.querySelector(\"h\".concat(heading.level));\n    if (targetHeading) targetHeading.id = id;\n  });\n  var tocBox = document.createElement(\"div\");\n  tocBox.classList.add(\"toc-box\");\n  tocBox.innerHTML = \"<div class='toc-accordion'>\".concat(tocData.label, \"<div class='toc-btn'><span></span></div></div>\");\n  tocBox.appendChild(tocList);\n  var tocNav = document.createElement(\"nav\");\n  tocNav.classList.add(\"toc-nav\");\n  tocNav.id = \"tocnav\";\n  tocNav.appendChild(tocBox);\n  tocArea.appendChild(tocNav);\n  console.log(\"目次の挿入完了\");\n\n  // スムーズスクロール機能を追加\n  document.querySelectorAll(\".toc-list a\").forEach(function (link) {\n    link.addEventListener(\"click\", function (e) {\n      e.preventDefault();\n      var targetId = link.getAttribute(\"href\").substring(1);\n      var target = document.getElementById(targetId);\n      if (target) {\n        window.scrollTo({\n          top: target.offsetTop - 50,\n          // 上部に50pxのマージン\n          behavior: \"smooth\"\n        });\n      }\n    });\n  });\n  console.log(\"目次スクリプトの適用が完了しました\");\n});\n\n//# sourceURL=webpack://roots-index/./src/js/modules/toc.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;