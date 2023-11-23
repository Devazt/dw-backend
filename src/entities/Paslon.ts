import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany, ManyToOne } from "typeorm"
import { Partai } from "./Partai";
import { Peserta } from "./Peserta";

@Entity()
export class Paslon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    no_urut: number;
    
    @Column()
    visi_misi: string;
    
    @Column()
    image: string;

    @OneToMany(() => Partai, (partai) => partai.paslon, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    partai: Partai[]

    @OneToMany(() => Peserta, (peserta) => peserta.paslon)
    peserta: Peserta
    
    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;
}