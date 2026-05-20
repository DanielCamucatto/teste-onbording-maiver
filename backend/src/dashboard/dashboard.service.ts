import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import {
  Client,
  DashboardItem,
  OnboardingStatus,
  OnboardingStep,
  ONBOARDING_STEPS,
  ONBOARDING_DAYS_LIMIT,
} from '../common/constants';
import dayjs from 'dayjs';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  private calculateStatus(
    startDate: string,
    steps: OnboardingStep[],
  ): { status: OnboardingStatus; progress: string } {
    const totalSteps = ONBOARDING_STEPS.length;
    const completedSteps = steps.filter((step) => step.completed).length;
    const allCompleted = completedSteps === totalSteps;
    const daysSinceStart = dayjs().diff(dayjs(startDate), 'day');

    const progress = `${completedSteps}/${totalSteps}`;

    if (allCompleted) {
      return { status: OnboardingStatus.CONCLUIDO, progress };
    }

    if (daysSinceStart > ONBOARDING_DAYS_LIMIT) {
      return { status: OnboardingStatus.ATRASADO, progress };
    }

    return { status: OnboardingStatus.EM_ANDAMENTO, progress };
  }

  async getDashboard(
    consultantName?: string,
  ): Promise<DashboardItem[]> {
    let query = this.supabase.from('clients').select('*');

    if (consultantName) {
      query = query.eq('consultant_name', consultantName);
    }

    const { data: clients, error: clientsError } = await query
      .order('created_at', { ascending: false });

    if (clientsError) {
      throw new Error(
        `Erro ao buscar dados do dashboard: ${clientsError.message}`,
      );
    }

    const dashboardItems: DashboardItem[] = [];

    for (const client of clients as Client[]) {
      const { data: steps, error: stepsError } = await this.supabase
        .from('onboarding_steps')
        .select('*')
        .eq('client_id', client.id)
        .order('created_at', { ascending: true });

      if (stepsError) {
        throw new Error(
          `Erro ao buscar etapas: ${stepsError.message}`,
        );
      }

      const onboardingSteps = (steps || []) as OnboardingStep[];
      const { status, progress } = this.calculateStatus(
        client.start_date,
        onboardingSteps,
      );

      dashboardItems.push({
        client,
        steps: onboardingSteps,
        progress,
        status,
      });
    }

    return dashboardItems;
  }
}
