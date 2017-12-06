/**
 * Generates a new string from the provided message containing placeholders and an object with values,
 * use ICU string syntax
 * @param {string} message
 * @param {object} values variables for placeholder in message
 * @returns {string}
 */
export const format = (message, values = {}) => {
  let newMessage = message;
  Object.entries(values).forEach(([key, value]) => {
    const pattern = new RegExp(`{${key}}`, 'g');
    newMessage = newMessage.replace(pattern, value);
  });
  return newMessage;
};

/**
 * Generates a key from a message string
 * @param {string} message
 * @returns {string}
 */
export const generateKey = message => {
  // TODO: add more RegEx to remove special characters + make keys shorter (= better performance)
  return message.toLowerCase().replace(/ /g, '_');
};

/**
 * Return message if message-key can be found in messages and if message flag is not 'MISSING'
 * otherwise returns null
 * @param {string} locale
 * @param {object} messages
 * @param {string} message
 * @returns {string}
 */
export const get = (locale, messages, message) => {
  const msgKey = generateKey(message);
  const msgObj = Object.entries(messages[locale]).find(
    ([key, value]) => key === msgKey && value.message && value.flag !== 'MISSING'
  );
  if (msgObj) return msgObj[1].message;
  return null;
};

/**
 * Gets the translation for given string (or a string with placeholders variables)
 * from a translated-messages object according to provided locale
 * @param {string} locale
 * @param {object} messages
 * @param {string} message
 * @param {object} options:
 *                 disableWarnings: {boolean}  disables warnings about missing translations
 *                 messageLocale: {string}     the locale of provided message (no warning is printed if current locale is default)
 * @returns {string}
 */
export const translate = (locale, messages, message, options = {}) => {
  const { disableWarnings, messageLocale } = options;

  // If requested locale doesn't exist yet return default (+ warning)
  if (!messages[locale]) {
    if (!disableWarnings) {
      console.warn(
        `Warning: Displaying default message\nLocale "${locale}" is missing in list of locales.`
      );
    }
    return message;
  }

  // Check if message exists for current locale
  const existingMessage = get(locale, messages, message);

  // If message key doesn't exist in requested locale...
  if (!existingMessage) {
    // ...and requested locale is default locale, returns default (no warning b/c message is already in correct language)
    if (messageLocale && messageLocale === locale) return message;

    // ...return default (+ warning)
    if (!disableWarnings) {
      console.warn(
        `Warning: Displaying default message\n"${
          message
        }" has not been translated to requested locale "${locale}".`
      );
    }
    return message;
  }

  // If message key exists in requested locale return message according to provided locale
  if (existingMessage) return existingMessage;

  // just in case
  return null;
};
