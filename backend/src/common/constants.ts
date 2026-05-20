export const ONBOARDING_STEPS = [
  'Reunião de kickoff realizada',
  'Acesso à plataforma configurado',
  'Integração de SMS ativada',
  'Primeiro fluxo de recuperação criado',
  'Treinamento do time do cliente concluído',
  'Go-live aprovado',
] as const;

export const PLANS = ['Básico', 'Pro', 'Enterprise'] as const;

export const ONBOARDING_DAYS_LIMIT = 30;

export type Plan = (typeof PLANS)[number];

export type OnboardingStepName = (typeof ONBOARDING_STEPS)[number];

export enum OnboardingStatus {
  EM_ANDAMENTO = 'Em andamento',
  CONCLUIDO = 'Concluído',
  ATRASADO = 'Atrasado',
}

export interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  plan: Plan;
  start_date: string;
  consultant_name: string;
  created_at: string;
}

export interface OnboardingStep {
  id: string;
  client_id: string;
  step_name: OnboardingStepName;
  completed: boolean;
  completed_at: string | null;
  note: string | null;
  created_at: string;
}

export interface DashboardItem {
  client: Client;
  steps: OnboardingStep[];
  progress: string; // ex: '4/6'
  status: OnboardingStatus;
}
