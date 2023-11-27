let Config = {
    apiUrl: "https://dev-api.linevisioninc.com",
};

// If we are running locally.
if (window.location.href.indexOf("localhost") >= 0) {
    Config.apiUrl = "http://127.0.0.1:5235";

}

export let config = Config;
