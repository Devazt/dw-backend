import * as express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes";

AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const port = 5000;

        app.use(express.json());
        app.use("/", router);

        // app.get("/", (req: Request, res: Response) => {
        //     res.send("Hello World");
        // })

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        })
    })
    .catch((error) => console.log(error))