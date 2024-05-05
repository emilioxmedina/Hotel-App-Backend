import { Room } from "src/rooms/entities/room.entity";
import User from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservations')
export default class Reservation{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'date', length: 255})
    date: Date;
    @ManyToOne(() => User, user => user.reservations)
    user: User;
    @ManyToOne(() => Room, room => room.reservations)
    room: Room;
}