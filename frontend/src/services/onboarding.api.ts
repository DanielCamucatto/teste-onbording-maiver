import api from './api';
import { OnboardingStep, UpdateStepDto } from '../models';

export const onboardingApi = {
  createSteps: async (clientId: string): Promise<OnboardingStep[]> => {
    const response = await api.post<OnboardingStep[]>(
      `/onboarding/${clientId}/steps`,
    );
    return response.data;
  },

  findByClient: async (clientId: string): Promise<OnboardingStep[]> => {
    const response = await api.get<OnboardingStep[]>(
      `/onboarding/${clientId}`,
    );
    return response.data;
  },

  updateStep: async (
    clientId: string,
    stepId: string,
    data: UpdateStepDto,
  ): Promise<OnboardingStep> => {
    const response = await api.patch<OnboardingStep>(
      `/onboarding/${clientId}/steps/${stepId}`,
      data,
    );
    return response.data;
  },
};
