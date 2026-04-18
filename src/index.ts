import { renderHtml } from "./renderHtml";
import { QUESTIONS } from "./questions";

export interface Env {
    quiz_db: D1Database;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        // 1. Serve the Quiz Website
        if (url.pathname === "/" || url.pathname === "/index.html") {
            // Pass an empty string as required by your renderHtml function signature
            return new Response(renderHtml(""), {
                headers: { "Content-Type": "text/html" },
            });
        }

        // 2. Serve Questions Data (FAST & BUILT-IN)
        if (url.pathname === "/questions.json") {
            return Response.json(QUESTIONS);
        }

        // 3. API: Get Leaderboard Data
        if (url.pathname === "/api/leaderboard" && request.method === "GET") {
            try {
                const { results } = await env.quiz_db.prepare(
                    "SELECT name, MAX(score) as score FROM scores GROUP BY name ORDER BY score DESC LIMIT 10"
                ).all();
                return Response.json(results);
            } catch (err) {
                return Response.json({ error: "Leaderboard failed", details: err }, { status: 500 });
            }
        }

        // 4. API: Submit New Score
        if (url.pathname === "/api/score" && request.method === "POST") {
            try {
                const { name, score } = await request.json() as { name: string, score: number };
                await env.quiz_db.prepare("INSERT INTO scores (name, score) VALUES (?, ?)")
                    .bind(name, score)
                    .run();
                return Response.json({ success: true });
            } catch (err) {
                return Response.json({ error: "Score save failed" }, { status: 400 });
            }
        }

        return new Response("Project is live! Endpoint not found.", { status: 404 });
    },
} satisfies ExportedHandler<Env>;
