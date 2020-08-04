/*!
 * glsass
 * @author: Johann Pinson
 * @date: 2020
 * @copyright: All rights reserved, 2020 Johann Pinson
 * v0.0.2
 */
!function e(t,r,n){function u(d,i){if(!r[d]){if(!t[d]){var c="function"==typeof require&&require;if(!i&&c)return c(d,!0);if(o)return o(d,!0);var s=new Error("Cannot find module '"+d+"'");throw s.code="MODULE_NOT_FOUND",s}var a=r[d]={exports:{}};t[d][0].call(a.exports,(function(e){return u(t[d][1][e]||e)}),a,a.exports,e,t,r,n)}return r[d].exports}for(var o="function"==typeof require&&require,d=0;d<n.length;d++)u(n[d]);return u}({1:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;r.default=function(){if(document.querySelector(".js-debug")){var e=document.querySelector(".js-debug");null==e||e.addEventListener("click",(function(){e.className.includes("c-button--primary")?(e.classList.remove("c-button--primary"),e.classList.add("c-button--danger"),document.body.classList.add("debug:baseline")):(e.classList.add("c-button--primary"),e.classList.remove("c-button--danger"),document.body.classList.remove("debug:baseline"))}))}}},{}],2:[function(e,t,r){"use strict";var n,u=(n=e("./debug"))&&n.__esModule?n:{default:n};document.addEventListener("DOMContentLoaded",(function(){(0,u.default)()}))},{"./debug":1}]},{},[2]);