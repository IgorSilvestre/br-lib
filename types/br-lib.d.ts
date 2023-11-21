declare module "br-lib" {
  export function insistFetch(url, retries = 3, delayMs = 1000)
  export function isValidCNPJ(cnpj: string)
  export function parseISODateToBrazilSTD(dataISO: string)
  export function regexForSearch(query: string, isFullMatch = false)
  export function scrapeWebsiteForContacts (rootUrl: string)
}