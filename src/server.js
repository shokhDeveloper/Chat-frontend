import express from "express";
import path from "node:path";
import ejs from "ejs";
import { PORT } from "./config.js";
import { IP } from "./lib/network.js";

const app = express();
app.use(express.static(path.join(process.cwd(), "src", "public")))
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(process.cwd(), "src", "public", "views"))

app.get("/register", (_, res) => res.render("register.html"));
app.get("/login", (_, res) => res.render("login.html"));
app.get("/", (_, res) => res.render("index.html"))

app.listen(PORT, () => {
    console.log(`Frontend server is running http://${IP}:${PORT}`)
})
// Shohijahon Token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMjQuMC4wLjAgU2FmYXJpLzUzNy4zNiIsImlhdCI6MTcxMzY5MDkzOCwiZXhwIjoxNzE1NDE4OTM4fQ.tu2sGa-ORp0rrb61Aoun4sKeApixov5It8C1E0GDZBg

