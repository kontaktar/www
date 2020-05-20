import { getBaseUrl } from "helpers/url";

export async function GetExperiencesByUserId(userId = "2") {
  return get(`/api/users/${userId}/experiences`);
}

export async function GetSearchResult(input = "") {
  return get(`/api/search/${input}`);
}

async function get(relativeUrl) {
  const url = `${getBaseUrl()}${relativeUrl}`;
  try {
    const response = await fetch(url).catch((error) =>
      console.error(error, url)
    );
    if (response.ok) {
      return await response.json();
    }
    return 0;
  } catch (error) {
    return error;
  }
}

export default get;
