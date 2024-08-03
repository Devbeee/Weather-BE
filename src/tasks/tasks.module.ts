import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [ScheduleModule.forRoot(), ContactModule],
  providers: [TasksService],
})
export class TasksModule {}
