import { Repository } from "typeorm"
import { Pemilu } from "../entities/Pemilu"
import { AppDataSource } from "../data-source"
import { Request,Response } from "express"
import { CrPemiluSchema } from "../utils/VPemilu"
import cloudinary from "../middleware/Cloudinary"
import { promisify } from "util"
import * as fs from "fs"

const unlinkAsync = promisify(fs.unlink);

export default new class SPemilu {
    private readonly RepoPemilu: Repository<Pemilu> = AppDataSource.getRepository(Pemilu)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const pemilus = await this.RepoPemilu.find({
                relations: ["users"]
            });
            return res.status(200).json({message: "Find All Success", data: pemilus});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const id:number = Number(req.params.id);

        const data = await this.RepoPemilu.find({
            where: {id},
            relations: ["users"]
        });

        if (data == undefined) return res.status(404).json({ message: "Data not found" });
        return res.status(200).json({ message: "Find by id Success", data: data});
        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            data.author = res.locals.loginSession.user.fullname
            data.users = res.locals.loginSession.user.id
            

            const { error } = CrPemiluSchema.validate(data);
            if(error) return res.status(400).json(error.message);

            const cloud = await cloudinary.uploader.upload(req.file.path, {
                folder: "pemilu",
                tags: "pemilu"
            });
            
            await unlinkAsync(req.file.path);

            let createdAt: Date | undefined = data.createdAt;
            let updatedAt: Date | undefined = data.updatedAt;
            if(createdAt == undefined) createdAt = new Date();
            if(updatedAt == undefined) updatedAt = new Date();

            const newPemilu = await this.RepoPemilu.create({
                title: data.title,
                author: data.author,
                description: data.description,
                image: cloud.secure_url,
                createdAt,
                updatedAt,
                users: data.users
            });
            
            const savedPemilu = await this.RepoPemilu.save(newPemilu);
            return res.status(200).json({message: "Create Success", data: savedPemilu});            
        } catch (error) {
            return res.status(500).json(error.message);
        }        
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id:number = Number(req.params.id);
            const newData = req.body
            newData.userId = res.locals.loginSession.user.id

            const data = await this.RepoPemilu.findOneBy({id});
            if (!data) {
                return res.status(404).json({ message: "Data not found" });
            }

            const checkId = await this.RepoPemilu.findOneBy({users: newData.userId});
            if (checkId !== data) {
                return res.status(400).json({ message: "User not allowed to edit" });
            }
            let title: string | undefined = newData.title ?? data.title;
            let author: string | undefined = newData.author ?? data.author;
            let description: string | undefined = newData.description ?? data.description;
            let image: string | undefined = newData.image ?? data.image;

            if (req.file) {
                const urlArray = image.split('/');
                const imageName = urlArray[urlArray.length - 1];
                const publicId = imageName.split('.')[0];
                await cloudinary.uploader.destroy("pemilu/" + publicId);

                const cloud = await cloudinary.uploader.upload(req.file.path, {
                    folder: "pemilu",
                    tags: "artikel"
                });
                image = cloud.secure_url;
                await unlinkAsync(req.file.path);
            }

            await this.RepoPemilu.update({id}, {
                title: title,
                author: author,
                description: description,
                image: image,
                updatedAt: new Date()
            });

            const viewData = await this.RepoPemilu.findOneBy({id});
            return res.status(200).json({message: "Update Success", data: viewData});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async delete (req: Request, res: Response): Promise<Response> {
        try {
            const id:number = Number(req.params.id);
            const data = await this.RepoPemilu.findOneBy({id});
            if (!data) {
                return res.status(404).json({ message: "Data not found" });
            }

            const imageArray = data.image.split('/');
            const imageName = imageArray[imageArray.length - 1];
            const publicId = imageName.split('.')[0];
            await cloudinary.uploader.destroy("pemilu/" + publicId);

            await this.RepoPemilu.delete({id});
            return res.status(200).json({message: "Delete Success"});

        } catch (error) {
            return res.status(500).json({ message: "Something went wrong" });
        }
    }
}