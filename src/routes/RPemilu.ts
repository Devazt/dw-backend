import * as express from "express";
import CPemilu from "../controllers/CPemilu";
import upload from "../middleware/multer";

const RPemilu = express.Router();

RPemilu.get("/api/v1/pemilu", CPemilu.find);
RPemilu.post("/api/v1/pemilu", upload.single("image"), CPemilu.create);
RPemilu.get("/api/v1/pemilu/:id", CPemilu.findOne);
RPemilu.patch("/api/v1/pemilu/:id", upload.single("image"), CPemilu.update);
RPemilu.delete("/api/v1/pemilu/:id", CPemilu.delete);

export default RPemilu;