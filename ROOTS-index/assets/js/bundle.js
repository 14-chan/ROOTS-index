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

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_toc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/toc */ \"./src/js/modules/toc.js\");\n/* harmony import */ var _modules_toc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_toc__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/accordion */ \"./src/js/modules/accordion.js\");\n/* harmony import */ var _modules_accordion__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_accordion__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n\n\n/* ///////////////////////\ninit\n/////////////////////// */\n_modules_toc__WEBPACK_IMPORTED_MODULE_0___default()();\n_modules_accordion__WEBPACK_IMPORTED_MODULE_1___default()();\n\n//# sourceURL=webpack://roots-index/./src/js/index.js?");

/***/ }),

/***/ "./src/js/modules/accordion.js":
/*!*************************************!*\
  !*** ./src/js/modules/accordion.js ***!
  \*************************************/
/***/ (function() {

eval("document.addEventListener(\"DOMContentLoaded\", function () {\n  console.log(\"アコーディオンスクリプトが実行されました\");\n  if (typeof tocData === \"undefined\") {\n    console.warn(\"tocData が未定義のため、スクリプトを終了します\");\n    return;\n  }\n  var tocAccordion = document.querySelector(\".roots-index-toc-accordion\");\n  if (!tocAccordion) return;\n  var tocList = tocAccordion.nextElementSibling;\n  if (tocData.accordionOpen) {\n    // trueの場合、アコーディオンを開いた状態に\n    tocAccordion.classList.add(\"active\");\n    tocList.style.maxHeight = tocList.scrollHeight + \"px\";\n  }\n  tocAccordion.addEventListener(\"click\", function () {\n    tocAccordion.classList.toggle(\"active\");\n    tocList.style.maxHeight = tocList.style.maxHeight ? null : \"\".concat(tocList.scrollHeight, \"px\");\n  });\n});\n\n//# sourceURL=webpack://roots-index/./src/js/modules/accordion.js?");

/***/ }),

/***/ "./src/js/modules/toc.js":
/*!*******************************!*\
  !*** ./src/js/modules/toc.js ***!
  \*******************************/
/***/ (function() {

"use strict";
eval("/**\n * @package ROOTS-index\n * @license GPL-2.0-or-later\n */\n\n\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== \"undefined\" && o[Symbol.iterator] || o[\"@@iterator\"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  console.log(\"目次スクリプトが実行されました\");\n  if (typeof tocData === \"undefined\") {\n    console.warn(\"tocData が未定義のため、スクリプトを終了します\");\n    return;\n  }\n  var tocArea = document.querySelector(\"#roots-index-toc\");\n  if (!tocArea) {\n    console.warn(\"目次の挿入場所が見つからないため処理を中断\");\n    return;\n  }\n  var headings = tocData.headings;\n\n  // ここで中身を確認\n  console.log(\"取得したheadingsの内容:\", headings);\n  if (headings.length === 0) {\n    console.warn(\"見出しが見つからないため目次を生成しません\");\n    return;\n  }\n  var tocList = document.createElement(\"ul\");\n  tocList.classList.add(\"roots-index-toc-list\");\n\n  // 最小見出しレベル（例: h2 〜 h4 → 2）\n  var minLevel = Math.min.apply(Math, _toConsumableArray(headings.map(function (h) {\n    return h.level;\n  })));\n  var counters = [];\n  var idCounter = 1;\n  headings.forEach(function (heading) {\n    var level = heading.level;\n    var levelIndex = level - minLevel;\n\n    // 番号生成のためのカウンター制御\n    counters[levelIndex] = (counters[levelIndex] || 0) + 1;\n    counters.length = levelIndex + 1; // 上位階層より下はリセット\n\n    var numberLabel = counters.join(\".\");\n    var id = \"toc-\".concat(idCounter++);\n    var item = document.createElement(\"li\");\n    item.classList.add(\"toc-depth-\".concat(levelIndex));\n    var link = document.createElement(\"a\");\n    link.href = \"#\".concat(id);\n    link.textContent = \"\".concat(numberLabel, \" \").concat(heading.text);\n\n    // 対象見出しにIDを設定\n    var candidates = document.querySelectorAll(\"h\".concat(heading.level, \".wp-block-heading\"));\n    var matched = false;\n    var _iterator = _createForOfIteratorHelper(candidates),\n      _step;\n    try {\n      for (_iterator.s(); !(_step = _iterator.n()).done;) {\n        var el = _step.value;\n        if (!el.id && el.textContent.trim() === heading.text.trim()) {\n          el.id = id;\n          matched = true;\n          break;\n        }\n      }\n    } catch (err) {\n      _iterator.e(err);\n    } finally {\n      _iterator.f();\n    }\n    if (!matched && candidates.length > 0) {\n      candidates[0].id = id; // fallback\n    }\n    item.appendChild(link);\n    tocList.appendChild(item);\n  });\n  var tocBox = document.createElement(\"div\");\n  tocBox.classList.add(\"roots-index-toc-box\");\n  tocBox.innerHTML = \"<div class='roots-index-toc-accordion'>\".concat(tocData.label, \"<div class='roots-index-toc-btn'><span></span></div></div>\");\n  tocBox.appendChild(tocList);\n  var tocNav = document.createElement(\"nav\");\n  tocNav.classList.add(\"roots-index-toc-nav\");\n  tocNav.id = \"tocnav\";\n  tocNav.appendChild(tocBox);\n  tocArea.appendChild(tocNav);\n  console.log(\"目次の挿入完了\");\n\n  // スムーズスクロール機能\n  document.querySelectorAll(\".roots-index-toc-list a\").forEach(function (link) {\n    link.addEventListener(\"click\", function (e) {\n      e.preventDefault();\n      var targetId = link.getAttribute(\"href\").substring(1);\n      var target = document.getElementById(targetId);\n      if (target) {\n        window.scrollTo({\n          top: target.offsetTop - 50,\n          behavior: \"smooth\"\n        });\n      }\n    });\n  });\n  console.log(\"目次スクリプトの適用が完了しました\");\n});\n\n//# sourceURL=webpack://roots-index/./src/js/modules/toc.js?");

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