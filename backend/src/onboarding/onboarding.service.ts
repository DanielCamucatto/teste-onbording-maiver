import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { ONBOARDING_STEPS, OnboardingStep } from '../common/constants';
import { UpdateStepDto } from './dto/update-step.dto';

@Injectable()
export class OnboardingService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async createSteps(clientId: string): Promise<OnboardingStep[]> {
    const steps = ONBOARDING_STEPS.map((stepName) => ({
      client_id: clientId,
      step_name: stepName,
      completed: false,
      note: null,
    }));

    const { data, error } = await this.supabase
      .from('onboarding_steps')
      .insert(steps)
      .select();

    if (error) {
      throw new Error(`Erro ao criar etapas: ${error.message}`);
    }

    return data as OnboardingStep[];
  }

  async findByClient(clientId: string): Promise<OnboardingStep[]> {
    const { data, error } = await this.supabase
      .from('onboarding_steps')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(`Erro ao buscar etapas: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(
        'Nenhuma etapa encontrada para este cliente',
      );
    }

    return data as OnboardingStep[];
  }

  async updateStep(
    clientId: string,
    stepId: string,
    updateStepDto: UpdateStepDto,
  ): Promise<OnboardingStep> {
    const updateData: Record<string, unknown> = {};

    if (updateStepDto.completed !== undefined) {
      updateData.completed = updateStepDto.completed;
      updateData.completed_at = updateStepDto.completed
        ? new Date().toISOString()
        : null;
    }

    if (updateStepDto.note !== undefined) {
      updateData.note = updateStepDto.note || null;
    }

    const { data, error } = await this.supabase
      .from('onboarding_steps')
      .update(updateData)
      .eq('id', stepId)
      .eq('client_id', clientId)
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao atualizar etapa: ${error.message}`);
    }

    return data as OnboardingStep;
  }
}
