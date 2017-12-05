import * as messageFormatter from './message';

/**
 * Class for internalization and localization of numbers (plain numbers, currency, percent), dates objects (dates, time) and strings (messages with vars)
 * @class I18n
 */
export default class I18n {
  /**
   * Constructor for instances of this class,
   * providing the object for messages and an initial default locale is required,
   * providing individual options is optional (if no options provided the formatters will use defaults)
   * @param {object} messages
   * @param {string} locale
   * @param {object} options (keys: 'message', 'number', 'currency', 'percent', 'date', 'time')
   */
  constructor(messages, locale, options = {}) {
    // Set locale
    this._locale = locale;
    this._defaultLocale = locale;

    // Set messages
    this._messages = messages;

    // Init options
    const { message, number, currency, percent, date, time } = options;
    this._options = {
      message: message,
      number: { ...number, style: 'decimal' },
      currency: { currency: 'EUR', ...currency, style: 'currency' },
      percent: { ...percent, style: 'percent' },
      date: { year: 'numeric', month: 'numeric', day: 'numeric', ...date },
      time: { hour: 'numeric', minute: 'numeric', ...time }
    };

    // Init formatter
    this.initFormatter();
  }

  // --- helper ---

  /**
   * Creates new instances for Intl formatter
   * @memberof I18n
   */
  initFormatter = () => {
    this._numberFormatter = new Intl.NumberFormat(this._locale, this._options.number);
    this._currencyFormatter = new Intl.NumberFormat(this._locale, this._options.currency);
    this._percentFormatter = new Intl.NumberFormat(this._locale, this._options.percent);
    this._dateFormatter = new Intl.DateTimeFormat(this._locale, this._options.date);
    this._timeFormatter = new Intl.DateTimeFormat(this._locale, this._options.time);
  };

  /**
   * Returns true if provided message exists in current locale
   * @memberof I18n
   * @param {string} message
   * @returns {boolean}
   */
  hasMessage = message => {
    if (messageFormatter.get(this._locale, this._messages, message)) return true;
    return false;
  };

  // --- getters & setters ---

  /**
   * Update current locale (e.g. when user settings change),
   * if no locale is provided locale is set to default
   * @memberof I18n
   * @param {string} locale
   */
  set locale(locale) {
    if (locale) {
      this._locale = locale;
    } else {
      this._locale = this._defaultLocale;
    }
    // Create new formatter instances with the new locale
    this.initFormatter();
  }

  /**
   * Getter for locale
   * @readonly
   * @memberof I18n
   */
  get locale() {
    return this._locale;
  }

  /**
   * Sets global formatting and translation options,
   * overrides default settings from constructor (attention!)
   * @memberof I18n
   * @param {object} options (keys: 'message', 'number', 'currency', 'percent', 'date', 'time')
   */
  set options(options) {
    Object.entries(options).forEach(([key, value]) => {
      switch (key) {
        case 'number':
          this._options.number = { ...value, style: 'decimal' };
          break;
        case 'currency':
          this._options.currency = { ...value, style: 'currency' };
          break;
        case 'percent':
          this._options.number = { ...value, style: 'percent' };
          break;
        default:
          this._options[key] = value;
      }
    });
    this.initFormatter();
  }

  /**
   * Getter for options
   * @memberof I18n
   */
  get options() {
    return this._options;
  }

  // --- formatter ---

  /**
   * Formats number according to current locale; options can override gobal options
   * @memberof I18n
   * @param {number} number
   * @param {object} options
   * @returns {string}
   */
  n = (number, options) => {
    if (options)
      return new Intl.NumberFormat(this._locale, { ...this._options.number, ...options }).format(
        number
      );
    return this._numberFormatter.format(number);
  };

  /**
   * Formats currency according to current locale; options can override gobal options
   * @memberof I18n
   * @param {number} sum
   * @param {object} options
   * @returns {string}
   */
  c = (sum, options) => {
    if (options)
      return new Intl.NumberFormat(this._locale, { ...this._options.currency, ...options }).format(
        sum
      );
    return this._currencyFormatter.format(sum);
  };

  /**
   * Formats percent number according to current locale; options can override gobal options
   * @memberof I18n
   * @param {number} number
   * @param {object} options
   * @returns {string}
   */
  p = (number, options) => {
    if (options)
      return new Intl.NumberFormat(this._locale, { ...this._options.percent, ...options }).format(
        number / 100
      );
    return this._percentFormatter.format(number / 100);
  };

  /**
   * Formats date according to current locale; options can override gobal options
   * @memberof I18n
   * @param {object} date
   * @param {object} options
   * @returns {string}
   */
  d = (date, options) => {
    if (options)
      return new Intl.DateTimeFormat(this._locale, { ...this._options.date, ...options }).format(
        date
      );
    return this._dateFormatter.format(date);
  };

  /**
   * Formats time according to current locale; options can override gobal options
   * @memberof I18n
   * @param {object} date
   * @param {object} options
   * @returns {string}
   */
  t = (date, options) => {
    if (options)
      return new Intl.DateTimeFormat(this._locale, { ...this._options.time, ...options }).format(
        date
      );
    return this._timeFormatter.format(date);
  };

  /**
   * Formats and translates a string, depending on user's current locale
   * (returns the provided message if current locale is the message locale or if no translation exists)
   * @memberof I18n
   * @param {string} message
   * @param {object} args (description, values)
   * @returns {string}
   */
  m = (message, args = {}) => {
    const { description, ...values } = args;
    const translatedMsg = messageFormatter.translate(
      this._locale,
      this._messages,
      message,
      this._options.message
    );
    return messageFormatter.format(translatedMsg, values);
  };
}
