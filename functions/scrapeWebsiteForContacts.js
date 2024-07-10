// scraper.js
import * as cheerio from 'cheerio';
import { insistFetch } from './insistFetch';

/**
 * Recursively scrapes a website starting from a given URL. It extracts phone numbers and emails,
 * and follows links within the same domain to continue scraping.
 * 
 * @param {string} urlToScrape - The URL of the website to start scraping from.
 * @param {string} domain - The domain of the website to limit the scraping to.
 * @param {Set<string>} visitedUrls - A Set to keep track of visited URLs to avoid duplicates.
 * @param {string[]} allPhoneNumbers - An array to store extracted phone numbers.
 * @param {string[]} allEmails - An array to store extracted email addresses.
 * @returns {Promise<void>} - A Promise that resolves when scraping of the website is complete.
 * @throws {Error} - Throws an error if there is an issue during scraping.
 */
async function scrapeWebsite(urlToScrape, domain, visitedUrls, allPhoneNumbers, allEmails) {
  if (!visitedUrls.has(urlToScrape)) {
    console.log('Scraping:', urlToScrape);
    visitedUrls.add(urlToScrape);
    try {
      const response = await insistFetch(urlToScrape);
      const html = response.data;
      const $ = cheerio.load(html);

      // Extract phone numbers and emails from the current page
      const phoneRegex = new RegExp(/(?:\+\d{2}\s?)?\(?\d{2}\)?\s?\d?\s?\d{4}-\d{4}/g);
      const emailRegex = /\b[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}\b/g;

      const phoneNumbersOnPage = $('body').text().match(phoneRegex);
      const emailsOnPage = $('body').text().match(emailRegex);

      if (phoneNumbersOnPage) allPhoneNumbers.push(...phoneNumbersOnPage);
      if (emailsOnPage) allEmails.push(...emailsOnPage);

      // Find and scrape links within the current page
      const linkedUrls = [];
      $('a').each((_, element) => {
        const linkedUrl = $(element).attr('href');
        if (linkedUrl) {
          const absoluteUrl = new URL(linkedUrl, urlToScrape).href;
          if (new URL(absoluteUrl).hostname === domain) {
            // Add linked URLs to the array
            linkedUrls.push(absoluteUrl);
          }
        }
      });

      // Recursively scrape linked pages
      const scrapingPromises = linkedUrls.map(link => scrapeWebsite(link, domain, visitedUrls, allPhoneNumbers, allEmails));
      return Promise.all(scrapingPromises);
    } catch (error) {
      console.error('An error occurred while scraping', urlToScrape, error);
    }
  }
}

/**
 * Initiates the scraping process on a given website URL and collects contact information.
 * It extracts and returns all unique phone numbers and email addresses found on the site.
 * 
 * @param {string} rootUrl - The root URL of the website to start scraping from.
 * @returns {Promise<{phoneNumbers: string[], emails: string[]}>} - A Promise that resolves to an object containing arrays of phone numbers and emails.
 */
async function scrapeWebsiteForContacts (rootUrl) {
  const domain = new URL(rootUrl).hostname;
  const visitedUrls = new Set();
  const allPhoneNumbers = [];
  const allEmails = [];

  await scrapeWebsite(rootUrl, domain, visitedUrls, allPhoneNumbers, allEmails);

  return {
    phoneNumbers: Array.from(new Set(allPhoneNumbers)),
    emails: [...new Set(allEmails)]
  }
}

export { scrapeWebsiteForContacts };

