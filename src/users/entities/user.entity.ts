import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;
    
    @Column({ type: 'varchar', length: 50 })
    lastname: string;
    
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;
    
    @Column({ type: 'varchar', length: 100 })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(this.password, saltOrRounds);
        this.password = hash;
    }
}