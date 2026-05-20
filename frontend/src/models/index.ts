export interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  plan: 'Básico' | 'Pro' | 'Enterprise';
  start_date: string;
  consultant_name: string;
  created_at: string;
}

export interface OnboardingStep {
  id: string;
  client_id: string;
  step_name: string;
  completed: boolean;
  completed_at: string | null;
  note: string | null;
  created_at: string;
}

export enum OnboardingStatus {
  EM_ANDAMENTO = 'Em andamento',
  CONCLUIDO = 'Concluído',
  ATRASADO = 'Atrasado',
}

export interface DashboardItem {
  client: Client;
  steps: OnboardingStep[];
  progress: string;
  status: OnboardingStatus;
}

export interface CreateClientDto {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  plan: string;
  start_date: string;
  consultant_name: string;
}

export interface UpdateStepDto {
  completed?: boolean;
  note?: string;
}
