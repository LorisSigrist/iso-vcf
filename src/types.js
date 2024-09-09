export const supportedVersions = /** @type {const} */ ["4.0"];

// Utility Types

/**
 * @typedef {`${"x"|"X"}-${string}`} xName x- or X- string representing non-standard properties
 */

/**
 * @template T
 * @typedef {[T, ...T[]]} NonemptyArray;
 */

// Property Value Data Types https://datatracker.ietf.org/doc/html/rfc6350#section-4

/**
 * @template {string} [T=string]
 * @typedef {T} TextValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-4.1
 */

/**
 * @typedef {string} URIValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-4.2
 */

// TODO: Use the Temporal API for the time-related types

/**
 * @typedef {string} DateValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-4.3.1
 */

/**
 * @typedef {string} TimeValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-4.3.2
 */

/**
 * @typedef {string} DateTimeValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-4.3.3
 */

/**
 * @typedef {string} DateAndOrTimeValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-4.3.4
 */

/**
 * @typedef {string} TimestampValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-4.3.5
 */

/**
 * @typedef {boolean} BooleanValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-4.4
 */

/**
 * @typedef {number} IntegerValue
 */

/**
 * @typedef {string} UTCOffsetValue
 */

/**
 * @typedef {string} LanguageTagValue
 */

// Property Parameters https://datatracker.ietf.org/doc/html/rfc6350#section-5

/**
 *
 * The LANGUAGE property parameter is used to identify data in multiple
 * languages. There is no concept of "default" language, except as
 * specified by any "Content-Language" MIME header parameter that is
 * present RFC3282. The value of the LANGUAGE property parameter is a
 * language tag as defined in Section 2 of [RFC5646](https://datatracker.ietf.org/doc/html/rfc5646#section-2).
 *
 * @typedef {string} LanguageParameterValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.1
 */

/**
 * The VALUE parameter is OPTIONAL, used to identify the value type
 * (data type) and format of the value. The use of these predefined
 * formats is encouraged even if the value parameter is not explicitly
 * used. By defining a standard set of value types and their formats,
 * existing parsing and processing code can be leveraged.
 *
 * The predefined data type values MUST NOT be repeated in COMMA-separated
 * value lists except within the N, NICKNAME, ADR, and CATEGORIES
 * properties.
 *
 * @typedef {"text" | "uri" | "date" | "time" | "date-time" | "date-and-or-time" |"timestamp" | "boolean" | "integer" | "float" | "utc-offset" | "language-tag" | xName} ValueParameterValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.2
 */

/**
 *
 * The PREF parameter is OPTIONAL and is used to indicate that the
 * corresponding instance of a property is preferred by the vCard
 * author.  Its value MUST be an integer between 1 and 100 that
 * quantifies the level of preference.  Lower values correspond to a
 * higher level of preference, with 1 being most preferred.
 *
 * When the parameter is absent, the default MUST be to interpret the
 * property instance as being least preferred.
 *
 * > Note that the value of this parameter is to be interpreted only in
 *  relation to values assigned to other instances of the same property
 *  in the same vCard.  A given value, or the absence of a value, MUST
 *  NOT be interpreted on its own.
 *
 *  This parameter MAY be applied to any property that allows multiple
 *  instances.
 *
 * @typedef {IntegerValue} PrefParameterValue An integer between 1 and 100.
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.3
 */

/**
 * The ALTID parameter is used to "tag" property instances as being
 * alternative representations of the same logical property.  For
 * example, translations of a property in multiple languages generates
 * multiple property instances having different LANGUAGE (Section 5.1)
 * parameter that are tagged with the same ALTID value.
 *
 * This parameter's value is treated as an opaque string.  Its sole
 * purpose is to be compared for equality against other ALTID parameter
 * values.
 *
 * @typedef {string} AltIDParameterValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.4
 */

/**
 * @typedef {string} PIDParameterValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.5
 */

/**
 * @typedef {"work"|"home"|xName} TypeParameterValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.6
 */

/**
 * @typedef {TypeParameterValue | "text" | "voice" | "fax" | "cell" | "video" | "pager" | "textphone" } TelTypeParameterValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.6
 */

/**
 * @typedef {"contact" | "acquaintance" | "friend" | "met" | "co-worker" | "colleague" | "co-resident" | "neighbor" | "child" | "parent" | "sibling" | "spouse" | "kin" | "muse" | "crush" | "date" | "sweetheart" | "me" | "agent" | "emergency"} RelatedTypeParameterValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.6
 */

/**
 * @typedef {string} MediaTypeParameterValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.7
 */

/**
 * @typedef {"gregorian" | xName} CalscaleParameterValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.8
 */

