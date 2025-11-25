export default {
  async fetch(request, env, ctx) {

    // --- Handle CORS Preflight Request ---
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

    const apiUrl =
      "https://clientapi.gcs-web.com/data/68ee6c33-8db5-45c4-8216-3dc41f586d9b/quotes";

    try {
      // Fetch upstream API
      const res = await fetch(apiUrl);
      const json = await res.json();

      // Extract ABBV entry
      const abbv = json?.data?.find((x) => x.symbol === "ABBV");

      // Build filtered response
      const output = {
        symbol: abbv?.symbol || "ABBV",
        price: abbv?.lastTrade || null,
        change: abbv?.changeNumber || null,
        changePercent: abbv?.changePercent || null,
        previousClose: abbv?.previousClose || null,
        timestamp: abbv?.date || null,
      };

      return new Response(JSON.stringify(output), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // IMPORTANT FOR CORS
          "Access-Control-Allow-Methods": "GET,OPTIONS",
        },
      });

    } catch (err) {
      return new Response(
        JSON.stringify({ error: err.message }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
};
