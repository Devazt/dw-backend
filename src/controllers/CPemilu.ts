import { Request, Response } from "express"
import SPemilu from "../services/SPemilu"

export default new class CPemilu {
    find(req: Request, res: Response) {
        SPemilu.find(req, res)        
    }

    findOne(req: Request, res: Response) {
        SPemilu.findOne(req, res)
    }

    create(req: Request, res: Response) {
        SPemilu.create(req, res)
    }
}