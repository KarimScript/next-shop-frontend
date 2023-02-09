import axios from "axios"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.MAIN_URL || "https://workable-marble-constrictor.glitch.me"
  }${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path) {
  const requestUrl = `${getStrapiURL(`/api${path}`
  )}`

  // Trigger API call
  try {
  const res = await axios.get(requestUrl)
  const data = await res.data;
  return data
  } 
  catch(error){
    console.log(error) ;
  }
}
