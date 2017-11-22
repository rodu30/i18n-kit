import formatNumber from './number';
import formatDateTime from './dateTime';

/**
 *
 *
 * @export
 * @class I18n
 */
export default class I18n {
  /**
   *
   * @param {*} messages
   * @param {*} initialLocale
   * @param {*} defaultLocale if provided, default messages passed with formatMessage will automatically be added to this locale
   */
  constructor(messages, initialLocale, defaultLocale) {
    this.messages = messages;
    this.currentLocale = initialLocale;
    this.messageOptions = { defaultLocale };
    this.numberOptions = {};
    this.dateTimeOptions = {};
  }

  changeLocale = locale => {
    this.currentLocale = locale;
  };

  // TODO add more
  setMessageOptions = ({ defaultLocale, noWarnings }) => {
    if (this.messageOptions.defaultLocale) {
      this.messageOptions.defaultLocale = defaultLocale;
    }
  };

  setNumberOptions = options => {
    this.numberOptions = { ...this.numberOptions, ...options };
  };

  setDateTimeOptions = options => {
    this.dateTimeOptions = { ...this.dateTimeOptions, ...options };
  };

  /**
   *
   * NOTE: options if provided override class options
   * @memberof I18n
   */
  formatNumber = (number, options) =>
    formatNumber(this.currentLocale, number, { ...this.numberOptions, ...options });

  /**
   *
   * NOTE: options if provided override class options
   * @memberof I18n
   */
  formatDateTime = (date, options) =>
    formatDateTime(this.currentLocale, date, { ...this.numberOptions, ...options });
}
