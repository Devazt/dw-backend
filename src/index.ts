import * as express from "express";
import * as cors from "cors";   
import { AppDataSource } from "./data-source";
import router from "./routes";

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

        app.use(express.json());
        app.use(cors(corsOptions));
        app.use("/", router);

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        })
    })
    .catch((error) => console.log(error))