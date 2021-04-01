import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { Service } from './entities/service.entity';
import { CustomerServiceService } from './customer-service.service';
import { CustomerServiceResolver } from './customer-service.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Service])],
  providers: [CustomerServiceService, CustomerServiceResolver],
})
export class CustomerServiceModule {}
