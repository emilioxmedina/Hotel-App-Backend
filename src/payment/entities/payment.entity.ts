import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from 'src/users/entities/user.entity';
import reservation from 'src/reservations/entities/reservations.entity';
@Entity('payment')
export default class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  payment_type: string;

  @Column({ type: 'float' })
  amount: number;
}
