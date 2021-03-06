import * as messageTranslator from './messageTranslator';
import MessageFormat from 'messageformat';

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
      time: { hour: 'numeric', minute: 'numeric', ...time },
    };

    // Create instances for Intl formatter
    this._numberFormatter = new Intl.NumberFormat(this._locale, this._options.number);
    this._currencyFormatter = new Intl.NumberFormat(this._locale, this._options.currency);
    this._percentFormatter = new Intl.NumberFormat(this._locale, this._options.percent);
    this._dateFormatter = new Intl.DateTimeFormat(this._locale, this._options.date);
    this._timeFormatter = new Intl.DateTimeFormat(this._locale, this._options.time);
    // Create instance for message formatter
    this._messageFormatter = new MessageFormat(this._locale);
  }

  // --- getters ---

  /**
   * Returns true if provided message exists in current locale or language (if locale only contains language tag)
   * @memberof I18n
   * @param {string} message
   * @returns {boolean}
   */
  hasMessage = message => {
    if (
      messageTranslator.getMessage(
        messageTranslator.getMessages(this._locale, this._messages),
        message
      )
    )
      return true;
    return false;
  };

  /**
   * Getter for all messages
   * @readonly
   * @memberof I18n
   */
  get messages() {
    return this._messages;
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
   * Getter for options
   * @readonly
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
   * @param {string} message (use ICU string syntax)
   * @param {object} args (description, options, values, plurals or genders)
   * @returns {string}
   */
  m = (message, args = {}) => {
    const { description, options, ...values } = args;
    const translatedMsg = messageTranslator.translate(this._locale, this._messages, message, {
      ...this._options.message,
      ...options,
    });
    // Return message if no values are provided
    if (Object.keys(values).length === 0) return translatedMsg;
    // Return new formatted message
    return this._messageFormatter.compile(translatedMsg)(values);
  };
}
