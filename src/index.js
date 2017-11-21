// --- Base API ---

/**
 * Formats a given number
 * @param {string} locale 
 * @param {number} number 
 * @param {object} options  see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
                            localeMatcher
                            The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". For information about this option, see the Intl page.
                            style
                            The formatting style to use. Possible values are "decimal" for plain number formatting, "currency" for currency formatting, and "percent" for percent formatting; the default is "decimal".
                            currency
                            The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB — see the Current currency & funds code list. There is no default value; if the style is "currency", the currency property must be provided.
                            currencyDisplay
                            How to display the currency in currency formatting. Possible values are "symbol" to use a localized currency symbol such as €, "code" to use the ISO currency code, "name" to use a localized currency name such as "dollar"; the default is "symbol".
                            useGrouping
                            Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators. Possible values are true and false; the default is true.
                            The following properties fall into two groups: minimumIntegerDigits, minimumFractionDigits, and maximumFractionDigits in one group, minimumSignificantDigits and maximumSignificantDigits in the other. If at least one property from the second group is defined, then the first group is ignored.
                            minimumIntegerDigits
                            The minimum number of integer digits to use. Possible values are from 1 to 21; the default is 1.
                            minimumFractionDigits
                            The minimum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number and percent formatting is 0; the default for currency formatting is the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information).
                            maximumFractionDigits
                            The maximum number of fraction digits to use. Possible values are from 0 to 20; the default for plain number formatting is the larger of minimumFractionDigits and 3; the default for currency formatting is the larger of minimumFractionDigits and the number of minor unit digits provided by the ISO 4217 currency code list (2 if the list doesn't provide that information); the default for percent formatting is the larger of minimumFractionDigits and 0.
                            minimumSignificantDigits
                            The minimum number of significant digits to use. Possible values are from 1 to 21; the default is 1.
                            maximumSignificantDigits
                            The maximum number of significant digits to use. Possible values are from 1 to 21; the default is minimumSignificantDigits.
 * @returns {string}
 */
export const formatNumber = (locale, number, options = undefined) =>
  new Intl.NumberFormat(locale, options).format(number);

/**
 * Formats a given date object
 * @param {string} locale
 * @param {object} date javaScript Date object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
 * @param {object} options see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
                      localeMatcher
                      The locale matching algorithm to use. Possible values are "lookup" and "best fit"; the default is "best fit". For information about this option, see the Intl page.
                      timeZone
                      The time zone to use. The only value implementations must recognize is "UTC"; the default is the runtime's default time zone. Implementations may also recognize the time zone names of the IANA time zone database, such as "Asia/Shanghai", "Asia/Kolkata", "America/New_York".
                      hour12
                      Whether to use 12-hour time (as opposed to 24-hour time). Possible values are true and false; the default is locale dependent. This option overrides the hc language tag and/or the hourCycle option in case both are present.
                      hourCycle
                      The hour cycle to use. Possible values are "h11", "h12", "h23", or "h24". This option overrides the hc language tag, if both are present, and the hour12 option takes precedence in case both options have been specified.
                      formatMatcher
                      The format matching algorithm to use. Possible values are "basic" and "best fit"; the default is "best fit". See the following paragraphs for information about the use of this property.
                      The following properties describe the date-time components to use in formatted output, and their desired representations. Implementations are required to support at least the following subsets:

                      weekday, year, month, day, hour, minute, second
                      weekday, year, month, day
                      year, month, day
                      year, month
                      month, day
                      hour, minute, second
                      hour, minute
                      Implementations may support other subsets, and requests will be negotiated against all available subset-representation combinations to find the best match. Two algorithms are available for this negotiation and selected by the formatMatcher property: A fully specified "basic" algorithm and an implementation dependent "best fit" algorithm.

                      weekday
                      The representation of the weekday. Possible values are "narrow", "short", "long".
                      era
                      The representation of the era. Possible values are "narrow", "short", "long".
                      year
                      The representation of the year. Possible values are "numeric", "2-digit".
                      month
                      The representation of the month. Possible values are "numeric", "2-digit", "narrow", "short", "long".
                      day
                      The representation of the day. Possible values are "numeric", "2-digit".
                      hour
                      The representation of the hour. Possible values are "numeric", "2-digit".
                      minute
                      The representation of the minute. Possible values are "numeric", "2-digit".
                      second
                      The representation of the second. Possible values are "numeric", "2-digit".
                      timeZoneName
                      The representation of the time zone name. Possible values are "short", "long".
                      The default value for each date-time component property is undefined, but if all component properties are undefined, then year, month, and day are assumed to be "numeric".
 */
