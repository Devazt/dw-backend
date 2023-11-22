import * as express from "express";
import * as session from "express-session";
import * as cors from "cors";   
import { AppDataSource } from "./data-source";
import RPemilu from "./routes/RPemilu";
import RPeserta from "./routes/RPeserta";
import RPartai from "./routes/RPartai";
import RPaslon from "./routes/RPaslon";
import RAuth from "./routes/RAuth";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const port = 5000;

        const corsOptions = {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        };        

        app.use(session({
            secret: "keyboard cat",
            resave: false,
            saveUninitialized: true
        }));
        app.use(express.json());
        app.use(cors(corsOptions));
        app.use("/", RPemilu);
        app.use("/", RPaslon);
        app.use("/", RPartai);
        app.use("/", RPeserta);
        app.use("/", RAuth);

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        })
    })
    .catch((error) => console.log(error))