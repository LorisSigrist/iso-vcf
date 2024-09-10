import { describe, it, expect } from "vitest";
import { parse } from "../src/mod.js"

describe("parse - required properties", () => {
    it("fails if BEGIN is missing", ()=>{
        const vCard = `VERSION:4.0\r\nFN:John Doe\r\nEND:VCARD`
        expect(() => parse(vCard)).toThrow()
    })

    it("fails if END is missing", ()=>{
        const vCard = `BEGIN:VCARD\r\nFN:John Doe\r\nVERSION:4.0`
        expect(() => parse(vCard)).toThrow()
    })

    it("fails if BEGIN is used before the previous vCard has been closed", ()=>{
        // notice how there is a second BEGIN before the previous vCard has been closed
        const vCard = `BEGIN:VCARD\r\nVERSION:4.0\r\nFN:John Doe\r\nBEGIN:VCARD\r\nFN:John Doe\r\nVERSION:4.0\r\nEND:VCARD`
        expect(() => parse(vCard)).toThrow()
    })

    it("fails if END is used before a vCard has been opened", ()=>{
        const vCard = `BEGIN:VCARD\r\nVERSION:4.0\r\nEND:VCARD\r\nEND:VCARD`
        expect(() => parse(vCard)).toThrow()
    })

    it("fails if VERSION is missing", ()=>{
        const vCard = `BEGIN:VCARD\r\nFN:John Doe\r\nEND:VCARD`
        expect(() => parse(vCard)).toThrow()
    })

    it("fails if FN is missing", ()=>{
        const vCard = `BEGIN:VCARD\r\nVERSION:4.0\r\nEND:VCARD`
        expect(() => parse(vCard)).toThrow()
    })
})