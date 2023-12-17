import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "{url}/{endpoint}/{summoner}?api_key={key}",
  proxyHandler: genericProxyHandler,

  mappings: {
    getSummonerInfo: {
      method: "GET",
      endpoint: "lol/league/v4/entries/by-summoner",
      headers: {
        "cache-control": "no-cache",
      },
    },
  },
};

export default widget;
