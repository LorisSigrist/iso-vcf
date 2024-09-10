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

  it("parses the n property", ()=>{
    const vCard = `BEGIN:VCARD\r\nVERSION:4.0\r\nFN:John Stevenson\r\nN:Stevenson;John;Philip,Paul;Dr.;Jr.,M.D.,A.C.P.\r\nEND:VCARD`;
    const parsed = parse(vCard);
    expect(parsed).toEqual([
      {
        fn: { params: {}, value: "John Stevenson" },
        n: {
          params: {},
          value: {
            
          },
        },
        version: { params: {}, value: "4.0" },
      }
    ])
  })
});
