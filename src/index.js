export default {
  async fetch(request, env, ctx) {
    const apiUrl =
      "https://clientapi.gcs-web.com/data/68ee6c33-8db5-45c4-8216-3dc41f586d9b/quotes";

    // Handle preflight OPTIONS request
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    try {
      const res = await fetch(apiUrl);

      const data = await res.json();

      return new Response(JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",     
          "Access-Control-Allow-Methods": "GET",  
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  },
};
