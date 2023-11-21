import * as express from "express";
import CPartai from "../controllers/CPartai";
import upload from "../middleware/multer";

const RPartai = express.Router();

RPartai.get("/api/v1/partai", CPartai.find);
RPartai.post("/api/v1/partai", upload.single("image"), CPartai.create);
RPartai.get("/api/v1/partai/:id", CPartai.findOne);
RPartai.patch("/api/v1/partai/:id", upload.single("image"), CPartai.update);
RPartai.delete("/api/v1/partai/:id", CPartai.delete);

export default RPartai;