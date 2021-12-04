// Create query dict to string for url parameter

export const getQueryString = (query) => {
  var query_string = "";
  for (const [key, value] of Object.entries(query)) {
    if (!value) {
      continue;
    }
    if (query_string !== "") {
      query_string += "&";
    }
    query_string += `${key}=${value}`;
  }
  return query_string;
};
