import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule,
    OnboardingModule,
    DashboardModule,
  ],
})
export class AppModule {}