import { getBaseUrl } from "helpers/url";

export async function get(relativeUrl) {
  const url = `${getBaseUrl()}${relativeUrl}`;
  try {
    const response = await fetch(url).catch((error) => {
      throw new Error(error, url);
    });
    const data = await response.json();

    if (response.ok) {
      return data;
    }
    const error = new Error(data.message);
    error.response = data;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
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
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    const error = new Error(data.message);
    error.response = data;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
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
    });
    if (response.ok) {
      return response.json();
    }
    const error = new Error(response.message);
    error.response = response;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
export async function remove(relativeUrl, body) {
  const url = `${getBaseUrl()}${relativeUrl}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (response.ok) {
      return response.json();
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
