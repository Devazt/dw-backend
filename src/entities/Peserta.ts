import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Peserta {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    no_urut: number;

    @Column()
    address: string;

    @Column()
    gender: string;

    @Column()
    vote_paslon: string;

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