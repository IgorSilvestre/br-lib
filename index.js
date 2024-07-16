import { isValidCNPJ } from "./functions/isValidCNPJ"
import { insistFetch } from "./functions/insistFetch"
import { scrapeWebsiteForContacts } from "./functions/scrapeWebsiteForContacts"
import { parseISODateToBrazilSTD } from "./functions/parseISODateToBrazilSTD"
import { regexForSearch } from "./functions/regexForSearch"
import { stringifyObjectWithRegex } from "./functions/stringifyObjectWithRegex"
import { parseObjectWithRegex } from "./functions/parseObjectWithRegex"
import { removeAccents } from "./functions/removeAccents"

export {
    isValidCNPJ,
    insistFetch,
    scrapeWebsiteForContacts,
    parseISODateToBrazilSTD,
    regexForSearch,
    stringifyObjectWithRegex,
    parseObjectWithRegex,
    removeAccents
}
