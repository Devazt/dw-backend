import * as express from "express";
import CPartai from "../controllers/CPartai";
import upload from "../middleware/multer";
import AuthToken from "../middleware/AuthToken";

const RPartai = express.Router();

RPartai.get("/api/v1/partai", AuthToken.Authentication, CPartai.find);
RPartai.post("/api/v1/partai", AuthToken.Authentication, upload.single("image"), CPartai.create);
RPartai.get("/api/v1/partai/:id", AuthToken.Authentication, CPartai.findOne);
RPartai.patch("/api/v1/partai/:id", AuthToken.Authentication, upload.single("image"), CPartai.update);
RPartai.delete("/api/v1/partai/:id", AuthToken.Authentication, CPartai.delete);

export default RPartai;