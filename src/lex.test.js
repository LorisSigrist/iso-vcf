import { describe, it, expect } from "vitest";
import { lex } from "./lex.js";

describe("lexing", () => {
  it("lexes a simple vCard", () => {
    const file = "BEGIN:VCARD\r\nFN:John Doe\r\nEND:VCARD";
    const ast = lex(file);
    expect(ast).toEqual([
      {
        group: undefined,
        name: "BEGIN",
        params: {},
        value: "VCARD",
      },
      {
        group: undefined,
        name: "FN",
        params: {},
        value: "John Doe",
      },
      {
        group: undefined,
        name: "END",
        params: {},
        value: "VCARD",
      },
    ]);
  });

  it("lexes a vCard with folded lines", () => {
    const file =
      "BEGIN:VCARD\r\nNote:This is a long note\r\n  that spans multiple lines.\r\nEND:VCARD";
    const ast = lex(file);
    expect(ast).toEqual([
      {
        group: undefined,
        name: "BEGIN",
        params: {},
        value: "VCARD",
      },
      {
        group: undefined,
        name: "NOTE",
        params: {},
        value: "This is a long note that spans multiple lines.",
      },
      {
        group: undefined,
        name: "END",
        params: {},
        value: "VCARD",
      },
    ]);
  });

  it("lexes a vCard with params", () => {
    const file = "BEGIN:VCARD\r\nFN;SORT-STRING=John Doe:John Doe\r\nEND:VCARD";
    const ast = lex(file);
    expect(ast).toEqual([
      {
        group: undefined,
        name: "BEGIN",
        params: {},
        value: "VCARD",
      },
      {
        group: undefined,
        name: "FN",
        params: { "SORT-STRING": ["John Doe"] },
        value: "John Doe",
      },
      {
        group: undefined,
        name: "END",
        params: {},
        value: "VCARD",
      },
    ]);
  });

  it("normalizes property names to uppercase", () => {
    const file = "begin:vcard\r\nfn:John Doe\r\nend:vcard";
    const ast = lex(file);
    expect(ast).toEqual([
      {
        group: undefined,
        name: "BEGIN",
        params: {},
        value: "vcard",
      },
      {
        group: undefined,
        name: "FN",
        params: {},
        value: "John Doe",
      },
      {
        group: undefined,
        name: "END",
        params: {},
        value: "vcard",
      },
    ]);
  });

  it("can read params with multiple values", () => {
    const card = `BEGIN:VCARD\r\nTEL;TYPE=cell,voice,work;VALUE=uri:tel:+1234567890\r\nEND:VCARD`;
    const ast = lex(card);
    expect(ast).toEqual([
      {
        group: undefined,
        name: "BEGIN",
        params: {},
        value: "VCARD",
      },
      {
        group: undefined,
        name: "TEL",
        params: {
          TYPE: ["cell", "voice", "work"],
          VALUE: ["uri"],
        },
        value: "tel:+1234567890",
      },
      {
        group: undefined,
        name: "END",
        params: {},
        value: "VCARD",
      }]);
    });
});
