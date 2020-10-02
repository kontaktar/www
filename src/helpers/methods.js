import { getBaseUrl } from "helpers/url";

export async function get(relativeUrl) {
  const url = `${getBaseUrl()}${relativeUrl}`;
  try {
    const response = await fetch(url).catch((error) => {
      throw new Error(error, url);
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  } catch (error) {
    throw error;
  }
}

export async function post(relativeUrl, body) {
  const url = `${getBaseUrl()}${relativeUrl}`;

  // TODO: Sync other methods to this one.
  // This one works well and returns error messages properly
  // error.response.message
  // See the flow from LoginFormContainer > api/login
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((res) => res.json());
    if (response.ok) {
      return response;
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

export async function put(relativeUrl, body) {
  const url = `${getBaseUrl()}${relativeUrl}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).catch((error) => {
      throw new Error(error, url);
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  } catch (error) {
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
    }).catch((error) => {
      throw new Error(error, url);
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  } catch (error) {
    throw error;
  }
}
