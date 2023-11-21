import * as express from "express";
import CPeserta from "../controllers/CPeserta";
import upload from "../middleware/multer";

const RPeserta = express.Router();

RPeserta.get("/api/v1/peserta", CPeserta.find);
RPeserta.post("/api/v1/peserta", upload.single("image"), CPeserta.create);
RPeserta.get("/api/v1/peserta/:id", CPeserta.findOne);
RPeserta.patch("/api/v1/peserta/:id", upload.single("image"), CPeserta.update);
RPeserta.delete("/api/v1/peserta/:id", CPeserta.delete);

export default RPeserta;