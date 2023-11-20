import { Repository } from "typeorm";
import { Peserta } from "../entities/Peserta";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrPesertaSchema } from "../utils/VPeserta";

export default new class SPeserta {
    private readonly RepoPeserta: Repository<Peserta> = AppDataSource.getRepository(Peserta)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const pesertas = await this.RepoPeserta.find();
            return res.status(200).json({message: "Find All Success", data: pesertas});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id:number = Number(req.params.id);

            const data = await this.RepoPeserta.findOneBy({id});
            if (!data) {
                return res.status(404).json({ message: "Data not found" });
            }
            return res.status(200).json({message: "Find by id Success", data: data});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            let count = await this.getCount() + 1;

            const { error } = CrPesertaSchema.validate(data);
            if(error) return res.status(400).json(error.message);

            let createdAt: Date | undefined = data.createdAt;
            let updatedAt: Date | undefined = data.updatedAt;
            if(createdAt == undefined) createdAt = new Date();
            if(updatedAt == undefined) updatedAt = new Date();

            const newPeserta = await this.RepoPeserta.create({
                name: data.name,
                no_urut: count,
                address: data.address,
                gender: data.gender,
                vote_paslon: data.vote_paslon,
                createdAt,
                updatedAt
            });

            const result = await this.RepoPeserta.save(newPeserta);
            return res.status(201).json({message: "Create Success", data: result});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id:number = Number(req.params.id);
            const json = req.body;

            const data = await this.RepoPeserta.findOneBy({id});
            if (!data) {
                return res.status(404).json({ message: "Data not found" });
            }
            let name: string | undefined = json.name ?? data.name;
            let no_urut: number | undefined = json.no_urut ?? data.no_urut;
            let address: string | undefined = json.address ?? data.address;
            let gender: string | undefined = json.gender ?? data.gender;
            let vote_paslon: string | undefined = json.vote_paslon ?? data.vote_paslon;

            await this.RepoPeserta.update({id}, {
                name : name,
                no_urut : no_urut,
                address : address,
                gender : gender,
                vote_paslon : vote_paslon,
                updatedAt : new Date()
            });
            

            const viewData = await this.RepoPeserta.findOneBy({id});
            return res.status(200).json({message: "Update Success", data: viewData});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id:number = Number(req.params.id);
            const data = await this.RepoPeserta.findOneBy({id});
            if (!data) {
                return res.status(404).json({ message: "Data not found" });
            }
            await this.RepoPeserta.remove(data);
            return res.status(200).json({message: "Delete Success"});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    async getCount(): Promise<number> {
        const count = await this.RepoPeserta.count();
        return count;
    }
}