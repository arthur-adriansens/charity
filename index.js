/** @format */

import express from "express";
import cors from "cors";
import path from "path";

class Server {
    constructor(port = 3000) {
        this.app = express();
        this.port = port;

        this.app.use(express.static(path.join(__dirname, "public")));
        this.get_requests();
        this.start_server();
    }

    start_server() {
        this.app.use(cors());

        this.app.listen(this.port, () => {
            console.log(`Listening on port ${this.port}`);
        });
    }

    get_requests() {
        this.app.get("/", (req, res) => {
            res.send("Hello World!");
        });
    }
}

const server = new Server();