/**
 * @typedef {string} SortAsParameterValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.9
 */

/**
 * @typedef {string} GeoPropertyValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.10
 */

/**
 * @typedef {string} TZPropertyValue
 * @see https://datatracker.ietf.org/doc/html/rfc6350#section-5.11
 */

// Property Parameter Values

/**
 * @typedef {{ [key: xName]: string }} AnyParameter
 */

/**
 * @template {ValueParameterValue} T
 * @typedef {{ value?: T }} ValueParameter
 */

/**
 * @typedef {{ pid?: PIDParameterValue }} PIDParameter
 */

/**
 * @typedef {{ altid?: AltIDParameterValue }} AltIDParameter
 */

/**
 * @typedef {{ pref?: PrefParameterValue }} PrefParameter
 */

/**
 * @typedef {{ type?: TypeParameterValue  }} TypeParameter
 */

/**
 * @typedef {{ type?: TelTypeParameterValue }} TelTypeParameter
 */

/**
 * @typedef {{ type?: (RelatedTypeParameterValue)[] }} RelatedTypeParameter
 */

/**
 * @typedef {{ mediaType?: MediaTypeParameterValue }} MediaTypeParameter
 */

/**
 * @typedef {{ calscale?: CalscaleParameterValue }} CalscaleParameter
 */

/**
 * @typedef {{ language?: LanguageParameterValue }} LanguageParameter
 */

/**
 * @typedef {{ sortAs?: SortAsParameterValue }} SortAsParameter
 */

/**
 * @typedef {{ label?: string }} LabelParameter
 */

/**
 * @typedef {{ geo?: GeoPropertyValue }} GeoParameter
 */

/**
 * @typedef {{ tz?: TZPropertyValue }} TZParameter
 */

// vCard Properties https://datatracker.ietf.org/doc/html/rfc6350#section-6

/**
 * @typedef {object} vCardProperty
 * @property {[string, string][]} group
 * @property {string} value
 */

/**
 * @typedef {object} VersionProperty
 * @property {TextValue<"4.0">} value
 * @property {AnyParameter & ValueParameter<"text">} params
 */

/**
 * @typedef {object} SourceProperty
 * @property {URIValue} value
 * @property {AnyParameter & ValueParameter<"text"> & PIDParameter & PrefParameter & AltIDParameter & MediaTypeParameter} params
 */

/**
 * @typedef {object} KindProperty
 * @property {TextValue<"individual" | "group" | "org" | "location" | xName>} value
 * @property {AnyParameter & ValueParameter<"text">} params
 */

/**
 * @typedef {object} XMLProperty
 * @property {TextValue} value
 * @property {AltIDParameter & ValueParameter<"text">} params
 */

// Identification Properties

/**
 * @typedef {object} FNProperty
 * @property {TextValue} value
 * @property {ValueParameter<"text"> & TypeParameter & LanguageParameter & AltIDParameter & PIDParameter & PrefParameter & AnyParameter} params
 */

/**
 * @typedef {object} NProperty
 * @property {{ surnames: string[], givenNames: string[], additionalNames: string[], honorificPrefixes: string[], honorificSuffixes: string[] }} value
 * @property {ValueParameter<"text"> & SortAsParameter & LanguageParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} NicknameProperty
 * @property {NonemptyArray<TextValue>} value
 * @property {ValueParameter<"text"> & TypeParameter & LanguageParameter & AltIDParameter & PIDParameter & PrefParameter & AnyParameter} params
 */

/**
 * @typedef {object} PhotoProperty
 * @property {URIValue} value
 * @property {ValueParameter<"uri"> & AltIDParameter & TypeParameter & MediaTypeParameter & PrefParameter & PIDParameter & AnyParameter} params
 */

/**
 * @template {"text" | "date-and-or-time"} [T="date-and-or-time"]
 *
 * @typedef {object} BdayProperty
 * @property {T extends "text" ? TextValue: DateAndOrTimeValue} value
 * @property {AltIDParameter & CalscaleParameter & AnyParameter & (T extends "text" ? Required<ValueParameter<T>> & LanguageParameter : ValueParameter<T> )} params
 */

/**
 * @template {"text" | "date-and-or-time"} [T="date-and-or-time"]
 *
 * @typedef {object} AnniversaryProperty
 * @property {T extends "text" ? TextValue: DateAndOrTimeValue} value
 * @property {T extends "text" ? Required<ValueParameter<T>> : ValueParameter<T> & AltIDParameter & CalscaleParameter & AnyParameter} params
 */

