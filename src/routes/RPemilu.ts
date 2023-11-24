import * as express from "express";
import CPemilu from "../controllers/CPemilu";
import upload from "../middleware/multer";
import AuthToken from "../middleware/AuthToken";

const RPemilu = express.Router();

RPemilu.get("/api/v1/pemilu", CPemilu.find);
RPemilu.get("/api/v1/pemilu/:id", CPemilu.findOne);
RPemilu.post("/api/v1/pemilu", AuthToken.Authentication, upload.single("image"), CPemilu.create);
RPemilu.patch("/api/v1/pemilu/:id", AuthToken.Authentication, upload.single("image"), CPemilu.update);
RPemilu.delete("/api/v1/pemilu/:id", AuthToken.Authentication, CPemilu.delete);

export default RPemilu;