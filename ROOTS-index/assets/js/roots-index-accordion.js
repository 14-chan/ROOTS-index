/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ (function() {

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n  console.log(\"アコーディオンスクリプトが実行されました\");\n  if (typeof tocData === \"undefined\") {\n    console.warn(\"tocData が未定義のため、スクリプトを終了します\");\n    return;\n  }\n  var tocAccordion = document.querySelector(\".roots-index-toc-accordion\");\n  if (!tocAccordion) return;\n  var tocList = tocAccordion.nextElementSibling;\n  if (tocData.accordionOpen) {\n    // trueの場合、アコーディオンを開いた状態に\n    tocAccordion.classList.add(\"active\");\n    tocList.style.maxHeight = tocList.scrollHeight + \"px\";\n  }\n  tocAccordion.addEventListener(\"click\", function () {\n    tocAccordion.classList.toggle(\"active\");\n    tocList.style.maxHeight = tocList.style.maxHeight ? null : \"\".concat(tocList.scrollHeight, \"px\");\n  });\n});\n\n//# sourceURL=webpack://roots-index/./src/js/modules/accordion.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/modules/accordion.js"]();
/******/ 	
/******/ })()
;