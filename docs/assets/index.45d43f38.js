/*!
 * glsass
 * @author: Johann Pinson
 * @date: 2021
 * @copyright: All rights reserved, 2021 Johann Pinson
 * v0.0.6
 */
!function e(t,n,r){function o(c,d){if(!n[c]){if(!t[c]){var i="function"==typeof require&&require;if(!d&&i)return i(c,!0);if(u)return u(c,!0);var a=new Error("Cannot find module '"+c+"'");throw a.code="MODULE_NOT_FOUND",a}var s=n[c]={exports:{}};t[c][0].call(s.exports,(function(e){return o(t[c][1][e]||e)}),s,s.exports,e,t,n,r)}return n[c].exports}for(var u="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default=function(){Array.prototype.forEach.call(document.querySelectorAll('[class*="js-debug-"]'),(function(e){var t=Array.prototype.find.call(e.classList,(function(e){return e.includes("js-debug")})),n=t.split("-")[t.split("-").length-1];e.addEventListener("click",(function(){document.body.className.includes("debug:".concat(n))?document.body.classList.remove("debug:".concat(n)):document.body.classList.add("debug:".concat(n))}))}))}},{}],2:[function(e,t,n){"use strict";var r,o=(r=e("./debug"))&&r.__esModule?r:{default:r};document.addEventListener("DOMContentLoaded",(function(){(0,o.default)()}))},{"./debug":1}]},{},[2]);