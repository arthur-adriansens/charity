/** @format */

import express from "express";
import path from "path";

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

        this.app.get("/test", (req, res) => {
            res.sendFile("index.html");
        });

        this.app.get("/chess", (req, res) => {
            res.sendFile("public/chess3D/chess.html");
        });
    }
}

const server = new Server();
