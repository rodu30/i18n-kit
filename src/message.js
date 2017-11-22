// --- Helper for formatting and adding messages ---

/**
 * Adds new message and new locale (if necessary) to a given message object
 * @param {object} messages
 * @param {string} locale
 * @param {string} message
 * @param {string} description ???
 */
const addNewMessage = (messages, locale, message, description) => {
  // New message key
  const newKey = generateKeyFromString(message);

  // Clone messages
  let newMessages = { ...messages };

  // If locale doesn't exist, add it (?)
  if (!messages[locale]) {
    newMessages[locale] = locale;
    console.info(`A new locale "${locale}" was added.`);
  }

  // If message key already exists for locale and value is identical, do nothing, if not identical log error
  if (messages[locale][newKey] && messages[locale][newKey] !== message) {
    console.error(`Error: Message key "${newKey}" already exists`);
  }

  // If message key doesn't exist for locale, add it
  if (!messages[locale][newKey]) {
    newMessages[locale][newKey] = message;
    console.info(`A new message "${message}" was added to locale "${locale}".`);
  }
};

/**
 * Generates a key from a given message
 * @param {string} message
 */
export const generateKeyFromString = message => {
  return message
    .toLowerCase()
    .replace(/{|}|\.|,|\?|\!/g, '')
    .replace(/ /g, '_');
  // TODO: add more RegEx to remove special characters
};

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

// --- Format text ---

/**
 * Formats a given default string or it`s translation (according to locale) and optional placeholder
 * @param {string} locale
 * @param {object} messages
 * @param {string} defaultMessage
 * @param {object} options:
 *                 {object} vars variables for placeholder in defaultMessage
 *                 {string} defaultLocale if provided, the defaultMessage will automatically be added to this locale
 *                 {string} description
 *                 {boolean} noWarnings
 * @returns {string}
 */
const formatMessage = (locale, messages, defaultMessage, options = {}) => {
  // Deconstruct options
  const { vars, defaultLocale, description, noWarnings } = options;

  // Get complete string with vars
  const defaultWithVars = generateStringWithVars(defaultMessage, vars);

  // If defaultLocale is set, add defaultMessage to messages of default locale
  if (defaultLocale) {
    addNewMessage(messages, defaultLocale, defaultMessage, description);
  }

  // If requested locale doesn't exist yet return default (+ warning)
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

  // If message key doesn't exist in requested locale...
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

  // If message key doesn't exist in requested locale but defaultLocale is set, add to default messages and return default (no warning)
  if (!existingMessage && defaultLocale) {
  }

  // If message key exists in requested locale return message according to provided locale
  if (existingMessage) return generateStringWithVars(existingMessage[1], vars);
  // just in case
  return null;
};

export default formatMessage;
