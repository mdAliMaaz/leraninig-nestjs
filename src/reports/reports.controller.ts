import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AUthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/decoratores/current-user.decorator';
import { User } from 'src/users/users.entity';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @UseGuards(AdminGuard)
  @Post()
  @UseGuards(AUthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }
}