/**
 * @typedef {object} GenderProperty
 * @property {{ sex?: "M" | "F" | "O" | "N" | "U", identity?: string}} value
 * @property {ValueParameter<"text"> & AnyParameter} params
 */

// Delivery Address Properties

/**
 * @typedef {object} ADRProperty
 * @property {{ postOfficeBox?: string, extendedAddress?: string, streetAddress?: string, locality?: string, region?: string, postalCode?: string, countryName?: string}} value
 * @property {ValueParameter<"text"> & LabelParameter & LanguageParameter & GeoParameter & TZParameter & AltIDParameter & PIDParameter & PrefParameter & TypeParameter & AnyParameter} params
 */

// Communications Properties

/**
 * @template {"text" | "uri"} [T="text"] Recommended: URI
 *
 * @typedef {object} TelProperty
 * @property {T extends "text" ? TextValue: URIValue} value
 * @property {(T extends "uri" ? MediaTypeParameter & Required<ValueParameter<T>> : ValueParameter<T>) & TelTypeParameter & PIDParameter & PrefParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} EmailProperty
 * @property {TextValue} value
 * @property {ValueParameter<"text"> & PIDParameter & PrefParameter & TypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} ImppProperty
 * @property {URIValue} value
 * @property {ValueParameter<"uri"> & PIDParameter & PrefParameter & TypeParameter & MediaTypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} LangProperty
 * @property {LanguageTagValue} value
 * @property {ValueParameter<"language-tag"> & PIDParameter & PrefParameter & AltIDParameter & TypeParameter & AnyParameter} params
 */

// Geographical Properties

/**
 * @template {"text" | "uri" | "utc-offset"} [T="text"]
 *
 * @typedef {object} TzProperty
 * @property {T extends "text" ? TextValue: T extends "utc-offset" ? UTCOffsetValue : URIValue} value
 * @property {ValueParameter<T> & AltIDParameter & PIDParameter & PrefParameter & TypeParameter & MediaTypeParameter & AnyParameter} params
 */

/**
 * @typedef {object} GeoProperty
 * @property {URIValue} value
 * @property {ValueParameter<"uri"> &  PIDParameter & PrefParameter & TypeParameter & MediaTypeParameter & AltIDParameter & AnyParameter} params
 */

// Organisational Properties

/**
 * @typedef {object} TitleProperty
 * @property {TextValue} value
 * @property {ValueParameter<"text"> & LanguageParameter & AltIDParameter & PIDParameter & PrefParameter & TypeParameter & AnyParameter} params
 */

/**
 * @typedef {object} RoleProperty
 * @property {TextValue} value
 * @property {ValueParameter<"text"> & LanguageParameter & PIDParameter & PrefParameter & TypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} LogoProperty
 * @property {URIValue} value
 * @property {ValueParameter<"uri"> & LanguageParameter & PIDParameter & PrefParameter & TypeParameter & MediaTypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} OrgProperty
 * @property {TextValue} value
 * @property {ValueParameter<"text"> & SortAsParameter & LanguageParameter & LanguageParameter & PIDParameter & PrefParameter & AltIDParameter & TypeParameter & AnyParameter} params
 */

/**
 * @typedef {object} MemberProperty
 * @property {URIValue} value
 * @property {ValueParameter<"uri"> & PIDParameter & PrefParameter & AltIDParameter & MediaTypeParameter & AnyParameter} params
 */

/**
 * @template {"uri" | "text"} [T="uri"]
 *
 * @typedef {object} RelatedProperty
 * @property {T extends "text" ? TextValue: URIValue} value
 * @property {(T extends "text" ? Required<ValueParameter<T>> & LanguageParameter : ValueParameter<T> & MediaTypeParameter) & PIDParameter & PrefParameter & AltIDParameter &  TypeParameter & AnyParameter} params
 */

// Explanatory Properties

/**
 * @typedef {object} CategoriesPropery
 * @property {TextValue[]} value
 * @property {ValueParameter<"text"> & PIDParameter & PrefParameter & TypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} NoteProperty
 * @property {TextValue} value
 * @property {ValueParameter<"text"> & LanguageParameter & PIDParameter & PrefParameter & TypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} ProdIdProperty
 * @property {TextValue} value
 * @property {ValueParameter<"text"> & AnyParameter} params
 */

/**
 * @typedef {object} RevProperty
 * @property {TimestampValue} value
 * @property {ValueParameter<"timestamp"> & AnyParameter} params
 */

/**
 * @typedef {object} SoundProperty
 * @property {URIValue} value
 * @property {ValueParameter<"uri"> & LanguageParameter & PIDParameter & PrefParameter & TypeParameter & MediaTypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @template {"uri" | "text"} [T="uri"]
 *
 * @typedef {object} UIDProperty
 * @property {T extends "text" ? TextValue: URIValue} value
 * @property {(T extends "text" ? Required<ValueParameter<T>> : ValueParameter<T>) & AnyParameter} params
 */

