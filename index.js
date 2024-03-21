/** @format */

import express from "express";
import cors from "cors";

class Server {
    constructor(port = 3000) {
        this.app = express();
        this.port = port;

        this.get_requests();
        this.start_server();
    }

    start_server() {
        this.app.use(cors());
        app.use(express.static("public"));

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
