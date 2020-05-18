import fetch from "isomorphic-unfetch";

export async function GetExperiencesByUserId(userId = "2") {
  return get(`http://localhost:3000/api/users/${userId}/experiences`);
}

async function get(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    return 0;
  } catch (error) {
    return error;
  }
}

export default get;
