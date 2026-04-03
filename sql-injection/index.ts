import { SQL } from "bun";

const pg = new SQL("postgres://postgres:password@localhost:5436/test");

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

Bun.serve({
  port: 3500,
  routes: {
    "/": () => new Response(Bun.file("index.html"), {
      headers: { "Content-Type": "text/html" }
    }),
    "/insert_user": {
      async POST(req) {
        const { name, email, password } = await req.json();

        console.log({ name, email, password });
        try {
          // This is safe using tagged templates
          const data = await pg`INSERT INTO "user" (name,email,password) VALUES (${name}, ${email}, ${password})`;

          return Response.json(
            { message: "user created successfully", data },
            { headers: DEFAULT_HEADERS }
          );
        } catch (error) {
          console.error(error);
          return Response.json(
            { message: "Error creating user", error: String(error) },
            { status: 500, headers: DEFAULT_HEADERS }
          );
        }
      },
      // Handle preflight for CORS
      async OPTIONS() {
        return new Response(null, { headers: DEFAULT_HEADERS });
      }
    },
    "/get_user": {
      async GET(req) {
        const url = new URL(req.url);
        const name = url.searchParams.get("name");

        console.log("Searching for : ", name);

        try {
          // VULNERABLE: Direct string interpolation into pg.unsafe
          const query = `select * from "user" where name = '${name}'`;
          console.log("Executing Query:", query);
          
          const data = await pg.unsafe(query);

          return Response.json(data, { headers: DEFAULT_HEADERS });
        } catch (error) {
            return Response.json(
              { error: String(error) },
              { status: 500, headers: DEFAULT_HEADERS }
            );
        }
      },
      async OPTIONS() {
        return new Response(null, { headers: DEFAULT_HEADERS });
      }
    },
  },
  fetch() {
    return new Response("Not Found", { status: 404 });
  },
});

console.log("Server running at http://localhost:3500");
