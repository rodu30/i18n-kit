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
const formatDateTime = (locale, date, options = undefined) =>
  new Intl.DateTimeFormat(locale, options).format(date);

export default formatDateTime;
