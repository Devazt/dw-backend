import * as express from "express";
import CPemilu from "../controllers/CPemilu";
import CPaslon from "../controllers/CPaslon";
import CPartai from "../controllers/CPartai";
import CPeserta from "../controllers/CPeserta";
import upload from "../middleware/multer";

const router = express.Router();

// Pemilu Gateway
router.get("/api/v1/pemilu", CPemilu.find);
router.post("/api/v1/pemilu", upload.single("image"), CPemilu.create);
router.get("/api/v1/pemilu/:id", CPemilu.findOne);
router.patch("/api/v1/pemilu/:id", upload.single("image"), CPemilu.update);
router.delete("/api/v1/pemilu/:id", CPemilu.delete);

// Paslon Gateway
router.get("/api/v1/paslon", CPaslon.find);
router.post("/api/v1/paslon", upload.single("image"), CPaslon.create);
router.get("/api/v1/paslon/:id", CPaslon.findOne);
router.patch("/api/v1/paslon/:id", upload.single("image"), CPaslon.update);
router.delete("/api/v1/paslon/:id", CPaslon.delete);

// Partai Gateway
router.get("/api/v1/partai", CPartai.find);
router.post("/api/v1/partai", upload.single("image"), CPartai.create);
router.get("/api/v1/partai/:id", CPartai.findOne);
router.patch("/api/v1/partai/:id", upload.single("image"), CPartai.update);
router.delete("/api/v1/partai/:id", CPartai.delete);

// Peserta Gateway
router.get("/api/v1/peserta", CPeserta.find);
router.post("/api/v1/peserta", CPeserta.create);
router.get("/api/v1/peserta/:id", CPeserta.findOne);
router.patch("/api/v1/peserta/:id", CPeserta.update);
router.delete("/api/v1/peserta/:id", CPeserta.delete);

export default router;