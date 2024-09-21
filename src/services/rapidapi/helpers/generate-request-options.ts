import configs from "../../../configs";

export function generateRequestOptions(url: string): object {
  const options = {
    method: "POST",
    url: configs.X_RAPIDAPI_URL,
    params: {
      url,
    },
    headers: {
      "x-rapidapi-key": configs.X_RAPIDAPI_KEY,
      "x-rapidapi-host": configs.X_RAPIDAPI_HOST,
      "Content-Type": "application/json",
    },
  };
  return options;
}
