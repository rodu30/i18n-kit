!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types")):"function"==typeof define&&define.amd?define("i18n-kit",["react","prop-types"],t):"object"==typeof exports?exports["i18n-kit"]=t(require("react"),require("prop-types")):e["i18n-kit"]=t(e.React,e.PropTypes)}("undefined"!=typeof self?self:this,function(e,t){return function(e){function __webpack_require__(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,__webpack_require__),r.l=!0,r.exports}var t={};return __webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,n){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},__webpack_require__.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=3)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t,n){"use strict";function _objectWithoutProperties(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=n(5),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),a=function(){function I18n(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};_classCallCheck(this,I18n),c.call(this),this._locale=t,this._messages=e;var r=n.message,i=n.number,a=n.currency,s=n.percent,u=n.date,l=n.time;this._options={message:r,number:o({},i,{style:"decimal"}),currency:o({currency:"EUR"},a,{style:"currency"}),percent:o({},s,{style:"percent"}),date:o({year:"numeric",month:"numeric",day:"numeric"},u),time:o({hour:"numeric",minute:"numeric"},l)},this._numberFormatter=new Intl.NumberFormat(this._locale,this._options.number),this._currencyFormatter=new Intl.NumberFormat(this._locale,this._options.currency),this._percentFormatter=new Intl.NumberFormat(this._locale,this._options.percent),this._dateFormatter=new Intl.DateTimeFormat(this._locale,this._options.date),this._timeFormatter=new Intl.DateTimeFormat(this._locale,this._options.time)}return i(I18n,[{key:"messages",get:function(){return this._messages}},{key:"locale",get:function(){return this._locale}},{key:"options",get:function(){return this._options}}]),I18n}(),c=function(){var e=this;this.hasMessage=function(t){return!!r.b(e._locale,e._messages,t)},this.n=function(t,n){return n?new Intl.NumberFormat(e._locale,o({},e._options.number,n)).format(t):e._numberFormatter.format(t)},this.c=function(t,n){return n?new Intl.NumberFormat(e._locale,o({},e._options.currency,n)).format(t):e._currencyFormatter.format(t)},this.p=function(t,n){return n?new Intl.NumberFormat(e._locale,o({},e._options.percent,n)).format(t/100):e._percentFormatter.format(t/100)},this.d=function(t,n){return n?new Intl.DateTimeFormat(e._locale,o({},e._options.date,n)).format(t):e._dateFormatter.format(t)},this.t=function(t,n){return n?new Intl.DateTimeFormat(e._locale,o({},e._options.time,n)).format(t):e._timeFormatter.format(t)},this.m=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=(n.description,_objectWithoutProperties(n,["description"])),i=r.c(e._locale,e._messages,t,e._options.message);return r.a(i,o)}};t.a=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4);n.d(t,"I18nProvider",function(){return r.a});var o=n(6);n.d(t,"I18nGetter",function(){return o.a});var i=n(7);n.d(t,"getI18n",function(){return i.a});var a=n(2);n.d(t,"default",function(){return a.a})},function(e,t,n){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var r=n(0),o=(n.n(r),n(1)),i=n.n(o),a=n(2),c=function(e){function I18nProvider(t){_classCallCheck(this,I18nProvider);var n=_possibleConstructorReturn(this,e.call(this,t));return n.handleSetLocale=function(e){e?n.setState(function(t){if(t.currentLocale!==e)return{currentLocale:e}}):n.setState(function(e){if(e.currentLocale!==n.state.initialLocale)return{currentLocale:n.state.initialLocale}})},n.handleGetLocale=function(){return n.state.currentLocale},n.state={currentLocale:n.props.locale,initialLocale:n.props.locale},n}return _inherits(I18nProvider,e),I18nProvider.prototype.getChildContext=function(){var e=this.props,t=e.messages,n=e.options,r=this.state.currentLocale,o=new a.a(t,r,n);return Object.defineProperty(o,"locale",{set:this.handleSetLocale,get:this.handleGetLocale}),{i18n:o}},I18nProvider.prototype.render=function(){return this.props.children},I18nProvider}(r.Component);c.childContextTypes={i18n:i.a.instanceOf(a.a)},c.propTypes={children:i.a.node.isRequired,messages:i.a.object.isRequired,locale:i.a.string,options:i.a.object},c.defaultProps={locale:navigator.languages&&navigator.languages[0]||navigator.language||navigator.userLanguage||"en-US",options:void 0},t.a=c},function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return i}),n.d(t,"c",function(){return a});var r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e;return Object.entries(t).forEach(function(e){var t=e[0],r=e[1],o=new RegExp("{"+t+"}","g");n=n.replace(o,r)}),n},o=function(e){return e.toLowerCase().replace(/ /g,"_")},i=function(e,t,n){var r=o(n),i=Object.entries(t[e]).find(function(e){var t=e[0],n=e[1];return t===r&&n.message&&"MISSING"!==n.flag});return i?i[1].message:null},a=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=r.disableWarnings,a=r.messageLocale;if(!t[e])return o||console.warn('Warning: Displaying default message\nLocale "'+e+'" is missing in list of locales.'),n;var c=i(e,t,n);return c?c||null:a&&a===e?n:(o||console.warn('Warning: Displaying default message\n"'+n+'" has not been translated to requested locale "'+e+'".'),n)}},function(e,t,n){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var r=n(0),o=(n.n(r),n(1)),i=n.n(o),a=function(e){function I18nGetter(){return _classCallCheck(this,I18nGetter),_possibleConstructorReturn(this,e.apply(this,arguments))}return _inherits(I18nGetter,e),I18nGetter.prototype.render=function(){var e=this.context.i18n;return this.props.children(e)},I18nGetter}(r.Component);a.contextTypes={i18n:i.a.object.isRequired},a.propTypes={children:i.a.func.isRequired},t.a=a},function(e,t,n){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var r=n(0),o=n.n(r),i=n(1),a=n.n(i),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(e){var t=function(t){function I18nContext(){return _classCallCheck(this,I18nContext),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(I18nContext,t),I18nContext.prototype.render=function(){var t=this.context.i18n;return o.a.createElement(e,c({i18n:t},this.props))},I18nContext}(r.Component);return t.contextTypes={i18n:a.a.object.isRequired},t};t.a=s}])});