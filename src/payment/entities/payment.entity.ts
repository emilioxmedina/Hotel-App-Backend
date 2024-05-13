import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import User from 'src/users/entities/user.entity';
  import {  } from 'typeorm';

  @Entity('payment')
  export default class Payment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 50 })
    payment_type: string;
  
    @ManyToOne(() => User, (user) => user.payments)
    user: User;
  }