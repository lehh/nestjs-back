import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  finished: boolean;

  @Column({ nullable: true, type: 'numeric' })
  duration: number;

  @ManyToMany(() => Service, (service) => service.attendances, { cascade: true })
  @JoinTable({ name: 'attendance_services' })
  services: Service[];
}
