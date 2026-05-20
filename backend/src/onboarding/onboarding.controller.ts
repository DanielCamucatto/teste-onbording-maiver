import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { UpdateStepDto } from './dto/update-step.dto';
import { OnboardingStep } from '../common/constants';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Post(':clientId/steps')
  async createSteps(
    @Param('clientId') clientId: string,
  ): Promise<OnboardingStep[]> {
    return this.onboardingService.createSteps(clientId);
  }

  @Get(':clientId')
  async findByClient(
    @Param('clientId') clientId: string,
  ): Promise<OnboardingStep[]> {
    return this.onboardingService.findByClient(clientId);
  }

  @Patch(':clientId/steps/:stepId')
  async updateStep(
    @Param('clientId') clientId: string,
    @Param('stepId') stepId: string,
    @Body() updateStepDto: UpdateStepDto,
  ): Promise<OnboardingStep> {
    return this.onboardingService.updateStep(
      clientId,
      stepId,
      updateStepDto,
    );
  }
}
