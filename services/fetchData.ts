import Constants from "expo-constants";

const OMDB_CONFIG = {
  BASE_URL: "https://www.omdbapi.com/",
  API_KEY: Constants.expoConfig?.extra?.omdbApiKey,
};

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const fetchMoviesData = async ({
  query = "man",
  random = false,
}: {
  query?: string;
  random?: boolean;
}) => {
  // query: `i=` -> imdbID, `s=` -> search
  try {
    const api_url = `${OMDB_CONFIG.BASE_URL}?apikey=${
      OMDB_CONFIG.API_KEY
    }&${query}${random ? `&page=${getRandomNumber(1, 100)}` : ""}`;

    const response = await fetch(api_url, { method: "GET" });

    if (!response.ok) {
      throw new Error("An error occurred while fetching the data");
    }

    const data = await response.json();
    return query.trim().startsWith("s") ? data.Search : data;
  } catch (err) {
    throw err;
  }
};
