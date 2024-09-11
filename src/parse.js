import { lex } from "./lex.js";

/**
 * Parse a vCard file according to the [RFC6350](https://datatracker.ietf.org/doc/html/rfc6350) specification
 *
 * @param {string} input A string containing the contents of a .vcf file. May contain one or more vCards.
 * @see https://datatracker.ietf.org/doc/html/rfc6350
 */
export function parse(input) {
  const lines = lex(input);
  const cards = parseLines(lines);
  return cards;
}

/**
 * @param {import("./lex.js").ContentLine[]} lines
 * @returns {import("./types.js").vCard[]}
 */
function parseLines(lines) {
  /** @type {import("./types.js").vCard[]} */
  const cards = [];

  /** @type {Partial<import("./types.js").vCard | undefined>} */
  let currentVCard = undefined;

  for (const line of lines) {
    if (line.name === "BEGIN") {
      if (currentVCard !== undefined)
        throw new Error("Cannot BEGIN Vcard before previous one was closed");
      if (line.value.toUpperCase() !== "VCARD")
        throw new Error("The 'BEGIN' property must have a value of 'VCARD'");

      currentVCard = {};
      continue;
    }

    // unless the line was a BEGIN there must be a current vCard
    if (!currentVCard) throw new Error("No vCard in progress");
    if (line.name === "END") {
      if (line.value.toUpperCase() !== "VCARD")
        throw new Error("The 'END' property must have a value of 'VCARD'");

      if (isCompleteVCard(currentVCard)) cards.push(currentVCard);
      else throw new Error("Incomplete vCard");

      currentVCard = undefined;
      continue;
    }

    switch (line.name) {
      case "VERSION": {
        if (line.value !== "4.0")
          throw new Error("Only vCard version 4.0 is supported");
        currentVCard.version = {
          params: {
            ...valueParameter(line.params, ["text"]),
            ...anyParameter(line.params),
          },
          value: line.value,
        };
        break;
      }

      case "N": {
        const parts = line.value.split(";");
        if (parts.length !== 5)
          throw new Error(
            "N parameter value should have 5 parts, only got " + parts.length
          );
        const [family, given, middle, prefix, suffix] = parts;

        currentVCard.n = {
          params: {
            ...valueParameter(line.params, ["text"]),
            ...languageParameter(line.params),
            ...anyParameter(line.params),
            ...sortAsParameter(line.params),
          },
          value: {
            surnames: family.split(","),
            givenNames: given.split(","),
            additionalNames: middle.split(","),
            honorificPrefixes: prefix.split(","),
            honorificSuffixes: suffix.split(","),
          }
        }

        break;
      }

      default: {
        currentVCard[line.name.toLowerCase()] = {
          params: {
            ...valueParameter(line.params, ["text"]),
            ...anyParameter(line.params),
            ...languageParameter(line.params),
            ...labelParameter(line.params),
            ...calscaleParameter(line.params),
            ...tzParameter(line.params),
            ...sortAsParameter(line.params),
          },
          value: line.value,
        };
      }
    }
  }

  // the line should have ended the vCard
  if (currentVCard) throw new Error("Incomplete vCard");
  return cards;
}

/**
 * @template {import("./types.js").ValueParameterValue} T
 *
 * @param {Record<string, string[]>} lexedParams
 * @param {T[]} allowed
 *
 * @returns {import("./types.js").ValueParameter<T>}
 */
function valueParameter(lexedParams, allowed) {
  const lexedValue = lexedParams["VALUE"];
  if (!lexedValue || lexedValue.length == 0) {
    return { value: undefined };
  }

  // there can only be one valueParameter
  if (lexedValue.length !== 1)
    throw new Error("Only one 'VALUE' parameter is allowed");

  const value = lexedValue[0];
  if (!allowed.includes(value))
    throw new Error(`'VALUE' parameter must be one of ${allowed.join(", ")}`);

  return {
    value: value,
  };
}

/**
 * @param {Record<string, string[]>} lexedParams
 * @returns {import("./types.js").AnyParameter}
 */
function anyParameter(lexedParams) {
  // any-params start with x- or X-
  /** @type {import("./types.js").AnyParameter} */
  const anyParams = {};
  for (const key in lexedParams) {
    if (key.startsWith("X-") || key.startsWith("x-")) {
      anyParams[key] = lexedParams[key];
    }
  }
  return anyParams;
}

/**
 * @param {Record<string, string[]>} lexedParams
 * @returns {import("./types.js").LanguageParameter}
 */
function languageParameter(lexedParams) {
  const language = lexedParams["LANGUAGE"];
  if (!language || language.length == 0) {
    return { language: undefined };
  }

  if (language.length !== 1)
    throw new Error("Only one 'LANGUAGE' parameter is allowed");
  return { language: language[0] };
}

/**
 * @param {Record<string, string[]>} lexedParams
 * @returns {import("./types.js").LabelParameter}
 */
function labelParameter(lexedParams) {
  const label = lexedParams["LABEL"];
  if (!label || label.length == 0) {
    return { label: undefined };
  }

  if (label.length !== 1)
    throw new Error("Only one 'LABEL' parameter is allowed");
  return { label: label[0] };
}

/**
 * @param {Record<string, string[]>} lexedParams
 * @returns {import("./types.js").CalscaleParameter}
 */
function calscaleParameter(lexedParams) {
  const calscale = lexedParams["CALSCALE"];
  if (!calscale || calscale.length == 0) {
    return { calscale: undefined };
  }

  if (calscale.length !== 1)
    throw new Error("Only one 'CALSCALE' parameter is allowed");
  const value = calscale[0];

  if (
    value !== "gregorian" &&
    !value.startsWith("x-") &&
    !value.startsWith("X-")
  ) {
    throw new Error(
      "CALSCALE parameter must be 'gregorian' or start with 'x-' or 'X-'"
    );
  }

  return { calscale: value };
}

/**
 * @param { Record<string, string[]>} lexedParams
 * @returns {import("./types.js").TZParameter}
 */
function tzParameter(lexedParams) {
  const tz = lexedParams["TZ"];
  if (!tz || tz.length == 0) {
    return { tz: undefined };
  }

  if (tz.length !== 1) throw new Error("Only one 'TZ' parameter is allowed");
  return { tz: tz[0] };
}

/**
 * 
 * @param {Record<string, string[]>} lexedParams
 * @returns {import("./types.js").SortAsParameter}
 */
function sortAsParameter(lexedParams) {
  return {
    sortAs: lexedParams["SORT-AS"]?.join(""),
  }
}

/**
 * Checks if a partial vCard has all the required properties
 *
 * @param {Partial<import("./types.js").vCard>} vCard
 * @return {vCard is import("./types.js").vCard}
 */
function isCompleteVCard(vCard) {
  const requiredProperties = ["fn", "version"];
  const complete = requiredProperties.every(
    (prop) => vCard[prop] !== undefined
  );
  return complete;
}
