export const BASE_URL = 'https://official-joke-api.appspot.com/random_joke';

export async function getJoke() {
  const response = await fetch(`${BASE_URL}`, {});

  let data = await response.json();

  return data;
}
