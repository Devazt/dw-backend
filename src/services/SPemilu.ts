import { Repository } from "typeorm"
import { Pemilu } from "../entities/Pemilu"
import { AppDataSource } from "../data-source"
import { Request,Response } from "express"

export default new class SPemilu {
    private readonly RepoPemilu: Repository<Pemilu> = AppDataSource.getRepository(Pemilu)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const pemilus = await this.RepoPemilu.find();
            return res.status(200).json(pemilus);
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        const id:number = Number(req.params.id);

        const data = await this.RepoPemilu.findOneBy({id});

        if (data == undefined) return res.status(404).json({ message: "Data not found" });
        return res.status(200).json(data);
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            let createdAt: Date | undefined = data.createdAt;
            let updatedAt: Date | undefined = data.updatedAt;
            if(createdAt == undefined) createdAt = new Date();
            if(updatedAt == undefined) updatedAt = new Date();

            const newPemilu = await this.RepoPemilu.create({
                ...data,
                createdAt,
                updatedAt
            });
            
            const savedPemilu = await this.RepoPemilu.save(newPemilu);
            return res.status(200).json(savedPemilu);            
        } catch (error) {
            return res.status(500).json(error.message);
        }
        
    } 
}