import formatNumber from './number';
import formatDateTime from './dateTime';
import formatMessage, { addNewMessage } from './message';

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
   * @param {string} defaultLocale
   * @param {string} messageLocale
   * @param {object} options use a keys 'messageOptions', 'numberOptions', 'dateTimeOptions' to specify
   */
  constructor(
    messages,
    defaultLocale,
    messageLocale = undefined,
    { messageOptions = {}, numberOptions = {}, dateTimeOptions = {} }
  ) {
    this.messages = messages;
    this.locale = defaultLocale;
    this.defaultLocale = defaultLocale;
    this.messageOptions = { ...messageOptions, messageLocale };
    this.numberOptions = numberOptions;
    this.dateTimeOptions = dateTimeOptions;
  }

  /**
   * Update current locale e.g. when user settings change
   * @memberof I18n
   * @param {string} locale
   */
  setLocale = locale => {
    this.locale = locale;
    // console.log(this);
  };

  setLocaleToDefault = () => {
    this.locale = this.defaultLocale;
    // console.log(this);
  };

  /**
   * Set or update options for formatting messages in your instance of this class
   * @memberof I18n
   * @param {object} options
   */
  // TODO: add more defined definition
  setMessageOptions = options => {
    this.messageOptions = { ...this.messageOptions, ...options };
    // console.log(this);
  };

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
   * Format a number according to current locale
   * NOTE: if provided, options override class options
   * @memberof I18n
   * @param {number} number
   * @param {object} options
   */
  formatNumber = (number, options) =>
    formatNumber(this.locale, number, options || this.numberOptions);

  /**
   * Format a Date object according to current locale
   * NOTE: if provided, options override class options
   * @memberof I18n
   * @param {object} date
   * @param {object} options
   */
  formatDateTime = (date, options) =>
    formatDateTime(this.locale, date, options || this.dateTimeOptions);

  /**
   * Format a ICU string with optional variables and
   * return translation if current locale is not the default locale
   * NOTE: if provided, options override class options
   * @memberof I18n
   * @param {string} message
   * @param {object} options
   */
  formatMessage = (message, options) => {
    // If messageLocale is set, add message to messages of default locale
    const messageLocale = options.messageLocale || this.messageOptions.messageLocale;
    if (messageLocale) {
      this.messages = addNewMessage(this.messages, messageLocale, message);
    }
    console.log(this);
    return formatMessage(this.locale, this.messages, message, options || this.messageOptions);
  };
}
