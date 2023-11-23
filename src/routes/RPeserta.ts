import * as express from "express";
import CPeserta from "../controllers/CPeserta";
import AuthToken from "../middleware/AuthToken";

const RPeserta = express.Router();

RPeserta.get("/api/v1/peserta", AuthToken.Authentication, CPeserta.find);
RPeserta.get("/api/v1/peserta/:id", AuthToken.Authentication, CPeserta.findOne);
RPeserta.post("/api/v1/peserta", AuthToken.Authentication, CPeserta.create);

export default RPeserta;