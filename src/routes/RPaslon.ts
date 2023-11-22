import * as express from "express";
import CPaslon from "../controllers/CPaslon";
import upload from "../middleware/multer";
import AuthToken from "../middleware/AuthToken";

const RPaslon = express.Router();

RPaslon.get("/api/v1/paslon", AuthToken.Authentication, CPaslon.find);
RPaslon.post("/api/v1/paslon", AuthToken.Authentication, upload.single("image"), CPaslon.create);
RPaslon.get("/api/v1/paslon/:id", AuthToken.Authentication, CPaslon.findOne);
RPaslon.patch("/api/v1/paslon/:id", AuthToken.Authentication, upload.single("image"), CPaslon.update);
RPaslon.delete("/api/v1/paslon/:id", AuthToken.Authentication, CPaslon.delete);

export default RPaslon;