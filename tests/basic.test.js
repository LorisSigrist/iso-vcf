import { describe, it, expect } from "vitest";
import { parse } from "../src/mod.js";

describe("parse - basic", () => {
  it("parses a card containing only the required properties", () => {
    const vCard = `BEGIN:VCARD\r\nVERSION:4.0\r\nFN:John Doe\r\nEND:VCARD`;
    const parsed = parse(vCard);

    expect(parsed).toEqual([
      {
        fn: { params: {}, value: "John Doe" },
        version: { params: {}, value: "4.0" },
      },
    ]);
  });

  it("parses the n property", () => {
    const vCard = `BEGIN:VCARD\r\nVERSION:4.0\r\nFN:John Stevenson\r\nN:Stevenson;John;Philip,Paul;Dr.;Jr.,M.D.,A.C.P.\r\nEND:VCARD`;
    const parsed = parse(vCard);

    /** @type {import("../src/types.js").vCard} */
    const expected = {
      fn: { params: {}, value: "John Stevenson" },
      n: {
        params: {},
        value: {
          surnames: ["Stevenson"],
          givenNames: ["John"],
          additionalNames: ["Philip", "Paul"],
          honorificPrefixes: ["Dr."],
          honorificSuffixes: ["Jr.", "M.D.", "A.C.P."],
        },
      },
      version: { params: {}, value: "4.0" },
    };

    expect(parsed).toEqual([expected]);
  });

  it("parses the gender property", () => {
    const vCard = `BEGIN:VCARD\r\nVERSION:4.0\r\nFN:John Doe\r\nGENDER:M;Man\r\nEND:VCARD`;
    const parsed = parse(vCard);

    /** @type {import("../src/types.js").vCard} */
    const expected = {
      fn: { params: {}, value: "John Doe" },
      gender: { params: {}, value: { sex: "M", identity: "Man" } },
      version: { params: {}, value: "4.0" },
    };

    expect(parsed).toEqual([expected]);
  });

  it("parses the ADR property", () => {
    const vCard =
      "BEGIN:VCARD\r\nVERSION:4.0\r\nFN:John Doe\r\nADR:;;123 Main Street;Any Town;CA;91921-1234;U.S.A.\r\nEND:VCARD";
    const parsed = parse(vCard);

    expect(parsed).toEqual([
      {
        adr: [
          {
            params: {},
            value: {
              countryName: "U.S.A.",
              extendedAddress: "",
              locality: "Any Town",
              postOfficeBox: "",
              postalCode: "91921-1234",
              region: "CA",
              streetAddress: "123 Main Street",
            },
          },
        ],
        fn: {
          params: {},
          value: "John Doe",
        },
        version: {
          params: {},
          value: "4.0",
        },
      },
    ]);
  });
});
