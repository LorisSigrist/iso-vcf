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
      if(currentVCard !== undefined) throw new Error("Cannot BEGIN Vcard before previous one was closed");
      if (line.value.toUpperCase() !== "VCARD")
        throw new Error("The 'BEGIN' property must have a value of 'VCARD'");

      currentVCard = {};
      continue;
    }

    // unless the line was a BEGIN there must be a current vCard
    if(!currentVCard) throw new Error("No vCard in progress");
    if (line.name === "END") {
      if (line.value.toUpperCase() !== "VCARD")
        throw new Error("The 'END' property must have a value of 'VCARD'");

      if (isCompleteVCard(currentVCard)) cards.push(currentVCard);
      else throw new Error("Incomplete vCard");

      currentVCard = undefined;
      continue;
    }

    switch (line.name) {
      case "FN": {
        currentVCard.fn = {
          params: {},
          value: line.value,
        };
        break;
      }
      case "VERSION": {
        if(line.value !== "4.0") throw new Error("Only vCard version 4.0 is supported");
        currentVCard.version = {
          params: {},
          value: line.value,
        };
        break;
      }

      case "N": {

      }
    }
  }

  // the line should have ended the vCard
  if(currentVCard) throw new Error("Incomplete vCard");
  return cards;
}


/**
 * Checks if a partial vCard has all the required properties
 * 
 * @param {Partial<import("./types.js").vCard>} vCard
 * @return {vCard is import("./types.js").vCard}
 */
function isCompleteVCard(vCard) {
  const requiredProperties = ["fn", "version"];
  const complete = requiredProperties.every(prop => vCard[prop] !== undefined);
  return complete;
}
