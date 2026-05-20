import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardItem } from '../common/constants';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard(
    @Query('consultant') consultantName?: string,
  ): Promise<DashboardItem[]> {
    return this.dashboardService.getDashboard(consultantName);
  }
}
