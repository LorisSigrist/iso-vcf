/**
 * @typedef {object} ContentLine
 * @property {string} [group] optionally the property's group (rarely used feature)
 * @property {string} name The normalized-uppercase name of the property (names are case-insensitive according to the spec)
 * @property {Record<string, string[]>} params Key-value[] pairs
 * @property {string} value The raw string of the property's value
 */

/**
 * Lex a string containing a .vcf file into a structured representation of each line
 *
 * This does NOT enforce any semantics, so missing porperties or invalid values will not produce an error.
 *
 * @param {string} input
 * @returns {ContentLine[]}
 */
export function lex(input) {
  const normalized = unfoldLines(input);
  const withoutEmptyLines = removeEmptyLines(normalized);
  const lines = withoutEmptyLines.split("\r\n");
  return lines.map(lexContentLine);
}

/**
 * Long lines in .vcf files may be split accross multiple lines by starting a new line with an HTAB (U+0009) or SPACE (U+0020).
 * This function will unfold long lines onto a single line, so that each `contentline` is it's own line.
 *
 * NOTE: By convention a line is folded if it takes more than 75 bytes, although this is not a rule.
 *
 * @example
 * ```txt
 * NOTE:This is a long description
 *  that exists on a long line.
 * FN:John Doe
 * ```
 *
 * @param {string} input
 * @returns {string}
 */
function unfoldLines(input) {
  // Replace CLRF followed by an HTAB or SPACE with nothing
  return input.replaceAll(/\r\n[\x20\x09]/g, "");
}

/**
 * Some implementations of .vcf files may contain empty lines, even though that's not specced.
 *
 * @param {string} input
 */
function removeEmptyLines(input) {
  const lines = input.split("\r\n");
  const filtered = lines.filter((line) => line.trim() !== "");
  return filtered.join("\r\n");
}

const LINE_REGEX =
  /^(?:(?<group>[a-zA-Z0-9\-]+)\.)?(?<name>[a-zA-Z0-9\-]+)(?<params>;[^:]*)*:(?<value>.*)$/;

/**
 * Takes in an (unfolded) line and returns it's parsed representation
 *
 * @param {string} line
 * @returns {ContentLine}
 */
function lexContentLine(line) {
  const match = line.match(LINE_REGEX);
  if (!match || !match.groups) throw new Error("Could not parse line: " + line);

  const { group, name, params, value } = match.groups;
  const paramEntries = params ? params.split(";").filter(Boolean) : [];
  const parsedParams = paramEntries.reduce(accumulateParams, {});

  return {
    group,
    name: name.toUpperCase(),
    params: parsedParams,
    value,
  };
}

/**
 * Parses an escaped property value into an array of unescaped strings.
 *
 * Escaped values:
 * - "," must be escaped with a backslash. If it isn't it will be used to split the value into multiple strings
 * - "\" must be escaped with another backslash
 *
 * @param {string} raw
 * @returns {string[]}
 */
function parsePropertyValue(raw) {
  const parts = raw.split("\\");
  for (const part of parts) {
    // if the part contains an unescaped , or ; split at it.
  }
}

/**
 * @param {Record<string, string[]>} existingParams
 * @param {string} param
 * @returns
 */
function accumulateParams(existingParams, param) {
  let [paramName, paramValue] = param.split("=");

  if (paramValue == null || paramValue === "") {
    paramValue = paramName;
    paramName = "type";
  }

  if (paramName.toLowerCase() === "type") {
    // remove quotes - THIS IS NOT SPEC COMPLIANT
    if (
      paramValue[0] === '"' &&
      paramValue[paramValue.length - 1] === '"' &&
      paramValue.indexOf(",") !== -1
    ) {
      paramValue = paramValue.slice(1, -1);
    }

    paramValue
      .toLowerCase()
      .split(",")
      .forEach(function (value) {
        set(existingParams, paramName, value);
      });

    return existingParams;
  }

  set(existingParams, paramName, paramValue);
  return existingParams;
}

/**
 * Updates the params. If there are already params with the same name it will add the value to the list
 *
 * @param {Record<string, string[]>} object
 * @param {string} key
 * @param {string} value
 */
function set(object, key, value) {
  const existingValues = object[key];
  if (existingValues) {
    existingValues.push(value);
  } else {
    object[key] = [value];
  }
}
