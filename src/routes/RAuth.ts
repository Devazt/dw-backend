import * as express from "express";
import CAuth from "../controllers/CAuth";

const RAuth = express.Router();

RAuth.post("/api/v1/register", CAuth.register);
RAuth.post("/api/v1/login", CAuth.login);

export default RAuth;