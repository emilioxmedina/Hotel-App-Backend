import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import Reservation from 'src/reservations/entities/reservations.entity';
import Payment from 'src/payment/entities/payment.entity';
@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  lastname: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @OneToMany(() => Reservation, (reservation) => reservation.users)
  reservations: Reservation[];

  @BeforeInsert()
  async hashPassword() {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(this.password, saltOrRounds);
    this.password = hash;
  }
}
