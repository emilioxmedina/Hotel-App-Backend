import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from '../../users/entities/user.entity';

@Entity('payment')
export default class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  payment_type: string;

  @Column({ type: 'float' })
  amount: number;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
