import * as express from "express";
import CPeserta from "../controllers/CPeserta";
import upload from "../middleware/multer";
import AuthToken from "../middleware/AuthToken";

const RPeserta = express.Router();

RPeserta.get("/api/v1/peserta", AuthToken.Authentication, CPeserta.find);
RPeserta.post("/api/v1/peserta", AuthToken.Authentication, upload.single("image"), CPeserta.create);
RPeserta.get("/api/v1/peserta/:id", AuthToken.Authentication, CPeserta.findOne);
RPeserta.patch("/api/v1/peserta/:id", AuthToken.Authentication, upload.single("image"), CPeserta.update);
RPeserta.delete("/api/v1/peserta/:id", AuthToken.Authentication, CPeserta.delete);

export default RPeserta;