export const formatDateTime = (locale, date, options = undefined) =>
  new Intl.DateTimeFormat(locale, options).format(date);

// - Format text -

/**
 * Generates a string from the provided message containing placeholders (according to ICU standard) and an object with variables
 * @param {string} message
 * @param {object} vars
 * @returns {string}
 */
const generateStringWithVars = (message, vars = {}) => {
  let newMessage = message;
  Object.entries(vars).forEach(([key, value]) => {
    const pattern = new RegExp(`{${key}}`, 'g');
    newMessage = newMessage.replace(pattern, value);
  });
  return newMessage;
};

/**
 * Formats a given default string or it`s translation (according to locale) and optional placeholder
 * @param {string} locale
 * @param {object} messages
 * @param {string} defaultMessage
 * @param {object} options:
 *                 {object} vars
 *                 {string} defaultLocale if provided, the defaultMessage will automatically be added to this locale
 *                 {string} description
 *                 {boolean} noWarnings
 * @returns {string}
 */
export const formatMessage = (locale, messages, defaultMessage, options = {}) => {
  // Deconstruct options
  const { vars, defaultLocale, description, noWarnings } = options;

  // Get complete string with vars
  const defaultWithVars = generateStringWithVars(defaultMessage, vars);

  // If defaultLocale is set, add defaultMessage to messages of default locale
  if (defaultLocale) {
    addNewMessage(messages, defaultLocale, defaultMessage);
  }

  // If requested locale doesn`t exist yet return default (+ warning)
  if (!messages.hasOwnProperty(locale)) {
    console.warn(
      `Warning: Displaying default message\nThere are no translations for "${
        locale
      }". Please add it to your list of locales.`
    );
    return defaultWithVars;
  }

  const messageKey = generateKeyFromString(defaultMessage);
  const existingMessage = Object.entries(messages[locale]).find(
    ([key, value]) => key === messageKey
  );

  // If message key doesn`t exist in requested locale...
  if (!existingMessage) {
    // ...and locale is default locale, returns default (no warning b/c message was already added)
    if (defaultLocale && defaultLocale === locale) return defaultWithVars;

    // ...return default (+ warning)
    console.warn(
      `Warning: Displaying default message\n"${
        defaultWithVars
      }" has not been translated to requested locale "${locale}". Please add translation.`
    );
    return defaultWithVars;
  }

  // If message key doesn`t exist in requested locale but defaultLocale is set, add to default messages and return default (no warning)
  if (!existingMessage && defaultLocale) {
  }

  // If message key exists in requested locale return message according to provided locale
  if (existingMessage) return generateStringWithVars(existingMessage[1], vars);
  // just in case
  return null;
};

// - add new text -

const addNewMessage = (messages, locale, message) => {
  console.log(messages[locale]);

  let newMessages = { ...messages };

  // If locale doesn`t exist add it (???)
  if (!messages[locale]) {
    newMessages = { ...messages, [locale]: { [generateKeyFromString(message)]: message } };
  }

  // if (messages[locale]) {
  //   const messagesOfLocale = messages[locale];
  //   const newLocale = {
  //     ...messagesOfLocale,
  //     [generateKeyFromString(message)]: message
  //   };
  //   console.info(`A new message "${message}" was added to locale "${locale}".`);
  //   return { ...messages, [locale]: newLocale };
  // }
  // console.info(`A new locale "${locale}" with message "${message}" was added.`);
  // return { ...messages, [locale]: { [generateKeyFromString(message)]: message } };
};

/**
 *
 * @param {*} message
 */
export const generateKeyFromString = message => {
  return message
    .toLowerCase()
    .replace(/{|}|\.|,|\?|\!/g, '')
    .replace(/ /g, '_');
  // TODO: add more RegEx to remove special characters
};

// --- Config ---

/**
 * Adds a config object
 * @param {object} config
 *                 currentLocale: currently selected locale (weather automatically or in the user settings) - required
 *                 dafaultLocale: if provided, default messages passed with formatMessage will automatically be added to this locale
 */
export const addConfig = ({ currentLocale, defaultLocale, noWarnings }) => null;
