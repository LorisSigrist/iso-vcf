/**
 * @typedef {object} ContentLine
 * @property {string} [group]
 * @property {string} name
 * @property {[string, string][]} params
 * @property {string} value
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
  /^(?:(?<group>[a-zA-Z0-9\-]+)\.)?(?<name>[a-zA-Z0-9\-]+)(?<params>;.*)*:(?<value>.*)$/;

/**
 * Takes in an (unfolded) line and returns it's parsed representation
 *
 * @param {string} line
 * @returns {ContentLine}
 */
function lexContentLine(line) {
  const match = line.match(LINE_REGEX);
  if (!match || !match.groups) throw new Error("Could not parse line");

  const { group, name, params, value } = match.groups;

  /** @type {[string, string][]} */
  const parsedParams = [];
  if (params) {
    const entries = params.split(";").filter(Boolean);

    for (const entry of entries) {
      const [key, value] = entry.split("=");
      parsedParams.push([key, value ?? ""]);
    }
  }

  return {
    group,
    name,
    params: parsedParams,
    value,
  };
}
