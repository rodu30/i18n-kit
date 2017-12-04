import formatNumber from './number';
import formatDateTime from './dateTime';
import translateMessage, { formatMessage, getMessage } from './message';

/**
 *
 *
 * @export
 * @class I18n
 */
export default class I18n {
  /**
   * Constructor for instance of this class,
   * passing the object for messages and an initial default locale is required,
   * passing a message locale is optional
   * NOTE: If provided, messages passed to formatMessage will automatically be added to this locale,
   * which should be the standard use case. If not set, messages will be displayed but not saved.
   * A possible use case could be when you wish to define the messages manually and only use the
   * default message as fallback. In this case you can disable all warnings in the message options.
   * TODO: does that make sense??
   *
   * @param {object} messages
   * @param {string} initialLocale
   * @param {object} options  use keys 'message', 'number', 'dateTime' to specify options for formatting
   */
  constructor(messages, initialLocale, options = {}) {
    const { message = {}, number = {}, dateTime = {} } = options;

    this.messages = messages;
    this.locale = initialLocale;
    this.defaultLocale = initialLocale;
    this.messageOptions = message;
    this.numberOptions = number;
    this.dateTimeOptions = dateTime;
  }

  /**
   * Update current locale (e.g. when user settings change),
   * if no locale is provided locale is set to default
   * @memberof I18n
   * @param {string} locale
   */
  setLocale = locale => {
    if (locale) {
      this.locale = locale;
    } else {
      this.locale = this.defaultLocale;
    }
  };

  // --- Number ---

  /**
   * Set or update options for formatting numbers in your instance of this class
   * @memberof I18n
   * @param {object} options
   */
  // TODO: add more defined definition
  setNumberOptions = options => {
    this.numberOptions = { ...this.numberOptions, ...options };
    // console.log(this);
  };

  /**
   * Format a number according to current locale
   * NOTE: if provided, options override class options
   * @memberof I18n
   * @param {number} number
   * @param {object} options
   */
  formatNumber = (number, options) =>
    formatNumber(this.locale, number, options || this.numberOptions);

  // --- DateTime ---

  /**
   * Set or update options for formatting date objects in your instance of this class
   * @memberof I18n
   * @param {object} options
   */
  // TODO: add more defined definition
  setDateTimeOptions = options => {
    this.dateTimeOptions = { ...this.dateTimeOptions, ...options };
    // console.log(this);
  };

  /**
   * Format a Date object according to current locale
   * NOTE: if provided, options override class options
   * @memberof I18n
   * @param {object} date
   * @param {object} options
   */
  formatDateTime = (date, options) =>
    formatDateTime(this.locale, date, options || this.dateTimeOptions);

  // --- Message ---

  /**
   * Set or update options for translating messages in your instance of this class
   * @memberof I18n
   * @param {object} options
   */
  setMessageOptions = options => {
    this.messageOptions = { ...this.messageOptions, ...options };
  };

  /**
   * Returns a formatted and translated string, depending on user's current locale
   * (returns the provided message if current locale is the message locale or if no translation exists)
   * @memberof I18n
   * @param {string} message
   * @param {object} args:
   *                 description: {string}  additional context for this message for the translator
   *                 values: {object}       variables for the message
   * @returns {string}
   */
  translateMessage = (message, args = {}) => {
    const { description, ...values } = args;
    const translatedMsg = translateMessage(
      this.locale,
      this.messages,
      message,
      this.messageOptions
    );
    return formatMessage(translatedMsg, values);
  };

  /**
   * Returns true if provided message exists in current locale
   * @memberof I18n
   * @param {string} message
   * @returns {boolean}
   */
  hasMessage = message => {
    if (getMessage(this.locale, this.messages, message)) return true;
    return false;
  };
}
