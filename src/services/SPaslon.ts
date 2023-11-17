import { Repository } from "typeorm";
import { Paslon } from "../entities/Paslon";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { CrPaslonSchema } from "../utils/VPaslon";
import cloudinary from "../middleware/Cloudinary";
import { promisify } from "util";
import * as fs from "fs";

const unlinkAsync = promisify(fs.unlink);

export default new class SPaslon {
    private readonly RepoPaslon: Repository<Paslon> = AppDataSource.getRepository(Paslon)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const paslons = await this.RepoPaslon.find();
            return res.status(200).json({message: "Find All Success", data: paslons});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        const id:number = Number(req.params.id);

        const data = await this.RepoPaslon.findOneBy({id});

        if (data == undefined) return res.status(404).json({ message: "Data not found"});
        return res.status(200).json({message: "Find by id Success", data: data});
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            let count = await this.getCount() + 1;

            const { error } = CrPaslonSchema.validate(data);
            if(error) return res.status(400).json(error.message);

            const cloud = await cloudinary.uploader.upload(req.file.path, {
                folder: "pemilu",
                tags: "paslon"
            });

            let createdAt: Date | undefined = data.createdAt;
            let updatedAt: Date | undefined = data.updatedAt;
            if(createdAt == undefined) createdAt = new Date();
            if(updatedAt == undefined) updatedAt = new Date();

            const newPaslon = await this.RepoPaslon.create({
                name: data.name,
                no_urut: count,
                visi_misi: data.visi_misi,
                image: cloud.secure_url,
                createdAt,
                updatedAt
            });

            await unlinkAsync(req.file.path);

            const result = await this.RepoPaslon.save(newPaslon);
            return res.status(200).json({message: "Create Success", data: result});
            
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    }

    async getCount(): Promise<number> {
        const count = await this.RepoPaslon.count();
        return count;
    }
}