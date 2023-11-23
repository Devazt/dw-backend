import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Pemilu } from "./Pemilu";
import { Peserta } from "./Peserta";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullname: string;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToOne(() => Peserta, (peserta) => peserta.users, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    peserta: Peserta

    @OneToMany(() => Pemilu, (pemilu) => pemilu.users, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    pemilu: Pemilu[]

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