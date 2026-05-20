import { useState, useCallback } from 'react';
import { OnboardingStep, UpdateStepDto } from '../models';
import { onboardingApi } from '../services/onboarding.api';

interface UseOnboardingReturn {
  steps: OnboardingStep[];
  loading: boolean;
  error: string | null;
  fetchSteps: (clientId: string) => Promise<void>;
  createSteps: (clientId: string) => Promise<OnboardingStep[]>;
  updateStep: (
    clientId: string,
    stepId: string,
    data: UpdateStepDto,
  ) => Promise<void>;
}

export function useOnboarding(): UseOnboardingReturn {
  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSteps = useCallback(async (clientId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await onboardingApi.findByClient(clientId);
      setSteps(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Erro ao carregar etapas',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createSteps = useCallback(async (clientId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await onboardingApi.createSteps(clientId);
      setSteps(data);
      return data;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Erro ao criar etapas';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStep = useCallback(
    async (
      clientId: string,
      stepId: string,
      data: UpdateStepDto,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const updatedStep = await onboardingApi.updateStep(
          clientId,
          stepId,
          data,
        );
        setSteps((prev) =>
          prev.map((step) =>
            step.id === stepId ? updatedStep : step,
          ),
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erro ao atualizar etapa',
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    steps,
    loading,
    error,
    fetchSteps,
    createSteps,
    updateStep,
  };
}
