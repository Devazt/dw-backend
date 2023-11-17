import { Request, Response } from "express";
import SPaslon from "../services/SPaslon";

export default new class CPaslon {
    find(req: Request, res: Response) {
        SPaslon.find(req,res)
    }

    findOne(req: Request, res: Response) {
        SPaslon.findOne(req, res)
    }

    create(req: Request, res: Response) {
        SPaslon.create(req, res)
    }
}