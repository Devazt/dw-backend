import { Request, Response } from "express";
import SPeserta from "../services/SPeserta";

export default new class CPeserta {
    find(req: Request, res: Response) {
        SPeserta.find(req,res)
    }

    findOne(req: Request, res: Response) {
        SPeserta.findOne(req, res)
    }

    create(req: Request, res: Response) {
        SPeserta.create(req, res)
    }

    update(req: Request, res: Response) {
        SPeserta.update(req, res)
    }

    delete(req: Request, res: Response) {
        SPeserta.delete(req, res)
    }
}