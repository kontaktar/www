import { getBaseUrl } from "helpers/url";

export async function get(relativeUrl) {
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

export async function post(relativeUrl, body) {
  const url = `${getBaseUrl()}${relativeUrl}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).catch((error) => console.error(error, url));
    if (response.ok) {
      return await response.json();
    }
    return 0;
  } catch (error) {
    return error;
  }
}

export async function put(relativeUrl, body) {
  const url = `${getBaseUrl()}${relativeUrl}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).catch((error) => console.error(error, url));
    if (response.ok) {
      return await response.json();
    }
    return 0;
  } catch (error) {
    return error;
  }
}
