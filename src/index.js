export default {
  async fetch(request, env, ctx) {
    const apiUrl =
      "https://clientapi.gcs-web.com/data/68ee6c33-8db5-45c4-8216-3dc41f586d9b/quotes";

    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!res.ok) {
        return new Response(
          JSON.stringify({ error: `Upstream error: ${res.status}` }),
          { status: 500 }
        );
      }

      const data = await res.json();

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
      });
    }
  },
};
