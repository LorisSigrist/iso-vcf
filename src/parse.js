import { lex } from "./lex.js";

/**
 * Parse a vCard file according to the [RFC6350](https://datatracker.ietf.org/doc/html/rfc6350) specification
 *
 * @param {string} input A string containing the contents of a .vcf file. May contain one or more vCards.
 * @see https://datatracker.ietf.org/doc/html/rfc6350
 */
export function parse(input) {
  const lines = lex(input);
  const cards = groupIntoCards(lines);
}

/**
 * @param {import("./lex.js").ContentLine[]} ast
 */
function groupIntoCards(ast) {
  const cards = [];

  /** @type {import("./lex.js").ContentLine[]} */
  let currentCard = [];

  for (const line of ast) {
    currentCard.push(line);
    if (line.name === "END" && line.value.toUpperCase() === "VCARD") {
      cards.push(currentCard);
      currentCard = [];
    }
  }

  for (const card of cards) {
    if (cards[0][0].name !== "BEGIN" || cards[0][0].value.toUpperCase() !== "VCARD") {
      throw new Error("Expected BEGIN:VCARD");
    }
  }

  return cards;
}



