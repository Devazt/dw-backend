import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Paslon } from "./Paslon";
import { Users } from "./Users";

@Entity()
export class Peserta {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Users, (users) => users.peserta)
    @JoinColumn()
    users: Users

    @ManyToOne(() => Paslon, (paslon) => paslon.peserta)
    paslon: Paslon

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