/**
 * @typedef {object} ClientPIDMapProperty
 * @property {{ pid: IntegerValue, uri?: URIValue }} value A semicolon-separated pair of values.  The first field is a small integer corresponding to the second field of a PID parameter instance
 * @property {AnyParameter} params
 */

/**
 * @typedef {object} URLProperty
 * @property {URIValue} value
 * @property {ValueParameter<"uri"> & PIDParameter & PrefParameter & TypeParameter & MediaTypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @template {"uri" | "text"} [T="uri"]
 *
 * @typedef {object} KeyProperty
 * @property {T extends "text" ? TextValue: URIValue} value
 * @property {(T extends "text" ? Required<ValueParameter<T>> : ValueParameter<T> & MediaTypeParameter) & AltIDParameter & PIDParameter & PrefParameter & TypeParameter & AnyParameter} params
 */

/**
 * @typedef {object} FBUrlProperty
 * @property {URIValue} value
 * @property {ValueParameter<"uri"> & PIDParameter & PrefParameter & TypeParameter & MediaTypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} CalAdrUriProperty
 * @property {URIValue} value
 * @property {ValueParameter<"uri"> & PIDParameter & PrefParameter & TypeParameter & MediaTypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} CalUriProperty
 * @property {URIValue} value
 * @property {ValueParameter<"uri"> & PIDParameter & PrefParameter & TypeParameter & MediaTypeParameter & AltIDParameter & AnyParameter} params
 */

/**
 * @typedef {object} vCard Represents a vCard object
 *
 * @property {SourceProperty[]} [source]
 * @property {KindProperty} [kind] Specifies the kind of object this vCard represents
 * @property {XMLProperty[]} [xml] XML content associated with the vCard
 *
 * @property {FNProperty} fn Formatted name
 * @property {NProperty} [n] Structude name
 * @property {NicknameProperty[]} [nickname] Specify the text corresponding to the nickname of the object the vCard represents.
 * @property {PhotoProperty[]} [photo] URIs to photos that correspond to the object the vCard represents
 * @property {BdayProperty} [bday] Specify the birth date of the object the vCard represents
 * @property {AnniversaryProperty} [anniversary] The date of marriage, or equivalent, of the object the vCard represents
 * @property {GenderProperty} [gender] The gender of the object the vCard represents
 *
 * @property {ADRProperty[]} [adr] Delivery address
 *
 * @property {TelProperty[]} [tel] Telephone numbers
 * @property {EmailProperty[]} [email]
 * @property {ImppProperty[]} [impp] the URI for instant messaging and presence protocol communications
 * @property {LangProperty[]} [lang] The language(s) that may be used for contacting the entity associated with the vCard.
 *
 * @property {TzProperty[]} [tz] The time zone(s)
 * @property {GeoProperty[]} [geo] The geographic coordinates associated with the object the vCard represents
 *
 * @property {TitleProperty[]} [title]
 * @property {RoleProperty[]} [role]
 * @property {LogoProperty[]} [logo]
 * @property {OrgProperty[]} [org]
 * @property {MemberProperty[]} [member]
 * @property {RelatedProperty[]} [related]
 *
 * @property {CategoriesPropery[]} [categories] Application category information about the vCard, aka. "tags"
 * @property {NoteProperty[]} [note] Supplemental information or a comment
 * @property {ProdIdProperty} [prodid] The identifier for the product (software) that created the vCard object
 * @property {RevProperty} [rev] The date and time that the vCard was last revised
 * @property {SoundProperty[]} [sound] A sound file that corresponds to the object the vCard represents. Often used for pronunciation
 * @property {UIDProperty} [uid] A globally unique identifier for the object the vCard represents
 * @property {ClientPIDMapProperty[]} [clientpidmap] Give a global meaning to a local PID source identifier
 * @property {URLProperty[]} [url] A URL that corresponds to the object the vCard represents. Often includes personal websites and social-media profiles
 * @property {VersionProperty} version The version of the vCard specification used to format this vCard.
 *
 * @property {KeyProperty[]} [key] A public key or authentication certificate
 *
 * @property {FBUrlProperty[]} [fburl] Free/Busy URL
 * @property {CalAdrUriProperty[]} [caladruri] The calendar user address to which a scheduling request should be sent for the object represented by the vCard.
 * @property {CalUriProperty[]} [caluri] The URI for a calendar associated with the object represented by the vCard.
 *
 * Extended Properties and Parameters
 */
