import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, ManyToOne } from "typeorm"
import { Users } from "./Users"

@Entity()
export class Pemilu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    author: string;
    
    @Column()
    description: string;
    
    @Column()
    image: string;

    @ManyToOne(() => Users, users => users.pemilu)
    users: Users
        
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