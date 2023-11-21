import * as express from "express";
import CPaslon from "../controllers/CPaslon";
import upload from "../middleware/multer";

const RPaslon = express.Router();

RPaslon.get("/api/v1/paslon", CPaslon.find);
RPaslon.post("/api/v1/paslon", upload.single("image"), CPaslon.create);
RPaslon.get("/api/v1/paslon/:id", CPaslon.findOne);
RPaslon.patch("/api/v1/paslon/:id", upload.single("image"), CPaslon.update);
RPaslon.delete("/api/v1/paslon/:id", CPaslon.delete);

export default RPaslon;