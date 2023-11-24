import { Repository } from "typeorm";
import { Peserta } from "../entities/Peserta";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrPesertaSchema } from "../utils/VPeserta";

export default new class SPeserta {
    private readonly RepoPeserta: Repository<Peserta> = AppDataSource.getRepository(Peserta)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const pesertas = await this.RepoPeserta.find({
                relations: ["users", "paslon"]
            });
            return res.status(200).json({message: "Find All Success", data: pesertas});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            data.usersId = res.locals.loginSession.user.id

            const voteCount = await this.RepoPeserta.count({where: {users: data.usersId}});
            if(voteCount > 0) return res.status(400).json({message: "You have already voted"});

            const { error } = CrPesertaSchema.validate(data);
            if(error) return res.status(400).json(error.message);

            const newPeserta = await this.RepoPeserta.create({
                users: data.usersId,
                paslon: data.paslonId
            });
            await this.RepoPeserta.save(newPeserta);
            return res.status(201).json({message: "Vote Success", data: newPeserta, relations: ["users", "paslon"]});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}