const OMDB_CONFIG = {
  BASE_URL: "http://www.omdbapi.com/",
  API_KEY: process.env.EXPO_PUBLIC_OMDB_API_KEY,
};

export const fetchMoviesData = async ({ query }: { query: string }) => {
  // query: `i=` -> imdbID, `s=` -> search
  try {
    const api_url = `${OMDB_CONFIG.BASE_URL}?apikey=${OMDB_CONFIG.API_KEY}&${query}`;

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
