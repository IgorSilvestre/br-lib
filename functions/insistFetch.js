import axios from "axios"


// Delay function to pause execution for a given number of milliseconds
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


/**
 * Makes an HTTP GET request to a specified URL and retries on failure.
 * It waits for a specified delay before retrying the request.
 * 
 * @param {string} url - The URL to make the request to.
 * @param {number} [retries=3] - The number of times to retry the request on failure.
 * @param {number} [delayMs=1000] - The delay in milliseconds before each retry.
 * @returns {Promise<AxiosResponse>} - A Promise that resolves to the Axios response object.
 * @throws {Error} - Throws an error if all retries fail, containing information about the last failed attempt.
 */
export async function insistFetch(url, retries = 3, delayMs = 1000) {
    try {
      return await axios.get(url, { timeout: 10000 }); // 10 seconds timeout
    } catch (error) {
      if (retries === 0) throw error;
      console.log(`Retrying ${url} (${retries} retries left)`);
      await delay(delayMs);
      return insistFetch(url, retries - 1, delayMs);
    }
  }
