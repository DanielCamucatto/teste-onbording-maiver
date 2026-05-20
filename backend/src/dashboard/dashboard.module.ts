import { Module } from '@nestjs/common';
import { ClientsModule } from '../clients/clients.module';
import { OnboardingModule } from '../onboarding/onboarding.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [ClientsModule, OnboardingModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
