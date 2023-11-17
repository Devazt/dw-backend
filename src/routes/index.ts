import * as express from "express";
import CPemilu from "../controllers/CPemilu";
import CPaslon from "../controllers/CPaslon";
import upload from "../middleware/multer";

const router = express.Router();

// Pemilu Gateway
router.get("/api/v1/pemilu", CPemilu.find);
router.post("/api/v1/pemilu", CPemilu.create);
router.get("/api/v1/pemilu/:id", CPemilu.findOne);

// Paslon Gateway
router.get("/api/v1/paslon", CPaslon.find);
router.post("/api/v1/paslon", upload.single("image"), CPaslon.create);
router.get("/api/v1/paslon/:id", CPaslon.findOne);

export default router;