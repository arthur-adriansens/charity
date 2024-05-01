/** @format */

import express from "express";
import path from "path";

//todo: combine all the /games/* and /tools/* into one or two get requests

// import { sql } from "@vercel/postgres";

// const likes = 100;
// const { rows } = await sql`SELECT * FROM posts WHERE likes > ${likes};`;

class Server {
    constructor(port = 3000) {
        this.app = express();
        this.port = port;

        this.get_requests();
        this.start_server();
    }

    start_server() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }

    get_requests() {
        this.app.use(express.static(path.join(__dirname, "public")));

        this.app.get("/games", (req, res) => {
            res.sendFile(path.join(__dirname, "public", "games", "games.html"));
        });

        this.app.get("/games/chess", (req, res) => {
            res.sendFile(path.join(__dirname, "public", "games", "chess3D", "chess.html"));
        });

        this.app.get("/games/2048", (req, res) => {
            res.sendFile(path.join(__dirname, "public", "games", "2048", "index.html"));
        });

        this.app.get("/games/snake", (req, res) => {
            res.sendFile(path.join(__dirname, "public", "games", "snake", "popup.html"));
        });

        this.app.get("/tools/qr-code", (req, res) => {
            res.sendFile(path.join(__dirname, "public", "tools", "qr-code", "qr.html"));
        });
    }
}

const server = new Server();
