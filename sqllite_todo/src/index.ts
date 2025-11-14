import http from "http";
import fs from "fs";
import path from "path";
import { parse } from "querystring";
import Database from "better-sqlite3";
import ejs from "ejs";
import { fileURLToPath } from "url";

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite setup
const db = new Database("todos.db");
db.prepare(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL
  )
`).run();

// Helper to render EJS
function renderTemplate(file: string, data: any) {
	const filePath = path.join(__dirname, "..", "views", file);
	const template = fs.readFileSync(filePath, "utf-8");
	return ejs.render(template, data);
}

// Server
const server = http.createServer((req, res) => {
	const url = req.url || "/";
	const method = req.method || "GET";

	// Serve CSS
	if (url === "/style.css") {
		const cssPath = path.join(__dirname, "..", "views", "style.css");
		if (fs.existsSync(cssPath)) {
			const css = fs.readFileSync(cssPath, "utf-8");
			res.writeHead(200, { "Content-Type": "text/css" });
			res.end(css);
			return;
		}
	}

	// Homepage
	if (url === "/" && method === "GET") {
		const todos = db.prepare("SELECT * FROM todos").all();
		const html = renderTemplate("index.ejs", { todos });
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(html);
		return;
	}

	// Add todo
	if (url === "/add" && method === "POST") {
		let body = "";
		req.on("data", chunk => body += chunk);
		req.on("end", () => {
			const parsed = parse(body.toString());
			const text = parsed.text?.toString().trim();
			if (text) db.prepare("INSERT INTO todos (text) VALUES (?)").run(text);
			res.writeHead(302, { Location: "/" });
			res.end();
		});
		return;
	}

	// Delete todo
	if (url?.startsWith("/delete/") && method === "POST") {
		const id = parseInt((url as any).split("/")[2]);
		db.prepare("DELETE FROM todos WHERE id = ?").run(id);
		res.writeHead(302, { Location: "/" });
		res.end();
		return;
	}

	// 404 fallback
	res.writeHead(404, { "Content-Type": "text/plain" });
	res.end("404 Not Found");
});

server.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});
