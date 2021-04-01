import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'decimal' })
  price: number;

  @Column({ nullable: false, type: 'numeric' })
  time: number;

  @Column({ nullable: false, type: 'numeric' })
  commission: number;

  @ManyToMany(() => Attendance, (attendance) => attendance.services)
  attendances: Attendance[];
}
