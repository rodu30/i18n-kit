(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("i18n-kit", [], factory);
	else if(typeof exports === 'object')
		exports["i18n-kit"] = factory();
	else
		root["i18n-kit"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/**\n * Formats a given number\n * @param {string} locale \n * @param {number} number \n * @param {object} options  see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat\n                            localeMatcher\n                            The locale matching algorithm to use. Possible values are \"lookup\" and \"best fit\"; the default is \"best fit\". For information about this option, see the Intl page.\n                            style\n                            The formatting style to use. Possible values are \"decimal\" for plain number formatting, \"currency\" for currency formatting, and \"percent\" for percent formatting; the default is \"decimal\".\n                            currency\n                            The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as \"USD\" for the US dollar, \"EUR\" for the euro, or \"CNY\" for the Chinese RMB — see the Current currency & funds code list. There is no default value; if the style is \"currency\", the currency property must be provided.\n                            currencyDisplay\n                            How to display the currency in currency formatting. Possible values are \"symbol\" to use a localized currency symbol such as €, \"code\" to use the ISO currency code, \"name\" to use a localized currency name such as \"dollar\"; the default is \"symbol\".\n                            useGrouping\n                            Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. Possible values are true and false; the default is true.\n                            The following properties fall into two groups: minimumIntegerDigits, minimumFractionDigits, and maximumFractionDigits in one group, minimumSignificantDigits and maximumSignificantDigits in the other. If at least one property from the second group is defined, then the first group is ignored.\n                            minimumIntegerDigits\n                            The minimum number of integer digits to use. Possible values are from 1 to 21; the default is 1.\n                            minimumFractionDigits\n                            The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).\n                            maximumFractionDigits\n                            The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information); the default for percent formatting is the larger of minimumFractionDigits and 0.\n                            minimumSignificantDigits\n                            The minimum number of significant digits to use. Possible values are from 1 to 21; the default is 1.\n                            maximumSignificantDigits\n                            The maximum number of significant digits to use. Possible values are from 1 to 21; the default is minimumSignificantDigits.\n * @returns {string}\n */\nconst formatNumber = (locale, number, options = undefined) => new Intl.NumberFormat(locale, options).format(number);\n/* harmony export (immutable) */ __webpack_exports__[\"formatNumber\"] = formatNumber;\n\n\n/**\n * Formats a given date object\n * @param {string} locale\n * @param {object} date javaScript Date object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date\n * @param {*} options see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat\n                      localeMatcher\n                      The locale matching algorithm to use. Possible values are \"lookup\" and \"best fit\"; the default is \"best fit\". For information about this option, see the Intl page.\n                      timeZone\n                      The time zone to use. The only value implementations must recognize is \"UTC\"; the default is the runtime's default time zone. Implementations may also recognize the time zone names of the IANA time zone database, such as \"Asia/Shanghai\", \"Asia/Kolkata\", \"America/New_York\".\n                      hour12\n                      Whether to use 12-hour time (as opposed to 24-hour time). Possible values are true and false; the default is locale dependent. This option overrides the hc language tag and/or the hourCycle option in case both are present.\n                      hourCycle\n                      The hour cycle to use. Possible values are \"h11\", \"h12\", \"h23\", or \"h24\". This option overrides the hc language tag, if both are present, and the hour12 option takes precedence in case both options have been specified.\n                      formatMatcher\n                      The format matching algorithm to use. Possible values are \"basic\" and \"best fit\"; the default is \"best fit\". See the following paragraphs for information about the use of this property.\n                      The following properties describe the date-time components to use in formatted output, and their desired representations. Implementations are required to support at least the following subsets:\n\n                      weekday, year, month, day, hour, minute, second\n                      weekday, year, month, day\n                      year, month, day\n                      year, month\n                      month, day\n                      hour, minute, second\n                      hour, minute\n                      Implementations may support other subsets, and requests will be negotiated against all available subset-representation combinations to find the best match. Two algorithms are available for this negotiation and selected by the formatMatcher property: A fully specified \"basic\" algorithm and an implementation dependent \"best fit\" algorithm.\n\n                      weekday\n                      The representation of the weekday. Possible values are \"narrow\", \"short\", \"long\".\n                      era\n                      The representation of the era. Possible values are \"narrow\", \"short\", \"long\".\n                      year\n                      The representation of the year. Possible values are \"numeric\", \"2-digit\".\n                      month\n                      The representation of the month. Possible values are \"numeric\", \"2-digit\", \"narrow\", \"short\", \"long\".\n                      day\n                      The representation of the day. Possible values are \"numeric\", \"2-digit\".\n                      hour\n                      The representation of the hour. Possible values are \"numeric\", \"2-digit\".\n                      minute\n                      The representation of the minute. Possible values are \"numeric\", \"2-digit\".\n                      second\n                      The representation of the second. Possible values are \"numeric\", \"2-digit\".\n                      timeZoneName\n                      The representation of the time zone name. Possible values are \"short\", \"long\".\n                      The default value for each date-time component property is undefined, but if all component properties are undefined, then year, month, and day are assumed to be \"numeric\".\n */\nconst formatDateTime = (locale, date, options = undefined) => new Intl.DateTimeFormat(locale, options).format(date);\n/* harmony export (immutable) */ __webpack_exports__[\"formatDateTime\"] = formatDateTime;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJmb3JtYXROdW1iZXIiLCJsb2NhbGUiLCJudW1iZXIiLCJvcHRpb25zIiwidW5kZWZpbmVkIiwiSW50bCIsIk51bWJlckZvcm1hdCIsImZvcm1hdCIsImZvcm1hdERhdGVUaW1lIiwiZGF0ZSIsIkRhdGVUaW1lRm9ybWF0Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJPLE1BQU1BLGVBQWUsQ0FBQ0MsTUFBRCxFQUFTQyxNQUFULEVBQWlCQyxVQUFVQyxTQUEzQixLQUMxQixJQUFJQyxLQUFLQyxZQUFULENBQXNCTCxNQUF0QixFQUE4QkUsT0FBOUIsRUFBdUNJLE1BQXZDLENBQThDTCxNQUE5QyxDQURLO0FBQUE7QUFBQTs7QUFHUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThDTyxNQUFNTSxpQkFBaUIsQ0FBQ1AsTUFBRCxFQUFTUSxJQUFULEVBQWVOLFVBQVVDLFNBQXpCLEtBQzVCLElBQUlDLEtBQUtLLGNBQVQsQ0FBd0JULE1BQXhCLEVBQWdDRSxPQUFoQyxFQUF5Q0ksTUFBekMsQ0FBZ0RFLElBQWhELENBREssQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGb3JtYXRzIGEgZ2l2ZW4gbnVtYmVyXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYWxlIFxuICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciBcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zICBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvTnVtYmVyRm9ybWF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxlTWF0Y2hlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBsb2NhbGUgbWF0Y2hpbmcgYWxnb3JpdGhtIHRvIHVzZS4gUG9zc2libGUgdmFsdWVzIGFyZSBcImxvb2t1cFwiIGFuZCBcImJlc3QgZml0XCI7IHRoZSBkZWZhdWx0IGlzIFwiYmVzdCBmaXRcIi4gRm9yIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb3B0aW9uLCBzZWUgdGhlIEludGwgcGFnZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBmb3JtYXR0aW5nIHN0eWxlIHRvIHVzZS4gUG9zc2libGUgdmFsdWVzIGFyZSBcImRlY2ltYWxcIiBmb3IgcGxhaW4gbnVtYmVyIGZvcm1hdHRpbmcsIFwiY3VycmVuY3lcIiBmb3IgY3VycmVuY3kgZm9ybWF0dGluZywgYW5kIFwicGVyY2VudFwiIGZvciBwZXJjZW50IGZvcm1hdHRpbmc7IHRoZSBkZWZhdWx0IGlzIFwiZGVjaW1hbFwiLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGN1cnJlbmN5IHRvIHVzZSBpbiBjdXJyZW5jeSBmb3JtYXR0aW5nLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIHRoZSBJU08gNDIxNyBjdXJyZW5jeSBjb2Rlcywgc3VjaCBhcyBcIlVTRFwiIGZvciB0aGUgVVMgZG9sbGFyLCBcIkVVUlwiIGZvciB0aGUgZXVybywgb3IgXCJDTllcIiBmb3IgdGhlIENoaW5lc2UgUk1CIOKAlCBzZWUgdGhlIEN1cnJlbnQgY3VycmVuY3kgJiBmdW5kcyBjb2RlIGxpc3QuIFRoZXJlIGlzIG5vIGRlZmF1bHQgdmFsdWU7IGlmIHRoZSBzdHlsZSBpcyBcImN1cnJlbmN5XCIsIHRoZSBjdXJyZW5jeSBwcm9wZXJ0eSBtdXN0IGJlIHByb3ZpZGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5RGlzcGxheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhvdyB0byBkaXNwbGF5IHRoZSBjdXJyZW5jeSBpbiBjdXJyZW5jeSBmb3JtYXR0aW5nLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIFwic3ltYm9sXCIgdG8gdXNlIGEgbG9jYWxpemVkIGN1cnJlbmN5IHN5bWJvbCBzdWNoIGFzIOKCrCwgXCJjb2RlXCIgdG8gdXNlIHRoZSBJU08gY3VycmVuY3kgY29kZSwgXCJuYW1lXCIgdG8gdXNlIGEgbG9jYWxpemVkIGN1cnJlbmN5IG5hbWUgc3VjaCBhcyBcImRvbGxhclwiOyB0aGUgZGVmYXVsdCBpcyBcInN5bWJvbFwiLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgV2hldGhlciB0byB1c2UgZ3JvdXBpbmcgc2VwYXJhdG9ycywgc3VjaCBhcyB0aG91c2FuZHMgc2VwYXJhdG9ycyBvciB0aG91c2FuZC9sYWtoL2Nyb3JlIHNlcGFyYXRvcnMuIFBvc3NpYmxlIHZhbHVlcyBhcmUgdHJ1ZSBhbmQgZmFsc2U7IHRoZSBkZWZhdWx0IGlzIHRydWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGZhbGwgaW50byB0d28gZ3JvdXBzOiBtaW5pbXVtSW50ZWdlckRpZ2l0cywgbWluaW11bUZyYWN0aW9uRGlnaXRzLCBhbmQgbWF4aW11bUZyYWN0aW9uRGlnaXRzIGluIG9uZSBncm91cCwgbWluaW11bVNpZ25pZmljYW50RGlnaXRzIGFuZCBtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMgaW4gdGhlIG90aGVyLiBJZiBhdCBsZWFzdCBvbmUgcHJvcGVydHkgZnJvbSB0aGUgc2Vjb25kIGdyb3VwIGlzIGRlZmluZWQsIHRoZW4gdGhlIGZpcnN0IGdyb3VwIGlzIGlnbm9yZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bUludGVnZXJEaWdpdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgbWluaW11bSBudW1iZXIgb2YgaW50ZWdlciBkaWdpdHMgdG8gdXNlLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIGZyb20gMSB0byAyMTsgdGhlIGRlZmF1bHQgaXMgMS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgbWluaW11bSBudW1iZXIgb2YgZnJhY3Rpb24gZGlnaXRzIHRvIHVzZS4gUG9zc2libGUgdmFsdWVzIGFyZSBmcm9tIDAgdG8gMjA7IHRoZSBkZWZhdWx0IGZvciBwbGFpbiBudW1iZXIgYW5kIHBlcmNlbnQgZm9ybWF0dGluZyBpcyAwOyB0aGUgZGVmYXVsdCBmb3IgY3VycmVuY3kgZm9ybWF0dGluZyBpcyB0aGUgbnVtYmVyIG9mIG1pbm9yIHVuaXQgZGlnaXRzIHByb3ZpZGVkIGJ5IHRoZSBJU08gNDIxNyBjdXJyZW5jeSBjb2RlIGxpc3QgKDIgaWYgdGhlIGxpc3QgZG9lc24ndCBwcm92aWRlIHRoYXQgaW5mb3JtYXRpb24pLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRoZSBtYXhpbXVtIG51bWJlciBvZiBmcmFjdGlvbiBkaWdpdHMgdG8gdXNlLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIGZyb20gMCB0byAyMDsgdGhlIGRlZmF1bHQgZm9yIHBsYWluIG51bWJlciBmb3JtYXR0aW5nIGlzIHRoZSBsYXJnZXIgb2YgbWluaW11bUZyYWN0aW9uRGlnaXRzIGFuZCAzOyB0aGUgZGVmYXVsdCBmb3IgY3VycmVuY3kgZm9ybWF0dGluZyBpcyB0aGUgbGFyZ2VyIG9mIG1pbmltdW1GcmFjdGlvbkRpZ2l0cyBhbmQgdGhlIG51bWJlciBvZiBtaW5vciB1bml0IGRpZ2l0cyBwcm92aWRlZCBieSB0aGUgSVNPIDQyMTcgY3VycmVuY3kgY29kZSBsaXN0ICgyIGlmIHRoZSBsaXN0IGRvZXNuJ3QgcHJvdmlkZSB0aGF0IGluZm9ybWF0aW9uKTsgdGhlIGRlZmF1bHQgZm9yIHBlcmNlbnQgZm9ybWF0dGluZyBpcyB0aGUgbGFyZ2VyIG9mIG1pbmltdW1GcmFjdGlvbkRpZ2l0cyBhbmQgMC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtU2lnbmlmaWNhbnREaWdpdHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgbWluaW11bSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgZGlnaXRzIHRvIHVzZS4gUG9zc2libGUgdmFsdWVzIGFyZSBmcm9tIDEgdG8gMjE7IHRoZSBkZWZhdWx0IGlzIDEuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW11bVNpZ25pZmljYW50RGlnaXRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVGhlIG1heGltdW0gbnVtYmVyIG9mIHNpZ25pZmljYW50IGRpZ2l0cyB0byB1c2UuIFBvc3NpYmxlIHZhbHVlcyBhcmUgZnJvbSAxIHRvIDIxOyB0aGUgZGVmYXVsdCBpcyBtaW5pbXVtU2lnbmlmaWNhbnREaWdpdHMuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgZm9ybWF0TnVtYmVyID0gKGxvY2FsZSwgbnVtYmVyLCBvcHRpb25zID0gdW5kZWZpbmVkKSA9PlxuICBuZXcgSW50bC5OdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zKS5mb3JtYXQobnVtYmVyKTtcblxuLyoqXG4gKiBGb3JtYXRzIGEgZ2l2ZW4gZGF0ZSBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRlIGphdmFTY3JpcHQgRGF0ZSBvYmplY3Q6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0RhdGVcbiAqIEBwYXJhbSB7Kn0gb3B0aW9ucyBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRGF0ZVRpbWVGb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgICBsb2NhbGVNYXRjaGVyXG4gICAgICAgICAgICAgICAgICAgICAgVGhlIGxvY2FsZSBtYXRjaGluZyBhbGdvcml0aG0gdG8gdXNlLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIFwibG9va3VwXCIgYW5kIFwiYmVzdCBmaXRcIjsgdGhlIGRlZmF1bHQgaXMgXCJiZXN0IGZpdFwiLiBGb3IgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvcHRpb24sIHNlZSB0aGUgSW50bCBwYWdlLlxuICAgICAgICAgICAgICAgICAgICAgIHRpbWVab25lXG4gICAgICAgICAgICAgICAgICAgICAgVGhlIHRpbWUgem9uZSB0byB1c2UuIFRoZSBvbmx5IHZhbHVlIGltcGxlbWVudGF0aW9ucyBtdXN0IHJlY29nbml6ZSBpcyBcIlVUQ1wiOyB0aGUgZGVmYXVsdCBpcyB0aGUgcnVudGltZSdzIGRlZmF1bHQgdGltZSB6b25lLiBJbXBsZW1lbnRhdGlvbnMgbWF5IGFsc28gcmVjb2duaXplIHRoZSB0aW1lIHpvbmUgbmFtZXMgb2YgdGhlIElBTkEgdGltZSB6b25lIGRhdGFiYXNlLCBzdWNoIGFzIFwiQXNpYS9TaGFuZ2hhaVwiLCBcIkFzaWEvS29sa2F0YVwiLCBcIkFtZXJpY2EvTmV3X1lvcmtcIi5cbiAgICAgICAgICAgICAgICAgICAgICBob3VyMTJcbiAgICAgICAgICAgICAgICAgICAgICBXaGV0aGVyIHRvIHVzZSAxMi1ob3VyIHRpbWUgKGFzIG9wcG9zZWQgdG8gMjQtaG91ciB0aW1lKS4gUG9zc2libGUgdmFsdWVzIGFyZSB0cnVlIGFuZCBmYWxzZTsgdGhlIGRlZmF1bHQgaXMgbG9jYWxlIGRlcGVuZGVudC4gVGhpcyBvcHRpb24gb3ZlcnJpZGVzIHRoZSBoYyBsYW5ndWFnZSB0YWcgYW5kL29yIHRoZSBob3VyQ3ljbGUgb3B0aW9uIGluIGNhc2UgYm90aCBhcmUgcHJlc2VudC5cbiAgICAgICAgICAgICAgICAgICAgICBob3VyQ3ljbGVcbiAgICAgICAgICAgICAgICAgICAgICBUaGUgaG91ciBjeWNsZSB0byB1c2UuIFBvc3NpYmxlIHZhbHVlcyBhcmUgXCJoMTFcIiwgXCJoMTJcIiwgXCJoMjNcIiwgb3IgXCJoMjRcIi4gVGhpcyBvcHRpb24gb3ZlcnJpZGVzIHRoZSBoYyBsYW5ndWFnZSB0YWcsIGlmIGJvdGggYXJlIHByZXNlbnQsIGFuZCB0aGUgaG91cjEyIG9wdGlvbiB0YWtlcyBwcmVjZWRlbmNlIGluIGNhc2UgYm90aCBvcHRpb25zIGhhdmUgYmVlbiBzcGVjaWZpZWQuXG4gICAgICAgICAgICAgICAgICAgICAgZm9ybWF0TWF0Y2hlclxuICAgICAgICAgICAgICAgICAgICAgIFRoZSBmb3JtYXQgbWF0Y2hpbmcgYWxnb3JpdGhtIHRvIHVzZS4gUG9zc2libGUgdmFsdWVzIGFyZSBcImJhc2ljXCIgYW5kIFwiYmVzdCBmaXRcIjsgdGhlIGRlZmF1bHQgaXMgXCJiZXN0IGZpdFwiLiBTZWUgdGhlIGZvbGxvd2luZyBwYXJhZ3JhcGhzIGZvciBpbmZvcm1hdGlvbiBhYm91dCB0aGUgdXNlIG9mIHRoaXMgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgICAgICAgVGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIGRlc2NyaWJlIHRoZSBkYXRlLXRpbWUgY29tcG9uZW50cyB0byB1c2UgaW4gZm9ybWF0dGVkIG91dHB1dCwgYW5kIHRoZWlyIGRlc2lyZWQgcmVwcmVzZW50YXRpb25zLiBJbXBsZW1lbnRhdGlvbnMgYXJlIHJlcXVpcmVkIHRvIHN1cHBvcnQgYXQgbGVhc3QgdGhlIGZvbGxvd2luZyBzdWJzZXRzOlxuXG4gICAgICAgICAgICAgICAgICAgICAgd2Vla2RheSwgeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICB3ZWVrZGF5LCB5ZWFyLCBtb250aCwgZGF5XG4gICAgICAgICAgICAgICAgICAgICAgeWVhciwgbW9udGgsIGRheVxuICAgICAgICAgICAgICAgICAgICAgIHllYXIsIG1vbnRoXG4gICAgICAgICAgICAgICAgICAgICAgbW9udGgsIGRheVxuICAgICAgICAgICAgICAgICAgICAgIGhvdXIsIG1pbnV0ZSwgc2Vjb25kXG4gICAgICAgICAgICAgICAgICAgICAgaG91ciwgbWludXRlXG4gICAgICAgICAgICAgICAgICAgICAgSW1wbGVtZW50YXRpb25zIG1heSBzdXBwb3J0IG90aGVyIHN1YnNldHMsIGFuZCByZXF1ZXN0cyB3aWxsIGJlIG5lZ290aWF0ZWQgYWdhaW5zdCBhbGwgYXZhaWxhYmxlIHN1YnNldC1yZXByZXNlbnRhdGlvbiBjb21iaW5hdGlvbnMgdG8gZmluZCB0aGUgYmVzdCBtYXRjaC4gVHdvIGFsZ29yaXRobXMgYXJlIGF2YWlsYWJsZSBmb3IgdGhpcyBuZWdvdGlhdGlvbiBhbmQgc2VsZWN0ZWQgYnkgdGhlIGZvcm1hdE1hdGNoZXIgcHJvcGVydHk6IEEgZnVsbHkgc3BlY2lmaWVkIFwiYmFzaWNcIiBhbGdvcml0aG0gYW5kIGFuIGltcGxlbWVudGF0aW9uIGRlcGVuZGVudCBcImJlc3QgZml0XCIgYWxnb3JpdGhtLlxuXG4gICAgICAgICAgICAgICAgICAgICAgd2Vla2RheVxuICAgICAgICAgICAgICAgICAgICAgIFRoZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgd2Vla2RheS4gUG9zc2libGUgdmFsdWVzIGFyZSBcIm5hcnJvd1wiLCBcInNob3J0XCIsIFwibG9uZ1wiLlxuICAgICAgICAgICAgICAgICAgICAgIGVyYVxuICAgICAgICAgICAgICAgICAgICAgIFRoZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXJhLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIFwibmFycm93XCIsIFwic2hvcnRcIiwgXCJsb25nXCIuXG4gICAgICAgICAgICAgICAgICAgICAgeWVhclxuICAgICAgICAgICAgICAgICAgICAgIFRoZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgeWVhci4gUG9zc2libGUgdmFsdWVzIGFyZSBcIm51bWVyaWNcIiwgXCIyLWRpZ2l0XCIuXG4gICAgICAgICAgICAgICAgICAgICAgbW9udGhcbiAgICAgICAgICAgICAgICAgICAgICBUaGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1vbnRoLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIFwibnVtZXJpY1wiLCBcIjItZGlnaXRcIiwgXCJuYXJyb3dcIiwgXCJzaG9ydFwiLCBcImxvbmdcIi5cbiAgICAgICAgICAgICAgICAgICAgICBkYXlcbiAgICAgICAgICAgICAgICAgICAgICBUaGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRheS4gUG9zc2libGUgdmFsdWVzIGFyZSBcIm51bWVyaWNcIiwgXCIyLWRpZ2l0XCIuXG4gICAgICAgICAgICAgICAgICAgICAgaG91clxuICAgICAgICAgICAgICAgICAgICAgIFRoZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgaG91ci4gUG9zc2libGUgdmFsdWVzIGFyZSBcIm51bWVyaWNcIiwgXCIyLWRpZ2l0XCIuXG4gICAgICAgICAgICAgICAgICAgICAgbWludXRlXG4gICAgICAgICAgICAgICAgICAgICAgVGhlIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtaW51dGUuIFBvc3NpYmxlIHZhbHVlcyBhcmUgXCJudW1lcmljXCIsIFwiMi1kaWdpdFwiLlxuICAgICAgICAgICAgICAgICAgICAgIHNlY29uZFxuICAgICAgICAgICAgICAgICAgICAgIFRoZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgc2Vjb25kLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIFwibnVtZXJpY1wiLCBcIjItZGlnaXRcIi5cbiAgICAgICAgICAgICAgICAgICAgICB0aW1lWm9uZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgICBUaGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHRpbWUgem9uZSBuYW1lLiBQb3NzaWJsZSB2YWx1ZXMgYXJlIFwic2hvcnRcIiwgXCJsb25nXCIuXG4gICAgICAgICAgICAgICAgICAgICAgVGhlIGRlZmF1bHQgdmFsdWUgZm9yIGVhY2ggZGF0ZS10aW1lIGNvbXBvbmVudCBwcm9wZXJ0eSBpcyB1bmRlZmluZWQsIGJ1dCBpZiBhbGwgY29tcG9uZW50IHByb3BlcnRpZXMgYXJlIHVuZGVmaW5lZCwgdGhlbiB5ZWFyLCBtb250aCwgYW5kIGRheSBhcmUgYXNzdW1lZCB0byBiZSBcIm51bWVyaWNcIi5cbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdERhdGVUaW1lID0gKGxvY2FsZSwgZGF0ZSwgb3B0aW9ucyA9IHVuZGVmaW5lZCkgPT5cbiAgbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBvcHRpb25zKS5mb3JtYXQoZGF0ZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);
});