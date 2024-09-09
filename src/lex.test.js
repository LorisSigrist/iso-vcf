import { describe, it ,expect} from "vitest"
import { lex } from "./lex.js"


describe("lexing", () => {
    it("lexes a simple vCard", () => {
        const file = "BEGIN:VCARD\r\nFN:John Doe\r\nEND:VCARD";
        const ast = lex(file);
        expect(ast).toEqual([
            {
                group: undefined,
                name: "BEGIN",
                params: [],
                value: "VCARD"
            },
            {
                group: undefined,
                name: "FN",
                params: [],
                value: "John Doe"
            },
            {
                group: undefined,
                name: "END",
                params: [],
                value: "VCARD"
            }
        ])
    })

    it("lexes a vCard with folded lines", () => {
        const file = "BEGIN:VCARD\r\nNote:This is a long note\r\n  that spans multiple lines.\r\nEND:VCARD";
        const ast = lex(file);
        expect(ast).toEqual([{
            group: undefined,
            name: "BEGIN",
            params: [],
            value: "VCARD"
        },
        {
            group: undefined,
            name: "Note",
            params: [],
            value: "This is a long note that spans multiple lines."
        },
        {
            group: undefined,
            name: "END",
            params: [],
            value: "VCARD"
        }])
    })

    it("lexes a vCard with params", () => {
        const file = "BEGIN:VCARD\r\nFN;SORT-STRING=John Doe:John Doe\r\nEND:VCARD";
        const ast = lex(file);
        expect(ast).toEqual([{
            group: undefined,
            name: "BEGIN",
            params: [],
            value: "VCARD"
        },
        {
            group: undefined,
            name: "FN",
            params: [["SORT-STRING", "John Doe"]],
            value: "John Doe"
        },
        {
            group: undefined,
            name: "END",
            params: [],
            value: "VCARD"
        }])
    })

});