import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ContactService } from '../contact/contact.service';

@Injectable()
export class TasksService {
  constructor(private readonly contactService: ContactService) {
  }
  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  handleCron() {
    this.contactService.sendDailyForecast();
  }
}
